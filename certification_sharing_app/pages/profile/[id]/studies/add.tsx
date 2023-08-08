import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserStudy } from "../../../../lib/study";
import { UserType } from "../../../../type/User.type";
import Layout from "../../../../components/Layout";

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
          <Layout title="StudyEdit">
            <div className="m-4 border rounded-tr-2xl bg-green-200 w-80">
              <h2 className="font-semibold text-green-600 ml-1 mt-1">勉強記録を登録する</h2>
              <label className="flex flex-rows p-2">
                <p className="basis-20">勉強内容</p>
                <input className="border border-gray-800 basis-auto"
                  type="text" value={content || ""}
                  onChange={(evt) => setContent(evt.target.value)} />
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">開始時刻</p>
                <input className="border border-gray-800 basis-auto"
                  type="datetime-local" value={startTime || ""}
                  onChange={(evt) => setStartTime(evt.target.value)} />
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">終了時刻</p>
                <input className="border border-gray-800 basis-auto"
                  type="datetime-local" value={endTime || ""}
                  onChange={(evt) => setEndTime(evt.target.value)} />
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">コメント</p>
                <textarea className="border border-gray-800 basis-auto"
                  value={comment || ""}
                  onChange={(evt) => setComment(evt.target.value)} />
              </label>
              <div className="flex flex-rows">
                <button className="border border-green-600 basis-20 m-1 rounded bg-green-600 text-white"
                  onClick={() => addStudy()}>更新</button>
                <button className="border border-green-600 basis-20 m-1 rounded text-green-600"
                  onClick={() => router.back()}>キャンセル</button>
              </div>
            </div>
          </Layout>
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
