import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { CertificationType } from "../type/Certification.type";
import { CertificationCategory } from "../type/CertificationCategory.type";
import { sendRequest } from "./common";
import { PostType } from "../type/Post.type";
import { UserType } from "../type/User.type";
import { UserProfile } from "../type/UserProfile.type";

export async function getCertificationCategories(): Promise<CertificationCategory[]>
{
  const initValue: CertificationCategory[] = [{
    id: 0,
    name: "",
    detail: ""
  }]
  
  const targetStatuses = await sendRequest<CertificationCategory[]>(initValue, "api/certification-category/", "GET", false)
  return targetStatuses;
}

export async function getUserCertifications(id: number): Promise<CertificationType[]>
{
  const initValue: CertificationType[] = [{
    id: 0,
    userId: 0,
    certification: 0,
    result: false,
    examDate: "",
    comment: "",
    createdAt: ""
  }]

  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  const userCertifications = await sendRequest<CertificationType[]>(initValue, `api/certifications/?${query}`, "GET", false);
  return userCertifications;
}

export async function createUserCertification(
  userId: number, certificationId: number, result: boolean, examDate: string, comment: string)
  : Promise<void>
{
  const initValue: CertificationType[] = [{
    id: 0,
    userId: 0,
    certification: 0,
    result: false,
    examDate: "",
    comment: "",
    createdAt: ""
  }]
  
  const body: RequestInit = {
    body: JSON.stringify({
      "user": userId,
      "certification": certificationId,
      "result": result,
      "examDate": examDate,
      "comment": comment
    })
  }

  await sendRequest<CertificationType[]>(initValue, `api/certifications/`, "POST", true, body);
  return;
}

export async function convertCertificationsToPosts(user: UserType, userProfile: UserProfile)
  : Promise<PostType[]>
{
  const posts: PostType[] = [];
  const certificationCategories = await getCertificationCategories();

  const certifications: CertificationType[] = await getUserCertifications(user.id);
  certifications.map((certification: CertificationType) => {
    const certificationCategory = certificationCategories.find((category: CertificationCategory) => category.id == certification.certification)
    if (certificationCategory == null) return;
    const certificationName = certificationCategory.name

    const post: PostType = {
      id: certification.id,
      user_id: user.id,
      user_name: user.username,
      user_img: userProfile.iconImg ? userProfile.iconImg : "http://127.0.0.1:8000/media/hotaru.png",
      post_type: "certification",
      result: `${user.username}さんが${certificationName}の結果を報告しました！`,
      status: `結果: ${certification.result ? "合格" : "不合格"}`,
      comment: certification.comment,
      createdAt: certification.createdAt
    }
    posts.push(post)
  })

  return posts;
}