import { useRouter } from "next/router";
import { MouseEvent } from "react";

type LayoutProps = {
  name: string,
	color: string,
	updateOnClickMethod: () => Promise<void>
}

export default function UpdateCancelButtonLayout({ name, color, updateOnClickMethod }: LayoutProps) {
  const router = useRouter();

	const borderColor = `border-${color}-600`
	const bgColor = `bg-${color}-600`
	const textColor = `text-${color}-600`

	const updateButtonCss = `border basis-20 m-1 rounded text-white ${borderColor} ${bgColor}`;
	const cancelButtonCss = `border basis-20 m-1 rounded ${borderColor} ${textColor}`;

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
