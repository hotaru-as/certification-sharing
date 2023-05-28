import type { NextPage } from 'next'
import TargetItem from '../../../components/TargetItem'
import CertificationItem from '../../../components/CertificationItem'
import RecordItem from '../../../components/RecordItem'
import { TargetType } from '../../../type/Target.type'
import { RecordType } from '../../../type/Record.type'
import { CertificationType } from '../../../type/Certification.type'
import { useState } from 'react'
import { getAllUserIds } from '../../../lib/accounts'

const ProfilePage: NextPage = () => {
  // 実際は引数で渡す
  const staticTargets: TargetType[] = []
  const staticRecords: RecordType[] = []
  const staticCertifications: CertificationType[] = []

  // const filteredTargets = staticTargets?.sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )

  const [followerNum, setFollowerNum] = useState(0);

  const isOwnUser = false;

  const updateFollowerNum = () => {
    setFollowerNum(followerNum + 1);

    //データベースも更新する
  }

  const temp = async () => {
    await getAllUserIds();
  }

  return (
    <>
      <button onClick={() => temp()}>アイコン</button>
      <p>ユーザー名</p>
      <p>メッセージ</p>

      <p>フォロー: 10</p>
      <p>フォロワー: {followerNum}</p>

      {isOwnUser 
        || <button onClick={() => updateFollowerNum()}>フォローする</button>}
      

      <p>目標</p>
      {/* <TargetItem target={staticTargets[0]}/> */}
      <button>目標一覧を見る</button>
      {isOwnUser && <p>目標を追加する</p>}

      <p>資格結果</p>
      {/* <CertificationItem certification={staticCertifications[0]}/> */}
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

export async function getStaticProps() {
  const staticTargets: TargetType[] = [] //ユーザーの目標一覧
  const staticRecords: RecordType[] = [] //ユーザーの勉強記録一覧
  const staticCertifications: CertificationType[] = [] //ユーザーの資格受験結果一覧
  const staticUserProfile = []; //ユーザーのプロフィール情報

  return {
    props: { staticTargets },
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
