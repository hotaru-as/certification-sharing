import Cookie from "universal-cookie";

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