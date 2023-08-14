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
      <header className="bg-red-200 h-auto">
        <h1 className="text-white text-center text-3xl p-4 font-extrabold">Study Sharing</h1>
      </header>
      {/* <main className="w-auto md:max-w-screen-md m-4 md:m-8"> */}
      <main className="w-auto md:max-w-screen-md m-4 md:mx-auto">
        {children}
      </main>
      <footer className="bg-red-200">
        <p className="text-white text-center">@Hotaru</p>
      </footer>
    </div>
  )
}