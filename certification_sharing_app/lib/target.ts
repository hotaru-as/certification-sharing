import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { TargetType } from "../type/Target.type";
import { sendRequest } from "./common";
import { TargetStatus } from "../type/TargetStatus.type";
import { PostType } from "../type/Post.type";
import { UserType } from "../type/User.type";
import { UserProfile } from "../type/UserProfile.type";

export async function getTargetStatuses(): Promise<TargetStatus[]>
{
  const initValue: TargetStatus[] = [{
    id: 0,
    name: ""
  }]

  const targetStatuses = await sendRequest<TargetStatus[]>(initValue, "api/target-status/", "GET", false)
  return targetStatuses;
}

export async function getUserTargets(id: number): Promise<TargetType[]>
{
  const initValue: TargetType[] = [{
    id: 0,
    user: 0,
    target: "",
    targetDeadline: "",
    status: "",
    comment: "",
    createdAt: "",
    modifiedAt: "",
  }]

  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  const userTargets = await sendRequest<TargetType[]>(initValue, `api/targets/?${query}`, "GET", false);
  return userTargets;
}

export async function createUserTarget(
  userId: number, target: string, targetDeadline: string, statusId: number, comment: string)
  : Promise<void>
{
  const initValue: TargetType[] = [{
    id: 0,
    user: 0,
    target: "",
    targetDeadline: "",
    status: "",
    comment: "",
    createdAt: "",
    modifiedAt: "",
  }]
  
  const body: RequestInit = {
    body: JSON.stringify({
      "user": userId,
      "target": target,
      "targetDeadline": targetDeadline,
      "status": statusId,
      "comment": comment
    })
  }

  await sendRequest<TargetType[]>(initValue, `api/targets/`, "POST", true, body);
  return;
}

export async function convertTargetsToPosts(user: UserType, userProfile: UserProfile)
  : Promise<PostType[]>
{
  const posts: PostType[] = [];
  const targetStatuses = await getTargetStatuses();

  const targets: TargetType[] = await getUserTargets(user.id);
  targets.map((target: TargetType) => {
    const targetStatus = targetStatuses.find((status: TargetStatus) => status.id.toString() == target.status)
    if(targetStatus == null) return;
    const targetStatusName = targetStatus.name

    const post: PostType = {
      id: target.id,
      user_id: user.id,
      user_name: user.username,
      user_img: userProfile.iconImg,
      post_type: "target",
      result: `${user.username}さんが目標"${target.target}"を更新しました！`,
      status: `ステータス: ${targetStatusName}`,
      comment: target.comment,
      createdAt: target.createdAt
    }
    posts.push(post)  
  });

  return posts;
}
