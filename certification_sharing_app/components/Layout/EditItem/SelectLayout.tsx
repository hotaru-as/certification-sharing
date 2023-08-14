import { ChangeEventHandler, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode,
  name: string,
  defaultValue: string | number | readonly string[] | undefined,
  onChangeMethod: ChangeEventHandler<HTMLSelectElement>
}

export default function SelectLayout({ children, name, defaultValue, onChangeMethod }: LayoutProps) {
  return (
    <>
      <label className="flex flex-rows p-2">
        <p className="basis-20">{name}</p>
        <select className="border border-gray-800 basis-auto" 
          onChange={(evt) => onChangeMethod(evt)}
          defaultValue={defaultValue}>
          {children}
        </select>
      </label>
    </>
  )
}
