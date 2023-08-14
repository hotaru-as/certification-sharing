import { useRouter } from "next/router";
import { useState } from "react";
import { getAuthUser, login, register } from "../lib/accounts";
import { createUserProfile } from "../lib/userProfile";
import { UserType } from "../type/User.type";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const authUser = async (e: any) => {
    e.preventDefault();
    const isRegistered = await register(username, password);
    if(isRegistered)
    {
      const isLogin = await login(username, password);
      const userInfo: UserType = await getAuthUser();
      await createUserProfile(userInfo.id);
      if (isLogin)
      {
        router.push('/')
      }
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={authUser}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input id="username" name="username" type="text" required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                onChange={(evt) => setUsername(evt.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              onChange={(evt) => setPassword(evt.target.value)}
            />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
