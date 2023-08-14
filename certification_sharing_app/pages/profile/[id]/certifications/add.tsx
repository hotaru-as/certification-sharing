import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserCertification, getCertificationCategories } from "../../../../lib/certification";
import { CertificationCategory } from "../../../../type/CertificationCategory.type";
import { UserType } from "../../../../type/User.type";
import Layout from "../../../../components/Layout/Layout";
import InputLayout from "../../../../components/Layout/EditItem/InputLayout";
import SelectLayout from "../../../../components/Layout/EditItem/SelectLayout";
import AddItemCardLayout from "../../../../components/Layout/EditItem/AddItemCardLayout";
import TextAreaLayout from "../../../../components/Layout/EditItem/TextAreaLayout";
import UpdateCancelButtonLayout from "../../../../components/Layout/EditItem/UpdateCancelButtonLayout";

type CertificationAddType = {
  userInfo: UserType;
  certificationCategories: CertificationCategory[];
}

const CertificationAddPage: NextPage<CertificationAddType> = ({userInfo, certificationCategories}) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [certification, setCertification] = useState(0);
  const [examDate, setExamDate] = useState("");
  const [result, setResult] = useState("1");
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

  const addCertification = async () => {
    const boolResult = result == "1" ? true : false;
    if (certification == 0)
    {
      await createUserCertification(userInfo.id, 1, boolResult, examDate, comment)
    }
    else
    {
      await createUserCertification(userInfo.id, certification, boolResult, examDate, comment)
    }
    router.back()
  }

  return (
    <>
      <Layout title="CertificationEdit">
        {isOwnUser && (
          <AddItemCardLayout color="yellow" itemTitle="資格結果を新規登録する">
            <SelectLayout name="資格" defaultValue={certificationCategories[0].id}
              onChangeMethod={(evt) => setCertification(Number(evt.target.value))}>
              {certificationCategories.map((category: CertificationCategory) => 
                <option key={category.id} value={category.id}>{category.name}</option>
              )}
            </SelectLayout>

            <InputLayout name="受験日" type="date" value={examDate}
              onChangeMethod={(evt) => setExamDate(evt.target.value)} />

            <SelectLayout name="結果" defaultValue={result}
              onChangeMethod={(evt) => setResult(evt.target.value)}>
                <option value="1">合格</option>
                <option value="0">不合格</option>
            </SelectLayout>

            <TextAreaLayout name="コメント" value={comment}
              onChangeMethod={(evt) => setComment(evt.target.value)}/>

            <UpdateCancelButtonLayout name="追加" color="yellow" updateOnClickMethod={() => addCertification()}/>
          </AddItemCardLayout>
        )}
      </Layout>
    </>
  )
}

export default CertificationAddPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const certificationCategories = await getCertificationCategories();

  return {
    props: { 
      userInfo,
      certificationCategories
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
