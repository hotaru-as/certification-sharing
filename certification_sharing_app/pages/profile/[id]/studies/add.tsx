import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserStudy } from "../../../../lib/study";
import { UserType } from "../../../../type/User.type";

const StudyAddPage: NextPage<UserType> = (userInfo) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [content, setContent] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    verifyIsOwnUser();
  }, []);
  
  const verifyIsOwnUser = async () => {
    const ownUser: UserType  = await getAuthUser();

    if(ownUser == null) {
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
            <label>勉強時間
              <input type="text" value={studyTime || ""}
              onChange={(evt) => setStudyTime(evt.target.value)} />
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
