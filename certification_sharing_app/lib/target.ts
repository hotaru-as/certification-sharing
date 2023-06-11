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

//   try{
//     const targets = await fetch(
//       `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/targets/?${query}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((res) => {
//       if (res.status !== 200) {
//         throw "authentication failed";
//       } else if (res.ok) {
//         return res.json();
//       }
//     });
//     const userTargets: TargetType[] = targets.map((target: any) => {
//       const temp: TargetType = {
//         id: target.id,
//         content: target.target,
//         date: target.target_deadline,
//         status: target.status,
//         comment: target.comment,
//         createdAt: target.created_at
//       }
//       return temp;
//     });
//     console.log(userTargets);
//     return userTargets;
//   } catch(err) {
//     return [];
//   }
}

export async function createUserTarget(
  userId: number, target: string, targetDeadline: string, statusId: number, comment: string)
{
  try{
    const userTarget = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/targets/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${cookie.get("access_token")}`
        },
        body: JSON.stringify({
          "user": userId,
          "target": target,
          "target_deadline": targetDeadline,
          "status": statusId,
          "comment": comment
        })
      }
    )
    .then((res) => {
      if (res.status !== 200) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json()
      }
    });
    return userTarget;
  } catch(err) {
    return null;
  }
}
