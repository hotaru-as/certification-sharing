import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getAllUserIds, getAuthUser, getUser } from '../../../lib/accounts'
import { UserType } from '../../../type/User.type'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getUserProfile, updateUserProfile } from '../../../lib/userProfile'
import { UserProfile } from '../../../type/UserProfile.type'

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
    <>
    {
      isOwnUser &&
      (<>
        <label>アイコン
          <input type="file"
            onChange={evt => updateIcon(evt)}></input>
        </label>
        <label>自己紹介
          <input type="text" value={introduction || ""}
            onChange={evt => setIntroduction(evt.target.value)}></input>
        </label>
        <label>誕生日
          <input type="date" value={birthDay || ""}
            onChange={evt => setBirthDay(evt.target.value)}></input>
        </label>
        <button onClick={() => updateProfile()}>更新</button>
        <button onClick={() => router.back()}>キャンセル</button>
      </>)
    }
    </>
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
