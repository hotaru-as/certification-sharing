import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode,
  color: string,
  itemTitle: string
}

const getDivCss = (color: string) => {
  switch(color)
  {
    case "pink":
      return "m-4 border rounded-tr-2xl w-80 bg-pink-200"
    case "yellow":
      return "m-4 border rounded-tr-2xl w-80 bg-yellow-200"
    case "green":
      return "m-4 border rounded-tr-2xl w-80 bg-green-200"
    case "blue":
      return "m-4 border rounded-tr-2xl w-80 bg-blue-200"
    default:
      return "m-4 border rounded-tr-2xl w-80 bg-pink-200"
  }
}

const getTitleCss = (color: string) => {
  switch(color)
  {
    case "pink":
      return "font-semibold ml-1 mt-1 text-pink-600"
    case "yellow":
      return "font-semibold ml-1 mt-1 text-yellow-600"
    case "green":
      return "font-semibold ml-1 mt-1 text-green-600"
    case "blue":
      return "font-semibold ml-1 mt-1 text-blue-600"
    default:
      return "font-semibold ml-1 mt-1 text-pink-600"
  }
}

export default function AddItemCardLayout({ children, color = "pink", itemTitle = "" }: LayoutProps) {
  const divCss = getDivCss(color)
  const titleCss = getTitleCss(color)

  return (
    <div className={divCss}>
      <h2 className={titleCss}>{itemTitle}</h2>
      {children}
    </div>
  )
}

