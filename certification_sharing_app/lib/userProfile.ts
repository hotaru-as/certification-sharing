import { sendRequest } from "./common";
import { UserProfile } from "../type/UserProfile.type";
import axios from 'axios';
import Cookie from "universal-cookie";
const cookie = new Cookie();

export async function getUserProfile(id: string): Promise<UserProfile> {
  const initValue: UserProfile = {
    userId: 0,
    introduction: "",
    birthDay: "",
    iconImg: ""  
  }
  
  const userProfile = await sendRequest<UserProfile>(initValue, `api/users/${id}/profile/`, "GET", false)
  return userProfile;
}

export async function createUserProfile(id: number): Promise<void>
{
  const initValue: UserProfile = {
    userId: 0,
    introduction: "",
    birthDay: "",
    iconImg: ""  
  }
  
  const body: RequestInit = {
    body: JSON.stringify({
        "user_id": id,
        "introduction": null,
        "birth_day": null,
        "icon_img": null,
    })
  }

  await sendRequest<UserProfile>(initValue, `api/users/profile/`, "POST", true, body)
  return;
}

export async function updateUserProfile(id: number, introduction: string, birthDay: string, iconImg: any): Promise<void>
{
  const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/users/${id}/profile/`;

  var data = new FormData();
  if (introduction != null){
    data.append('introduction', introduction);
  }
  if (birthDay != null){
    data.append('birth_day', birthDay);
  }
  if (iconImg != null){
    data.append('icon_img', iconImg);
  }

  var headers = {
    "headers": {
      "Authorization": `JWT ${cookie.get("access_token")}`,
      "Content-Type": "multipart/form-data",
    }
  }

  axios.patch(url, data, headers)
  .then((res) => {
  })
  .catch((err) => {
  })

  return;
}
