import { useRouter } from "next/router";
import { ReactNode } from "react";
import { UserType } from "../../type/User.type";

type LayoutProps = {
  children: ReactNode,
  userInfo: UserType
  color: string,
  title: string
}

export default function ItemListLayout({ children, userInfo, color = "pink", title = "" }: LayoutProps) {
  const router = useRouter();

  const textColor600 = `text-${color}-600`;
  const textColor400 = `text-${color}-400`;

  return (
    <div className='my-2 max-w-sm'>
      <p className={textColor600}>{userInfo && userInfo.username}{title}</p>
        {children}
      <button className={textColor400} onClick={() => router.back()}>ユーザーページに戻る</button>
    </div>
  )
}
