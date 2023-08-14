import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AddItemCardLayout from "../../../../components/Layout/EditItem/AddItemCardLayout";
import AuthLayout from "../../../../components/Layout/AuthLayout";
import InputLayout from "../../../../components/Layout/EditItem/InputLayout";
import TextAreaLayout from "../../../../components/Layout/EditItem/TextAreaLayout";
import UpdateCancelButtonLayout from "../../../../components/Layout/EditItem/UpdateCancelButtonLayout";

import { getAllUserIds, getUser, verifyIsOwnUser } from "../../../../lib/accounts";
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
    verifyIsOwnUser2();
  }, []);
  
  const verifyIsOwnUser2 = async () => {
    const isOwnUser = await verifyIsOwnUser(userInfo);
    setIsOwnUser(isOwnUser);
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
      <AuthLayout title="StudyEdit" isAuth={isOwnUser}>
        <AddItemCardLayout color="green" itemTitle="勉強記録を登録する">
          <InputLayout name="勉強内容" type="text" value={content}
            onChangeMethod={(evt) => setContent(evt.target.value)} />

          <InputLayout name="開始時刻" type="datetime-local" value={startTime}
            onChangeMethod={(evt) => setStartTime(evt.target.value)} />

          <InputLayout name="終了時刻" type="datetime-local" value={endTime}
            onChangeMethod={(evt) => setEndTime(evt.target.value)} />

          <TextAreaLayout name="コメント" value={comment}
            onChangeMethod={(evt) => setComment(evt.target.value)}/>

          <UpdateCancelButtonLayout name="追加" color="green" updateOnClickMethod={() => addStudy()}/>
        </AddItemCardLayout>
      </AuthLayout>
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
