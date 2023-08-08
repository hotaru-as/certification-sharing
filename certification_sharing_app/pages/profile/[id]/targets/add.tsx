import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserTarget, getTargetStatuses } from "../../../../lib/target";
import { TargetStatus } from "../../../../type/TargetStatus.type";
import { UserType } from "../../../../type/User.type";
import Layout from "../../../../components/Layout";

type TargetAddType = {
  userInfo: UserType,
  targetStatuses: TargetStatus[]
}

const TargetAddPage: NextPage<TargetAddType> = ({ userInfo, targetStatuses }) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState(targetStatuses ? targetStatuses[0].id : 1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    verifyIsOwnUser();
  }, [])

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

  const addTarget = async () => {
    await createUserTarget(userInfo.id, target, deadline, status, comment);
    router.back();
  }
  
  return (
    <>
      {
        isOwnUser && 
        (
          <Layout title="TargetEdit">
            <div className="m-4 border rounded-tr-2xl bg-blue-200 w-80">
              <h2 className="font-semibold text-blue-600 ml-1 mt-1">目標を設定する</h2>
              <label className="flex flex-rows p-2">
                <p className="basis-20">目標</p>
                <input className="border border-gray-800 basis-auto"
                  type="text" value={target || ""}
                  onChange={(evt) => setTarget(evt.target.value)} />
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">達成期限</p>
                <input className="border border-gray-800 basis-auto"
                  type="date" value={deadline || ""}
                  onChange={(evt) => setDeadline(evt.target.value)} />
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">ステータス</p>
                <select className="border border-gray-800 basis-auto"
                  onChange={(evt) => setStatus(Number(evt.target.value))}
                  defaultValue={targetStatuses[0].id}>
                  {targetStatuses.map((status: any) => 
                    <option key={status.id} value={status.id}>{status.name}</option>
                  )}
                </select>
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">コメント</p>
                <textarea className="border border-gray-800 basis-auto"
                  value={comment || ""}
                  onChange={(evt) => setComment(evt.target.value)} />
              </label>
              <div className="flex flex-rows">
                <button className="border border-blue-600 basis-20 m-1 rounded bg-blue-600 text-white"
                  onClick={() => addTarget()}>更新</button>
                <button className="border border-blue-600 basis-20 m-1 rounded text-blue-600"
                  onClick={() => router.back()}>キャンセル</button>
              </div>
            </div>
          </Layout>
        )
      }
    </>
  )
}

export default TargetAddPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const targetStatuses = await getTargetStatuses();

  return {
    props: { 
      userInfo,
      targetStatuses
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
