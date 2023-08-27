import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { UserType } from "../../type/User.type";
import { getAuthUser, logout } from "../../lib/accounts";
import { useRouter } from "next/router";

type LayoutProps = {
    children: ReactNode,
    title?: string
}

export default function Layout({ children, title = "Default title" }: LayoutProps) {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getLoginUser();
  }, [])

  const getLoginUser = async () => {
    const loginUser: UserType = await getAuthUser();
    const isLogin = (loginUser && loginUser.id !== 0) ? true : false;
    setIsLogin(isLogin);
  }

  const setLogout = () => {
    logout()
    router.push("/login")
  }

  const setLogin = () => {
    router.push("/login")    
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="bg-red-200 h-auto">
        <div className="text-right px-2 pt-1">

          <button>
            {
              isLogin
              ? <a className="text-white" onClick={() => setLogout()}>ログアウト</a>
              : <a className="text-white" onClick={() => setLogin()}>ログイン</a>
            }
          </button>
        </div>
        <Link href={`/`}>
          <a><h1 className="text-white text-center text-3xl pb-4 font-bold md:font-extrabold">Study Sharing</h1></a>
        </Link>
      </header>
      <main className="w-auto md:max-w-screen-md m-4 md:mx-auto">
        {children}
      </main>
      <footer className="bg-red-200">
        <p className="text-white text-center">@Hotaru</p>
      </footer>
    </div>
  )
}