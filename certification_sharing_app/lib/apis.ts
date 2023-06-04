import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import Cookie from "universal-cookie";
import { TargetType } from "../type/Target.type";
const cookie = new Cookie();

export async function sendRequest(uri: string, method: string, auth: boolean, body?: RequestInit)
{
  var headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if(auth){
    headers = {
      ...headers, 
      "Authorization": `JWT ${cookie.get("access_token")}`
    }
  }
  
  // body = {body: JSON.stringify({})}

  const request: RequestInit = {
    method: `${method}`,
    headers: headers,
    ...body
  };

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}${uri}`,
      request,
    )
    .then((res) => {
      if (res.status !== 200) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json()
      }
    });
    return data;
  } catch(err) {
    return null;
  }
}

export async function getUserProfile(id: string) {
  try{
    const userProfile = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/users/${id}/profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },  
      }
    )
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return {
          user_id: id,
          introduction: "",
          birth_day: "",
          icon_url: ""
        };
      }
    });
    return userProfile;
  } catch(err) {
    return {
      user_id: id,
      introduction: "",
      birth_day: "",
      icon_url: ""
    };
  }
}

export async function createUserProfile(id: number)
{
  try{
    const userProfile = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/users/profile/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${cookie.get("access_token")}`
        },
        body: JSON.stringify({
          "user_id": id,
          "introduction": null,
          "birth_day": null,
          "icon_url": null,
        })
      }
    )
    .then((res) => {
      if (res.status === 400) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json()
      }
    });
    return userProfile;
  } catch(err) {
    alert(err);
    return null;
  }  
}

export async function updateUserPofile(id: number, introduction: string, birthDay: string, iconUrl: string)
{
  try{
    const userProfile = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/users/${id}/profile/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${cookie.get("access_token")}`
        },
        body: JSON.stringify({
          "introduction": introduction,
          "birth_day": birthDay,
          "icon_url": iconUrl,
        })
      }
    )
    .then((res) => {
      if (res.status === 400) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json()
      }
    });
    return userProfile;
  } catch(err) {
    alert(err);
    return null;
  }  
}

export async function getTargetStatuses()
{
  const targetStatuses = await sendRequest("api/target-status/", "GET", false)
  return targetStatuses;
  // try{
  //   const targetStatuses = await fetch(
  //     `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/target-status/`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     if (res.status !== 200) {
  //       throw "authentication failed";
  //     } else if (res.ok) {
  //       return res.json()
  //     }
  //   });
  //   return targetStatuses;
  // } catch(err) {
  //   return null;
  // }
}

export async function getUserTargets(id: number): Promise<TargetType[]>
{
  const param = {
    "user": `${id}`
  }
  const query = new URLSearchParams(param);

  try{
    const targets = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/targets/?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.status !== 200) {
        throw "authentication failed";
      } else if (res.ok) {
        return res.json();
      }
    });
    const userTargets: TargetType[] = targets.map((target: any) => {
      const temp: TargetType = {
        id: target.id,
        content: target.target,
        date: target.target_deadline,
        status: target.status,
        comment: target.comment,
        createdAt: target.created_at
      }
      return temp;
    });
    console.log(userTargets);
    return userTargets;
  } catch(err) {
    return [];
  }
}

export async function createUserTarget(
  userId: number, target: string, targetDeadline: string, statusId: string, comment: string)
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