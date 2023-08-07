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
  const [result, setResult] = useState(true);
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
    if (certification == 0)
    {
      await createUserCertification(userInfo.id, 1, result, examDate, comment)
    }
    else
    {
      await createUserCertification(userInfo.id, certification, result, examDate, comment)
    }
    router.back()
  }

  return (
    <>
      {
        isOwnUser && 
        (
          <>
            <label className="flex flex-rows" htmlFor="name">
              <p className="basis-1/12">資格</p>
              <select className="border basis-1/6" onChange={(evt) => setCertification(Number(evt.target.value))} defaultValue={certificationCategories[0].id}>
                {certificationCategories.map((category: CertificationCategory) => 
                  <option key={category.id} value={category.id}>{category.name}</option>
                )}
              </select>
            </label>
            <label className="flex flex-rows">
              <p className="basis-1/12">受験日</p>
              <input className="border basis-1/6" type="date" value={examDate || ""}
                onChange={(evt) => setExamDate(evt.target.value)} />
            </label>
            <label className="block">結果
              <select className="border" onChange={(evt) => setResult(evt.target.value == "1" ? true : false)}
                defaultValue={result ? "1" : "0"}>
                <option value="1">合格</option>
                <option value="0">不合格</option>
              </select>
            </label>
            <label className="block">コメント
              <input className="border" type="text" value={comment || ""}
              onChange={(evt) => setComment(evt.target.value)} />
            </label>
            <button className="border" onClick={() => addCertification()}>更新</button>
            <button className="border" onClick={() => router.back()}>キャンセル</button>
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
