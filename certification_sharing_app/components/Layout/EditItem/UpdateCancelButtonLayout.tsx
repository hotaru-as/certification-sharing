import { useRouter } from "next/router";

type LayoutProps = {
  name: string,
	color: string,
	updateOnClickMethod: () => Promise<void>
}

const getUpdateButtonCss = (color: string) => {
	switch(color)
	{
	  case "pink":
  		return "border basis-20 m-1 rounded text-white border-pink-600 bg-pink-600"
	  case "yellow":
      return "border basis-20 m-1 rounded text-white border-yellow-600 bg-yellow-600"
	  case "green":
      return "border basis-20 m-1 rounded text-white border-green-600 bg-green-600"
	  case "blue":
      return "border basis-20 m-1 rounded text-white border-blue-600 bg-blue-600"
	  default:
      return "border basis-20 m-1 rounded text-white border-pink-600 bg-pink-600"
	}
}

const getCancelButtonCss = (color: string) => {
	switch(color)
	{
	  case "pink":
  		return "border basis-20 m-1 rounded border-pink-600 text-pink-600"
	  case "yellow":
      return "border basis-20 m-1 rounded border-yellow-600 text-yellow-600"
	  case "green":
      return "border basis-20 m-1 rounded border-green-600 text-green-600"
	  case "blue":
      return "border basis-20 m-1 rounded border-blue-600 text-blue-600"
	  default:
      return "border basis-20 m-1 rounded border-pink-600 text-pink-600"
	}
}

export default function UpdateCancelButtonLayout({ name, color, updateOnClickMethod }: LayoutProps) {
  const router = useRouter();

	const updateButtonCss = getUpdateButtonCss(color);
	const cancelButtonCss = getCancelButtonCss(color);

	return (
    <>
			<div className="flex flex-rows">
				<button className={updateButtonCss}
					onClick={() => updateOnClickMethod()}>{name}</button>
				<button className={cancelButtonCss}
					onClick={() => router.back()}>キャンセル</button>
			</div>
    </>
  )
}
