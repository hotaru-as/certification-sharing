import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getAllUserIds, getAuthUser, getUser } from '../../../lib/accounts'
import { UserType } from '../../../type/User.type'
import { useRouter } from 'next/router'
import { getUserProfile, updateUserProfile } from '../../../lib/userProfile'
import { UserProfile } from '../../../type/UserProfile.type'
import Layout from '../../../components/Layout'

type profileType = {
  userInfo: any,
  userProfile: UserProfile;
}

const ProfilEditPage: NextPage<profileType> = ({userInfo, userProfile}) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [introduction, setIntroduction] = useState(userProfile.introduction);
  const [birthDay, setBirthDay] = useState(userProfile.birthDay)
  const [iconImg, setIconImg] = useState(userProfile.iconImg)

  useEffect(() => {
    verifyIsOwnUser();
  }, [])

  const verifyIsOwnUser = async () => {
    const ownUser: UserType= await getAuthUser();

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

  const updateProfile = async () => {
    await updateUserProfile(userInfo.id, introduction, birthDay, iconImg);
    router.back()
  }

  const updateIcon = (evt: any) => {
    const files = evt.target.files
    setIconImg(files[0])
  }
  
  return (
    <Layout title='ProfileEdit'>
    {
      isOwnUser &&
      (<>
        <div className="m-4">
          <h2 className="font-semibold text-pink-600 ml-1 mt-1">プロフィールを編集する</h2>
          <label className="flex flex-rows p-1">
            <p className="basis-20">アイコン</p>
            <input  className="border border-gray-800 basis-auto"
              type="file" onChange={evt => updateIcon(evt)}></input>
          </label>
          <label className="flex flex-rows p-1">
            <p className="basis-20">自己紹介</p>
            <textarea className="border border-gray-800 basis-1/3"
              value={introduction || ""}
              onChange={evt => setIntroduction(evt.target.value)}></textarea>
          </label>
          <label className="flex flex-rows p-1">
            <p className="basis-20">誕生日</p>
            <input className="border border-gray-800 basis-auto"
              type="date" value={birthDay || ""}
              onChange={evt => setBirthDay(evt.target.value)}></input>
          </label>
          <div className="flex flex-rows">
            <button className="border border-pink-600 basis-20 m-1 rounded bg-pink-600 text-white"
              onClick={() => updateProfile()}>更新</button>
            <button className="border border-pink-600 basis-20 m-1 rounded text-pink-600"
              onClick={() => router.back()}>キャンセル</button>
          </div>
        </div>
      </>)
    }
    </Layout>
  )
}

export default ProfilEditPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const userProfile = await getUserProfile(params.id);

  return {
    props: { 
      userInfo,
      userProfile,
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
