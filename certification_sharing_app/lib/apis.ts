import Cookie from "universal-cookie";
const cookie = new Cookie();

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${cookie.get("access_token")}`
        },
        body: JSON.stringify({
          "user_id": id,
          // "introduction": introduction,
          "introduction": null,
          "birth_day": birthDay,
          // "birth_day": null,
          // "icon_url": iconUrl,
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
