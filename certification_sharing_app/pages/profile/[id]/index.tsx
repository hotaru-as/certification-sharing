import type { NextPage } from 'next'
import TargetItem from '../../../components/TargetItem'
import CertificationItem from '../../../components/CertificationItem'
import RecordItem from '../../../components/RecordItem'
import { TargetType } from '../../../type/Target.type'
import { RecordType } from '../../../type/Record.type'
import { CertificationType } from '../../../type/Certification.type'
import { useEffect, useState } from 'react'
import { getAllUserIds, getOwnUser, getUser } from '../../../lib/accounts'
import { addFollowUser, deleteFollowUser, getFollowedUsers, getFollowUsers, getMyFollowUser, getTargetStatuses, getUserProfile, getUserTargets } from '../../../lib/apis'
import { UserInfoType } from '../../../type/UserInfo.type'
import Link from 'next/link'

type profileType = {
  userInfo: any,
  userProfile: any;
  targets: any;
  targetStatuses: any;
  follows: any;
  followers: any;
}

const ProfilePage: NextPage<profileType> = (props) => {
  const userInfo = props.userInfo;
  const userProfile = props.userProfile;
  const targets = props.targets;
  const targetStatuses = props.targetStatuses;
  const follows = props.follows;
  const followers = props.followers;

  // 実際は引数で渡す
  const records: RecordType[] = []
  const certifications: CertificationType[] = []

  // const filteredTargets = targets?.sort(
  //   (a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt)
  // )

  const [followNum, setFollowNum] = useState(follows.length);
  const [followerNum, setFollowerNum] = useState(followers.length);
  const [isFollow, setIsFollow] = useState(false);
  const [isOwnUser, setIsOwnUser] = useState(false);

  useEffect(() => {
    verifyIsOwnUser();
  }, [])

  useEffect(() => {
    verifyIsFollow();
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

  const verifyIsFollow = async () => {
    const ownUser: UserInfoType = await getOwnUser();

    if(ownUser != null) {
      const follower = await getMyFollowUser(ownUser.user_id, userInfo.id);
      if(follower.length != 0) {
        setIsFollow(true);
      }
    }
  }

  const addFollowerNum = async() => {
    setFollowerNum(followerNum + 1);
    setIsFollow(true);
    
    const ownUser: UserInfoType = await getOwnUser();
    await addFollowUser(ownUser.user_id, userInfo.id)
  }

  const deleteFollowerNum = async () => {
    setFollowerNum(followerNum - 1);
    setIsFollow(false);

    const ownUser: UserInfoType = await getOwnUser();
    const follower = await getMyFollowUser(ownUser.user_id, userInfo.id);
    await deleteFollowUser(follower[0].id);
  }

  return (
    <>
      <div className="flex flex-row">
        <p className='basis-1/4'>アイコン</p>
        <div className='basis-3/4'>
          <p className='font-bold'>{userInfo.username}</p>
          <p>{userProfile.introduction}</p>
          {userProfile.birth_day &&
          <p>誕生日: {userProfile.birth_day}</p>}
          {isOwnUser 
            && <Link href={`/profile/${userInfo.id}/profile-edit`}>
              <a>プロフィールを編集する</a>
            </Link>}
        </div>
      </div>

      <div className='flex flex-row'>
        <p className='basis-1/4'>フォロー: {followNum}</p>
        <p className='basis-1/4'>フォロワー: {followerNum}</p>
      </div>

      {isOwnUser 
        || (
          isFollow ?
            <button onClick={() => deleteFollowerNum()}>フォローを解除する</button>
            : <button onClick={() => addFollowerNum()}>フォローする</button>)}

      <div className='my-2'>
        <p className='text-blue-600'>目標</p>
        {targets.length > 0 &&
          <TargetItem target={targets[0]} statuses={targetStatuses} />
        }
        {isOwnUser 
          && <Link href={`/profile/${userInfo.id}/targets/add`}>
            <a className="border rounded border-blue-400 text-blue-400">追加</a>
          </Link>}
        <Link href={`/profile/${userInfo.id}/targets`}>
          <a className='border-b border-blue-400 text-blue-400 hover:border-blue-600 hover:text-blue-600'>目標一覧を見る</a>
        </Link>
      </div>

      <div className='my-2'>
        <p className='text-yellow-500'>資格結果</p>
        {certifications.length > 0 && 
          <CertificationItem certification={certifications[0]}/>
        }
        {isOwnUser 
          && <Link href="#">
            <a className="border rounded border-yellow-400 text-yellow-400">追加</a>
          </Link>}
        <Link href="#">
          <a className='border-b border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:text-yellow-500'>資格結果一覧を見る</a>
        </Link>
      </div>

      <div className='my-2'>
        <p className='text-green-600'>勉強記録</p>
        {/* <RecordItem record={staticRecords[0]}/> */}
        {isOwnUser 
          && <Link href="#">
            <a className="border rounded border-green-400 text-green-400">追加</a>
          </Link>}
        <Link href="#">
          <a className='border-b border-green-400 text-green-400 hover:border-green-600 hover:text-green-600'>勉強記録一覧を見る</a>
        </Link>
      </div>
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

  const follows = await getFollowUsers(params.id);
  const followers = await getFollowedUsers(params.id);

  return {
    props: { 
      userInfo,
      userProfile,
      targets,
      targetStatuses,
      follows,
      followers,
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
