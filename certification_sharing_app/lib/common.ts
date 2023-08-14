import Cookie from "universal-cookie";
const cookie = new Cookie();

export async function sendRequest<T>(initValue: T, uri: string, method: string, auth: boolean, body?: RequestInit): Promise<T>
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
      if (!res.ok) {
        throw "fetch failed";
      } else {
        return res.json()
      }
    });
    return data;
  } catch(err) {
    return initValue;
  }
}