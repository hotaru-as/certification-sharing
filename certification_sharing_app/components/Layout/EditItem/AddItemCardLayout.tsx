import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode,
  color: string,
  itemTitle: string
}

export default function AddItemCardLayout({ children, color = "pink", itemTitle = "" }: LayoutProps) {
  const bgColor = `bg-${color}-200`;
  const divCss = `m-4 border rounded-tr-2xl w-80 ${bgColor}`

  const textColor = `text-${color}-600`;
  const titleCss = `font-semibold ml-1 mt-1 ${textColor}`

  return (
    <div className={divCss}>
      <h2 className={titleCss}>{itemTitle}</h2>
      {children}
    </div>
  )
}

