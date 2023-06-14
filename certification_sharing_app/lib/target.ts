import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { TargetType } from "../type/Target.type";
import Cookie from "universal-cookie";
import { sendRequest } from "./common";
import { TargetStatus } from "../type/TargetStatus.type";
const cookie = new Cookie();

export async function getTargetStatuses(): Promise<TargetStatus[]>
{
  const targetStatuses = await sendRequest<TargetStatus[]>("api/target-status/", "GET", false)
  return targetStatuses;
}

export async function getUserTargets(id: number): Promise<TargetType[]>
{
  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  const userTargets = await sendRequest<TargetType[]>(`api/targets/?${query}`, "GET", false);
  return userTargets;
}

export async function createUserTarget(
  userId: number, target: string, targetDeadline: string, statusId: number, comment: string)
  : Promise<void>
{
  const body: RequestInit = {
    body: JSON.stringify({
      "user": userId,
      "target": target,
      "targetDeadline": targetDeadline,
      "status": statusId,
      "comment": comment
    })
  }

  await sendRequest<TargetType[]>(`api/targets/`, "POST", true, body);
  return;
}
