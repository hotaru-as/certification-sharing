import { FC } from "react";
import { TargetType } from "../type/Target.type";

const TargetItem: FC<{target: TargetType, statuses: any[]}> = ({target, statuses}) => {
  return (
    <>
      <p>目標: {target.content}</p>
      <p>期限: {target.date}</p>
      <p>ステータス: {statuses.find((status: any) => status.id == target.status).name}</p>
    </>
  )
}

export default TargetItem;
