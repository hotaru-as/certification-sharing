import Cookie from "universal-cookie";
import { UserInfoType } from "../type/UserInfo.type";

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

export async function getOwnUser()
{
  try{
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}accounts/auth/users/me/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${cookie.get("access_token")}`
        },
      }
    )
    .then((res) => {
      if (res.status === 400) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json();
      }
    });
    const userInfo: UserInfoType = {
      user_id: data.id,
      user_name: data.username
    };
    return userInfo;
  } catch(err) {
    alert(err);
  }
  return null;
}

export async function getAllUserIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}accounts/users`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  
  const users: any[] = await res.json()

  return users.map((user: any) => {
    return {
      params: {
        id: String(user.id)
      }
    }
  })
}

export async function getUser(id: string)
{
  try{
    const userInfo = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}accounts/users/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },  
      }
    )
    .then((res) => {
      if (res.status === 400) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json()
      }
    });
    return userInfo;
  } catch(err) {
    alert(err);
    return null;
  }  
}
