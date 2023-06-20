import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserCertification, getCertificationCategories } from "../../../../lib/certification";
import { CertificationCategory } from "../../../../type/CertificationCategory.type";
import { UserType } from "../../../../type/User.type";

type CertificationAddType = {
  userInfo: UserType;
  certificationCategories: CertificationCategory[];
}

const CertificationAddPage: NextPage<CertificationAddType> = ({userInfo, certificationCategories}) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [certification, setCertification] = useState(0);
  const [examDate, setExamDate] = useState("");
  const [result, setResult] = useState(false);
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
    await createUserCertification(userInfo.id, certification, result, examDate, comment)
    router.back()
  }

  return (
    <>
      {
        isOwnUser && 
        (
          <>
            <label>資格
              <select onChange={(evt) => setCertification(Number(evt.target.value))}>
                {certificationCategories.map((category: CertificationCategory) => 
                  <option key={category.id} value={category.id}>{category.name}</option>
                )}
              </select>
            </label>
            <label>受験日
              <input type="date" value={examDate || ""}
                onChange={(evt) => setExamDate(evt.target.value)} />
            </label>
            <label>結果
              <select onChange={(evt) => setResult(evt.target.value == "1" ? true : false)}>
                <option value="1">合格</option>
                <option value="0">不合格</option>
              </select>
            </label>
            <label>コメント
              <input type="text" value={comment || ""}
              onChange={(evt) => setComment(evt.target.value)} />
            </label>
            <button onClick={() => addCertification()}>更新</button>
            <button onClick={() => router.back()}>キャンセル</button>
          </>
        )
      }
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
