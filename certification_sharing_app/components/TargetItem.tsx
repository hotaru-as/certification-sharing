import { FC } from "react";
import { TargetType } from "../type/Target.type";

const TargetItem: FC<{target: TargetType}> = ({target}) => {
    return (
    <>
      <p>目標: {target.content}</p>
      <p>期限: {target.date}</p>
      <p>ステータス: {target.status}</p>
    </>
  )
}

export default TargetItem;
