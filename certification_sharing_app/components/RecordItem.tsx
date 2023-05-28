import { FC } from "react";
import { RecordType } from "../type/Record.type";
  
const RecordItem: FC<{record: RecordType}> = ({record}) => {
    return (
    <>
      <p>勉強内容: {record.content}</p>
      <p>勉強時間: {record.time}</p>
    </>
  )
}

export default RecordItem;
