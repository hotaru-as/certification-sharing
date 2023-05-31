import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getAllUserIds, getOwnUser, getUser } from '../../../lib/accounts'
import { getUserProfile, updateUserPofile } from '../../../lib/apis'
import { UserInfoType } from '../../../type/UserInfo.type'
import Link from 'next/link'
import { useRouter } from 'next/router'

type profileType = {
  userInfo: any,
  userProfile: any;
}

const ProfilEditPage: NextPage<profileType> = ({userInfo, userProfile}) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [introduction, setIntroduction] = useState(userProfile.introduction);
  const [birthDay, setBirthDay] = useState(userProfile.birth_day)
  const [iconUrl, setIconUrl] = useState(userProfile.icon_url)

  useEffect(() => {
    verifyIsOwnUser();
  }, [])

  const verifyIsOwnUser = async () => {
    const ownUser: UserInfoType= await getOwnUser();

    if(ownUser == null){
      setIsOwnUser(false);
      return;
    }

    if(ownUser.user_id == userInfo.id)
    {
      setIsOwnUser(true);
      return;
    }
    setIsOwnUser(false);    
  }

  const updateUserProfile = async () => {
    console.log(birthDay)
    console.log(typeof(birthDay))
    console.log(iconUrl)
    await updateUserPofile(userInfo.id, introduction, birthDay, iconUrl);
    router.back()
  }

  return (
    <>
    {
      isOwnUser &&
      (<>
        <label className="input">アイコン
          <input type="text" value={iconUrl || ""}
            onChange={evt => setIconUrl(evt.target.value)}></input>
        </label>
        <label className="input">自己紹介
          <input type="text" value={introduction || ""}
            onChange={evt => setIntroduction(evt.target.value)}></input>
        </label>
        <label className="input">誕生日
          <input type="date" value={birthDay || ""}
            onChange={evt => setBirthDay(evt.target.value)}></input>
        </label>
        <button onClick={() => updateUserProfile()}>更新</button>
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
