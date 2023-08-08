import { FC } from "react";
import { TargetType } from "../type/Target.type";
import { TargetStatus } from "../type/TargetStatus.type";

const TargetItem: FC<{target: TargetType, statuses: TargetStatus[]}> = ({target, statuses}) => {
  return (
    <>
      <div className="border rounded-tr-2xl bg-blue-300 p-2 my-2">
        <p className="font-bold border-double border-b-4 border-black mb-2">
          目標: {target.target}
        </p>
        <p>期限: {target.targetDeadline}</p>
        <p>ステータス: {statuses.find((status: TargetStatus) => status.id == target.status).name}</p>
      </div>
    </>
  )
}

export default TargetItem;
