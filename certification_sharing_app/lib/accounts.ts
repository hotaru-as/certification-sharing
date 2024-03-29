import Cookie from "universal-cookie";
import { UserType } from "../type/User.type";
import { sendRequest } from "./common";

const cookie = new Cookie();

export async function login(username: string, password: string): Promise<boolean> {
  try{
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}accounts/auth/jwt/create/`,
      {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.status === 400) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      const options = { path: "/" };
      cookie.set("access_token", data.access, options);
    })
    return true;
  } catch(err) {
    alert(err);
    return false;
  }
}

export function logout(): void
{
  cookie.remove("access_token", { path: "/" });
}

export async function register(username: string, password: string): Promise<boolean>
{
  try{
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}accounts/register/`,
      {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },  
      }
    )
    .then((res) => {
      if (res.status === 400) {
        throw "authentication failed";
      }
    });
    return true;
  } catch(err) {
    alert(err);
    return false;
  }
}

export async function getAuthUser(): Promise<UserType>
{
  const initValue: UserType = {
    id: 0,
    username: ""
  }
  const authUser = await sendRequest<UserType>(initValue, `accounts/auth/users/me/`, "GET", true)
  return authUser;
}

export async function getAllUserIds() {
  const initValue: UserType[] = [{
    id: 0,
    username: ""
  }]
  const users = await sendRequest<UserType[]>(initValue, `accounts/users`, "GET", false)

  return users.map((user: any) => {
    return {
      params: {
        id: String(user.id)
      }
    }
  })
}

export async function getUser(id: string): Promise<UserType>
{
  const initValue: UserType = {
    id: 0,
    username: ""
  }
  const userInfo = await sendRequest<UserType>(initValue, `accounts/users/${id}`, "GET", false)
  return userInfo;
}

export async function getAllUser(): Promise<UserType[]> {
  const initValue: UserType[] = [{
    id: 0,
    username: ""
  }]

  const users = await sendRequest<UserType[]>(initValue, `accounts/users`, "GET", false)
  return users;
}

export async function verifyIsOwnUser(userInfo: UserType): Promise<boolean> {
  if(!userInfo) return false;

  const ownUser: UserType = await getAuthUser();
  if(ownUser == null){
    return false;
  }

  if(ownUser.id == userInfo.id)
  {
    return true;
  }

  return false;
}