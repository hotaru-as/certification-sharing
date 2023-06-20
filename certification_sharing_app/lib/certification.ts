import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { CertificationType } from "../type/Certification.type";
import { CertificationCategory } from "../type/CertificationCategory.type";
import { sendRequest } from "./common";

export async function getCertificationCategories(): Promise<CertificationCategory[]>
{
  const targetStatuses = await sendRequest<CertificationCategory[]>("api/certification-category/", "GET", false)
  return targetStatuses;
}

export async function getUserCertifications(id: number): Promise<CertificationType[]>
{
  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  const userCertifications = await sendRequest<CertificationType[]>(`api/certifications/?${query}`, "GET", false);
  return userCertifications;
}

export async function createUserCertification(
  userId: number, certificationId: number, result: boolean, examDate: string, comment: string)
  : Promise<void>
{
  const body: RequestInit = {
    body: JSON.stringify({
      "user": userId,
      "certificationId": certificationId,
      "result": result,
      "examDate": examDate,
      "comment": comment
    })
  }

  await sendRequest<CertificationType[]>(`api/certifications/`, "POST", true, body);
  return;
}
