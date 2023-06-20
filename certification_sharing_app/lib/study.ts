import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { StudyType } from "../type/Study.type";
import { sendRequest } from "./common";

export async function getUserStudies(id: number): Promise<StudyType[]>
{
  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  const userStudies = await sendRequest<StudyType[]>(`api/studies/?${query}`, "GET", false);
  return userStudies;
}

export async function createUserStudy(
  userId: number, content: string, studyTime: string, comment: string)
  : Promise<void>
{
  const body: RequestInit = {
    body: JSON.stringify({
      "user": userId,
      "content": content,
      "studyTime": studyTime,
      "comment": comment
    })
  }

  await sendRequest<StudyType[]>(`api/studies/`, "POST", true, body);
  return;
}
