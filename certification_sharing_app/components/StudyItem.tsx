import { FC } from "react";
import { StudyType } from "../type/Study.type";
  
const StudyItem: FC<{study: StudyType}> = ({study}) => {
    return (
    <>
      <p>勉強内容: {study.content}</p>
      <p>勉強時間: {study.studyTime}</p>
    </>
  )
}

export default StudyItem;
