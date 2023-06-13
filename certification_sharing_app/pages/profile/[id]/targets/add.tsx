import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserTarget, getTargetStatuses } from "../../../../lib/target";
import { TargetStatus } from "../../../../type/TargetStatus.type";
import { UserType } from "../../../../type/User.type";

type TargetAddType = {
  userInfo: any,
  targetStatuses: TargetStatus[]
}

const TargetAddPage: NextPage<TargetAddType> = ({ userInfo, targetStatuses }) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState(targetStatuses[0].id);
  const [comment, setComment] = useState("");

  useEffect(() => {
    verifyIsOwnUser();
  }, [])

  const verifyIsOwnUser = async () => {
    const ownUser: UserType = await getAuthUser();
    console.log(targetStatuses)

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
          <>
            <label>目標
              <input type="text" value={target || ""}
              onChange={(evt) => setTarget(evt.target.value)} />
            </label>
            <label>達成期限
              <input type="date" value={deadline || ""}
              onChange={(evt) => setDeadline(evt.target.value)} />
            </label>
            <label>ステータス
              <select onChange={(evt) => setStatus(Number(evt.target.value))}
                defaultValue={targetStatuses[0].id}>
                {targetStatuses.map((status: any) => 
                  <option key={status.id} value={status.id}>{status.name}</option>
                )}
              </select>
            </label>
            <label>コメント
              <input type="text" value={comment || ""}
              onChange={(evt) => setComment(evt.target.value)} />
            </label>
            <button onClick={() => addTarget()}>更新</button>
            <button onClick={() => router.back()}>キャンセル</button>
          </>
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
