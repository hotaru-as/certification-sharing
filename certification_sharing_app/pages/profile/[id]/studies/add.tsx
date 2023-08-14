import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserStudy } from "../../../../lib/study";
import { UserType } from "../../../../type/User.type";
import Layout from "../../../../components/Layout/Layout";
import AddItemCardLayout from "../../../../components/Layout/EditItem/AddItemCardLayout";
import UpdateCancelButtonLayout from "../../../../components/Layout/EditItem/UpdateCancelButtonLayout";
import InputLayout from "../../../../components/Layout/EditItem/InputLayout";
import TextAreaLayout from "../../../../components/Layout/EditItem/TextAreaLayout";

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
      <Layout title="StudyEdit">
        {isOwnUser && (
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
        )}
      </Layout>
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
