import Cookie from "universal-cookie";

const cookie = new Cookie();

export async function login(username: string, password: string) {
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
      console.log("login complete")
    })
    // router.push("/main-page")
  } catch(err) {
    alert(err);
  }
}

export async function register(username: string, password: string)
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
      console.log("register complete");
    });
  } catch(err) {
    alert(err);
  }
}