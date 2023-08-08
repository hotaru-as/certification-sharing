import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { CertificationType } from "../type/Certification.type";
import { CertificationCategory } from "../type/CertificationCategory.type";
import { sendRequest } from "./common";

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
