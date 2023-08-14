import { ChangeEventHandler } from "react";

type LayoutProps = {
  name: string,
  value: string | undefined,
  onChangeMethod: ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextAreaLayout({ name, value, onChangeMethod }: LayoutProps) {
  return (
    <>
      <label className="flex flex-rows p-2">
        <p className="basis-20">{name}</p>
        <textarea className="border border-gray-800 basis-auto" 
          value={value || ""}
          onChange={(evt) => onChangeMethod(evt)} />
      </label>
    </>
  )
}
