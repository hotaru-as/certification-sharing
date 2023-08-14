import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AddItemCardLayout from "../../../../components/Layout/EditItem/AddItemCardLayout";
import AuthLayout from "../../../../components/Layout/AuthLayout";
import InputLayout from "../../../../components/Layout/EditItem/InputLayout";
import SelectLayout from "../../../../components/Layout/EditItem/SelectLayout";
import TextAreaLayout from "../../../../components/Layout/EditItem/TextAreaLayout";
import UpdateCancelButtonLayout from "../../../../components/Layout/EditItem/UpdateCancelButtonLayout";

import { getAllUserIds, getUser, verifyIsOwnUser } from "../../../../lib/accounts";
import { createUserTarget, getTargetStatuses } from "../../../../lib/target";
import { TargetStatus } from "../../../../type/TargetStatus.type";
import { UserType } from "../../../../type/User.type";

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
    verifyIsOwnUser2();
  }, [])

  const verifyIsOwnUser2 = async () => {
    const isOwnUser = await verifyIsOwnUser(userInfo);
    setIsOwnUser(isOwnUser);
  }

  const addTarget = async () => {
    await createUserTarget(userInfo.id, target, deadline, status, comment);
    router.back();
  }
  
  return (
    <>
      <AuthLayout title="TargetEdit" isAuth={isOwnUser}>
        <AddItemCardLayout color="blue" itemTitle="目標を設定する">
          <InputLayout name="目標" type="text" value={target}
            onChangeMethod={(evt) => setTarget(evt.target.value)} />

          <InputLayout name="達成期限" type="date" value={deadline}
            onChangeMethod={(evt) => setDeadline(evt.target.value)} />
          
          <SelectLayout name="ステータス" defaultValue={targetStatuses[0].id}
            onChangeMethod={(evt) => setStatus(Number(evt.target.value))}>
            {targetStatuses.map((status: any) => 
              <option key={status.id} value={status.id}>{status.name}</option>
            )}
          </SelectLayout>

          <TextAreaLayout name="コメント" value={comment}
            onChangeMethod={(evt) => setComment(evt.target.value)}/>

          <UpdateCancelButtonLayout name="追加" color="blue" updateOnClickMethod={() => addTarget()}/>
        </AddItemCardLayout>
      </AuthLayout>
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
    notFound: !userInfo || userInfo.id == 0,
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
