import { ChangeEventHandler } from "react";

type LayoutProps = {
  name: string,
  type: string,
  value: string | undefined,
  onChangeMethod: ChangeEventHandler<HTMLInputElement>
}

export default function InputLayout({ name, type, value, onChangeMethod }: LayoutProps) {
  return (
    <>
      <label className="flex flex-rows p-2">
        <p className="basis-20">{name}</p>
        <input className="border border-gray-800 basis-auto"
          type={type} value={value || ""}
          onChange={(evt) => onChangeMethod(evt)} />
      </label>
    </>
  )
}
