import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getAllUserIds, getAuthUser, getUser } from '../../../lib/accounts'
import { UserType } from '../../../type/User.type'
import { useRouter } from 'next/router'
import { getUserProfile, updateUserProfile } from '../../../lib/userProfile'
import { UserProfile } from '../../../type/UserProfile.type'
import Layout from '../../../components/Layout/Layout'
import InputLayout from '../../../components/Layout/EditItem/InputLayout'
import TextAreaLayout from '../../../components/Layout/EditItem/TextAreaLayout'
import UpdateCancelButtonLayout from '../../../components/Layout/EditItem/UpdateCancelButtonLayout'

type profileType = {
  userInfo: any,
  userProfile: UserProfile;
}

const ProfilEditPage: NextPage<profileType> = ({userInfo, userProfile}) => {
  const router = useRouter();

  const [isOwnUser, setIsOwnUser] = useState(false);
  const [introduction, setIntroduction] = useState(userProfile ? userProfile.introduction : "");
  const [birthDay, setBirthDay] = useState(userProfile ? userProfile.birthDay : "")
  const [iconImg, setIconImg] = useState(userProfile ? userProfile.iconImg : "")

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
      <Layout title="ProfileEdit">
        {isOwnUser && (
          <div className="m-4">
            <h2 className="font-semibold text-pink-600 ml-1 mt-1">プロフィールを編集する</h2>

            <InputLayout name="アイコン" type="file" value={undefined}
              onChangeMethod={evt => updateIcon(evt)} />

            <TextAreaLayout name="自己紹介" value={introduction}
              onChangeMethod={evt => setIntroduction(evt.target.value)}/>
              
            <InputLayout name="誕生日" type="date" value={birthDay}
              onChangeMethod={evt => setBirthDay(evt.target.value)} />

            <UpdateCancelButtonLayout name="更新" color="pink"
              updateOnClickMethod={() => updateProfile()}/>
          </div>
        )}
      </Layout>
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
