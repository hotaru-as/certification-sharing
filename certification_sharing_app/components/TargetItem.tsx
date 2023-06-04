import { FC } from "react";
import { TargetType } from "../type/Target.type";

const TargetItem: FC<{target: TargetType, statuses: any[]}> = ({target, statuses}) => {
  return (
    <>
      <div className="border rounded border-blue-400">
        <p className="font-bold">{target.content}</p>
        <p>期限: {target.date}</p>
        <p>ステータス: {statuses.find((status: any) => status.id == target.status).name}</p>
      </div>
    </>
  )
}

export default TargetItem;
