import type { NextPage } from 'next'
import TargetItem from '../../../components/TargetItem'
import CertificationItem from '../../../components/CertificationItem'
import RecordItem from '../../../components/RecordItem'
import { TargetType } from '../../../type/Target.type'
import { RecordType } from '../../../type/Record.type'
import { CertificationType } from '../../../type/Certification.type'
import { useEffect, useState } from 'react'
import { getAllUserIds, getOwnUser, getUser } from '../../../lib/accounts'
import { getTargetStatuses, getUserProfile, getUserTargets } from '../../../lib/apis'
import { UserInfoType } from '../../../type/UserInfo.type'
import Link from 'next/link'

type profileType = {
  userInfo: any,
  userProfile: any;
  targets: any;
  targetStatuses: any;
}

const ProfilePage: NextPage<profileType> = ({userInfo, userProfile, targets, targetStatuses}) => {
  // 実際は引数で渡す
  const records: RecordType[] = []
  const certifications: CertificationType[] = []

  // const filteredTargets = targets?.sort(
  //   (a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt)
  // )

  const [followerNum, setFollowerNum] = useState(0);
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

  const updateFollowerNum = () => {
    setFollowerNum(followerNum + 1);

    //データベースも更新する
  }

  return (
    <>
      <p>アイコン</p>
      <p>{userInfo.username}</p>
      <p>メッセージ: {userProfile.introduction}</p>
      {userProfile.birth_day &&
      <p>誕生日: {userProfile.birth_day}</p>}

      <p>フォロー: 10</p>
      <p>フォロワー: {followerNum}</p>

      {isOwnUser 
        && <Link href={`/profile/${userInfo.id}/profile-edit`}>
          <a>プロフィールを編集する</a>
        </Link>}

      {isOwnUser 
        || <button onClick={() => updateFollowerNum()}>フォローする</button>}

      <p>目標</p>
      <TargetItem target={targets[0]} statuses={targetStatuses} />
      <Link href={`/profile/${userInfo.id}/targets`}>
        <a>目標一覧を見る</a>
      </Link>
      {isOwnUser 
        && <Link href={`/profile/${userInfo.id}/targets/add`}>
          <a>目標を追加する</a>
        </Link>}

      <p>資格結果</p>
      {certifications.length > 0 && 
        <CertificationItem certification={certifications[0]}/>
      }
      <button>資格結果一覧を見る</button>
      {isOwnUser && <p>資格結果を追加する</p>}

      <p>勉強記録</p>
      {/* <RecordItem record={staticRecords[0]}/> */}
      <button>勉強記録一覧を見る</button>
      {isOwnUser && <p>勉強記録を追加する</p>}
    </>
  )
}

export default ProfilePage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const userProfile = await getUserProfile(params.id);

  const targets: TargetType[] = await getUserTargets(params.id);
  const targetStatuses = await getTargetStatuses();
  const staticRecords: RecordType[] = [] //ユーザーの勉強記録一覧
  const staticCertifications: CertificationType[] = [] //ユーザーの資格受験結果一覧

  return {
    props: { 
      userInfo,
      userProfile,
      targets,
      targetStatuses,
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
