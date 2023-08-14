import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { StudyType } from "../type/Study.type";
import { sendRequest } from "./common";
import { PostType } from "../type/Post.type";
import { UserType } from "../type/User.type";
import { UserProfile } from "../type/UserProfile.type";

export async function getUserStudies(id: number): Promise<StudyType[]>
{
  const initValue: StudyType[] = [{
    id: 0,
    uesrId: 0,
    content: "",
    studyTime: "",
    comment: "",
    createdAt: ""
  }]

  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  const userStudies = await sendRequest<StudyType[]>(initValue, `api/studies/?${query}`, "GET", false);
  return userStudies;
}

export async function createUserStudy(
  userId: number, content: string, studyTime: string, comment: string)
  : Promise<void>
{
  const initValue: StudyType[] = [{
    id: 0,
    uesrId: 0,
    content: "",
    studyTime: "",
    comment: "",
    createdAt: ""
  }]

  const body: RequestInit = {
    body: JSON.stringify({
      "user": userId,
      "content": content,
      "studyTime": studyTime,
      "comment": comment
    })
  }

  await sendRequest<StudyType[]>(initValue, `api/studies/`, "POST", true, body);
  return;
}

export async function convertStudiesToPosts(user: UserType, userProfile: UserProfile)
  : Promise<PostType[]>
{
  const posts: PostType[] = [];

  const studies: StudyType[] = await getUserStudies(user.id);
  studies.map((study: StudyType) => {
    const post: PostType = {
      id: study.id,
      user_id: user.id,
      user_name: user.username,
      user_img: userProfile.iconImg ? userProfile.iconImg : "http://127.0.0.1:8000/media/hotaru.png",
      post_type: "study",
      result: `${user.username}さんが"${study.content}"を勉強しました！`,
      status: `勉強時間: ${study.studyTime}`,
      comment: study.comment,
      createdAt: study.createdAt
    }
    posts.push(post)
  })

  return posts;
}
