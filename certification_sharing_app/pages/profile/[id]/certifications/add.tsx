import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUserIds, getAuthUser, getUser } from "../../../../lib/accounts";
import { createUserCertification, getCertificationCategories } from "../../../../lib/certification";
import { CertificationCategory } from "../../../../type/CertificationCategory.type";
import { UserType } from "../../../../type/User.type";
import Layout from "../../../../components/Layout";

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
          <Layout title="CertificationEdit">
            <div className="m-4 border rounded-tr-2xl bg-yellow-200 w-96">
              <h2 className="font-semibold text-yellow-600 ml-1 mt-1">資格結果を新規登録する</h2>
              <label className="flex flex-rows p-2">
                <p className="basis-20">資格</p>
                <select className="border border-gray-800 basis-1/6" 
                  onChange={(evt) => setCertification(Number(evt.target.value))} 
                  defaultValue={certificationCategories[0].id}>
                  {certificationCategories.map((category: CertificationCategory) => 
                    <option key={category.id} value={category.id}>{category.name}</option>
                  )}
                </select>
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">受験日</p>
                <input className="border border-gray-800 basis-auto" 
                  type="date" value={examDate || ""}
                  onChange={(evt) => setExamDate(evt.target.value)} />
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">結果</p>
                <select className="border border-gray-800 basis-auto" 
                  onChange={(evt) => setResult(evt.target.value == "1" ? true : false)}
                  defaultValue={result ? "1" : "0"}>
                  <option value="1">合格</option>
                  <option value="0">不合格</option>
                </select>
              </label>
              <label className="flex flex-rows p-2">
                <p className="basis-20">コメント</p>
                <textarea className="border border-gray-800 basis-auto" 
                  value={comment || ""}
                  onChange={(evt) => setComment(evt.target.value)} />
              </label>
              <div className="flex flex-rows">
                <button className="border border-yellow-600 basis-20 m-1 rounded bg-yellow-600 text-white"
                  onClick={() => addCertification()}>更新</button>
                <button className="border border-yellow-600 basis-20 m-1 rounded text-yellow-600"
                  onClick={() => router.back()}>キャンセル</button>
              </div>
            </div>
          </Layout>
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
