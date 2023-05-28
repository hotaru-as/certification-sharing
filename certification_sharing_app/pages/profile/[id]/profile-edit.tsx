import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getAllUserIds, getOwnUser, getUser } from '../../../lib/accounts'
import { getUserProfile } from '../../../lib/apis'
import { UserInfoType } from '../../../type/UserInfo.type'
import Link from 'next/link'

type profileType = {
  userInfo: any,
  userProfile: any;
}

const ProfilEditPage: NextPage<profileType> = ({userInfo, userProfile}) => {
  const [isOwnUser, setIsOwnUser] = useState(false);

  useEffect(() => {
    verifyIsOwnUser();
  }, [])

  const verifyIsOwnUser = async () => {
    const ownUser: UserInfoType = await getOwnUser();

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

  return (
    <>
    {
      isOwnUser &&
      (<>
        <p>アイコン</p>
        <p>メッセージ</p>
        <p>誕生日</p>
        <button>更新</button>
        <button>キャンセル</button>
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
