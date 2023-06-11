import { FC } from "react";
import { TargetType } from "../type/Target.type";
import { TargetStatus } from "../type/TargetStatus.type";

const TargetItem: FC<{target: TargetType, statuses: TargetStatus[]}> = ({target, statuses}) => {
  return (
    <>
      <div className="border rounded border-blue-400">
        <p className="font-bold">{target.target}</p>
        <p>期限: {target.targetDeadline}</p>
        <p>ステータス: {statuses.find((status: any) => status.id == target.status).name}</p>
      </div>
    </>
  )
}

export default TargetItem;
