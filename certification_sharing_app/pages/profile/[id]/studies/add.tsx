import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserStudy } from "../../../../lib/study";
import { UserType } from "../../../../type/User.type";

type TargetAddType = {
  userInfo: UserType,
}

const StudyAddPage: NextPage<TargetAddType> = ({userInfo}) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    verifyIsOwnUser();
  }, []);
  
  const verifyIsOwnUser = async () => {
    const ownUser: UserType = await getAuthUser();

    if(ownUser == null){
      setIsOwnUser(false);
      return;
    }

    if(ownUser.id == userInfo.id)
    {
      setIsOwnUser(true);
      return;
    }
    setIsOwnUser(false);    
  }

  const addStudy = async () => {
    const studyMillSec = new Date(endTime).getTime() - new Date(startTime).getTime();
    const studyTime = (studyMillSec/1000).toString()
    console.log(studyTime)
    await createUserStudy(userInfo.id, content, studyTime, comment);
    router.back();
  }

  return (
    <>
      {
        isOwnUser &&
        (
          <>
            <label>勉強内容
              <input type="text" value={content || ""}
              onChange={(evt) => setContent(evt.target.value)} />
            </label>
            <label>開始時刻
              <input type="datetime-local" value={startTime || ""}
              onChange={(evt) => setStartTime(evt.target.value)} />
            </label>
            <label>終了時刻
              <input type="datetime-local" value={endTime || ""}
              onChange={(evt) => setEndTime(evt.target.value)} />
            </label>
            <label>コメント
              <input type="text" value={comment || ""}
              onChange={(evt) => setComment(evt.target.value)} />
            </label>
            <button onClick={() => addStudy()}>更新</button>
            <button onClick={() => router.back()}>キャンセル</button>
          </>
        )
      }
    </>
  )
}

export default StudyAddPage;

export async function getStaticProps({ params }: any)
{
  const userInfo = await getUser(params.id);

  return {
    props: {
      userInfo,
    },
    revalidate: 3,
  }
}

export async function getStaticPaths()
{
  const paths = await getAllUserIds();

  return {
    paths,
    fallback: true,
  }
}
