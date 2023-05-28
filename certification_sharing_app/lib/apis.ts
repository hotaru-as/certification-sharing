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
