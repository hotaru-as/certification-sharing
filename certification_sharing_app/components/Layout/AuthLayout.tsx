import { ReactNode } from "react";
import Layout from "./Layout";
import Custom404Page from "../../pages/404";

type LayoutProps = {
  children: ReactNode,
  title?: string,
  isAuth: boolean
}

export default function AuthLayout({ children, title = "Default title", isAuth }: LayoutProps) {
  return (
    <>
      { isAuth 
        ? <Layout title={title}>
            {children}
          </Layout>
        : <Custom404Page /> }
    </>
  )
}