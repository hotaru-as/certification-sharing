import { sendRequest } from "./common";
import { UserProfile } from "../type/UserProfile.type";

export async function getUserProfile(id: string): Promise<UserProfile> {
  const userProfile = await sendRequest<UserProfile>(`api/users/${id}/profile/`, "GET", false)
  return userProfile;
}

export async function createUserProfile(id: number): Promise<void>
{
  const body: RequestInit = {
    body: JSON.stringify({
        "user_id": id,
        "introduction": null,
        "birth_day": null,
        "icon_url": null,
    })
  }

  await sendRequest<UserProfile>(`api/users/profile/`, "POST", true, body)
  return;
}

export async function updateUserProfile(id: number, introduction: string, birthDay: string, iconUrl: string): Promise<void>
{
  const body: RequestInit = {
    body: JSON.stringify({
      "introduction": introduction,
      "birth_day": birthDay,
      "icon_url": iconUrl,
    })
  }
  await sendRequest<UserProfile>(`api/users/${id}/profile/`, "PATCH", true, body)
  return;
}
