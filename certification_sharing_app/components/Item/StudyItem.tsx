import { FC } from "react";
import { StudyType } from "../../type/Study.type";
  
const StudyItem: FC<{study: StudyType}> = ({study}) => {
    return (
    <>
      <div className="border rounded-tr-2xl bg-green-300 p-2 my-2">
        <p className="font-bold border-double border-b-4 border-black mb-2">
          勉強内容: {study.content}
        </p>
        <p>勉強時間: {study.studyTime}</p>
      </div>
    </>
  )
}

export default StudyItem;
