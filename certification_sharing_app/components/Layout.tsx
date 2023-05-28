import Head from "next/head";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode,
    title?: string
}

export default function Layout({ children, title = "Default title" }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        {children}
      </main>
      <footer>
        @Hotaru
      </footer>
    </div>
  )
}