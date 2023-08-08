import type { NextPage } from 'next'
import TargetItem from '../../../components/TargetItem'
import CertificationItem from '../../../components/CertificationItem'
import StudyItem from '../../../components/StudyItem'
import { TargetType } from '../../../type/Target.type'
import { CertificationType } from '../../../type/Certification.type'
import { useEffect, useState } from 'react'
import { getAllUserIds, getAuthUser, getUser } from '../../../lib/accounts'
import { UserType } from '../../../type/User.type'
import Link from 'next/link'
import { addFollowUser, deleteFollowUser, getFollowedUsers, getFollowUsers, getOwnFollowUsers } from '../../../lib/follower'
import { Follower } from '../../../type/Follower.type'
import { getTargetStatuses, getUserTargets } from '../../../lib/target'
import { getUserProfile } from '../../../lib/userProfile'
import { UserProfile } from '../../../type/UserProfile.type'
import { StudyType } from '../../../type/Study.type'
import { getUserStudies } from '../../../lib/study'
import { getCertificationCategories, getUserCertifications } from '../../../lib/certification'
import { TargetStatus } from '../../../type/TargetStatus.type'
import { CertificationCategory } from '../../../type/CertificationCategory.type'
import Layout from '../../../components/Layout'

type profileType = {
  userInfo: UserType;
  userProfile: UserProfile;
  targets: TargetType[];
  targetStatuses: TargetStatus[];
  studies: StudyType[];
  certifications: CertificationType[];
  certificationCategories: CertificationCategory[];
  follows: Follower[];
  followers: Follower[];
}

const ProfilePage: NextPage<profileType> = (props) => {
  const userInfo = props.userInfo;
  const userProfile = props.userProfile;
  const targets = props.targets;
  const targetStatuses = props.targetStatuses;
  const follows = props.follows;
  const followers: Follower[] = props.followers;

  const studies = props.studies;
  const certifications = props.certifications;
  const certificationCategories = props.certificationCategories;

  // const filteredTargets = targets?.sort(
  //   (a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt)
  // )

  const [followNum, setFollowNum] = useState(follows ? follows.length : 0);
  const [followerNum, setFollowerNum] = useState(followers ? followers.length : 0);
  const [isFollow, setIsFollow] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    verifyIsLogin();
  }, [])

  useEffect(() => {
    verifyIsAuthUser();
  }, [])

  useEffect(() => {
    verifyIsFollow();
  }, [])

  const verifyIsLogin = async () => {
    const authUser: UserType = await getAuthUser();

   if(Object.keys(authUser).length !== 0)
    {
      setIsLogin(true);
      return;
    }

    setIsLogin(false);
  }

  const verifyIsAuthUser = async () => {
    const authUser: UserType = await getAuthUser();

    if(!userInfo) return;

    if(authUser != null && authUser.id == userInfo.id)
    {
      setIsAuthUser(true);
      return;
    }

    setIsAuthUser(false);
  }

  const verifyIsFollow = async () => {
    const authUser: UserType = await getAuthUser();

    if(!userInfo) return;

    if(authUser != null) {
      const follower = await getOwnFollowUsers(authUser.id, userInfo.id);
      if(follower && follower.length != 0) {
        setIsFollow(true);
      }
    }
  }

  const addFollowerNum = async() => {
    setFollowerNum(followerNum + 1);
    setIsFollow(true);
    
    const authUser: UserType = await getAuthUser();
    await addFollowUser(authUser.id, userInfo.id)
  }

  const deleteFollowerNum = async () => {
    setFollowerNum(followerNum - 1);
    setIsFollow(false);

    const authUser: UserType = await getAuthUser();
    const follower = await getOwnFollowUsers(authUser.id, userInfo.id);
    await deleteFollowUser(follower[0].id);
  }

  return (
    <Layout title='Profile'>
      <div className="flex flex-row h-auto mb-4 mx-auto">
        {
          userProfile &&
          <>
            <div className='basis-3/12'>
              {
                (userProfile.iconImg)
                ? <img className='rounded' 
                    src={userProfile.iconImg} />
                : <img className='rounded-full' 
                    src="http://127.0.0.1:8000/media/hotaru.png" />
              }
            </div>
            {/* <div className='basis-9/12 md:basis-2/4 m-2'> */}
            <div className='basis-9/12 md:basis-2/4 m-2 md:m-10'>
              <div className='h-1/3'>
                <h2 className='font-bold text-2xl text-center m-auto'>{userInfo && userInfo.username}</h2>
              </div>
              <p>{userProfile.introduction}</p>
              {userProfile.birthDay &&
              <p>誕生日: {userProfile.birthDay}</p>}
              {isAuthUser 
                && <Link href={`/profile/${userInfo.id}/profile-edit`}>
                  <a className='text-red-300'>プロフィールを編集する</a>
                </Link>}
            </div>
          </>          
        }

      </div>

      <div className='flex flex-row'>
        <p className='basis-20'>フォロー: {followNum}</p>
        <p className='basis-20'>フォロワー: {followerNum}</p>
      </div>

      {isAuthUser 
        && <Link href={`/`}>
          <a>タイムラインを見る</a>
        </Link>} 

      {isLogin 
        && (
          isAuthUser
          || (isFollow ?
            <button onClick={() => deleteFollowerNum()}>フォローを解除する</button>
            : <button onClick={() => addFollowerNum()}>フォローする</button>))}

      {
        (userInfo && userInfo.id !== 0) &&
        <>
          <div className='my-2 mx-auto max-w-sm'>
            <p className='text-blue-600'>目標</p>
            {(targets && targets.length > 0) &&
              <TargetItem target={targets[0]} statuses={targetStatuses} />
            }
            {isAuthUser 
              && <Link href={`/profile/${userInfo.id}/targets/add`}>
                <a className="border rounded border-blue-400 text-blue-400">追加</a>
              </Link>}
            <Link href={`/profile/${userInfo.id}/targets`}>
              <a className='border-b border-blue-400 text-blue-400 hover:border-blue-600 hover:text-blue-600'>目標一覧を見る</a>
            </Link>
          </div>

          <div className='my-2 mx-auto max-w-sm'>
            <p className='text-yellow-500'>資格結果</p>
            {(certifications && certifications.length) > 0 && 
              <CertificationItem certification={certifications[0]} categories={certificationCategories} />
            }
            {isAuthUser 
              && <Link href={`/profile/${userInfo.id}/certifications/add`}>
                <a className="border rounded border-yellow-400 text-yellow-400">追加</a>
              </Link>}
            <Link href={`/profile/${userInfo.id}/certifications`}>
              <a className='border-b border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:text-yellow-500'>資格結果一覧を見る</a>
            </Link>
          </div>

          <div className='my-2 mx-auto max-w-sm'>
            <p className='text-green-600'>勉強記録</p>
            {(studies && studies.length > 0) &&
              <StudyItem study={studies[0]}/>
            }
            {isAuthUser 
              && <Link href={`/profile/${userInfo.id}/studies/add`}>
                <a className="border rounded border-green-400 text-green-400">追加</a>
              </Link>}
            <Link href={`/profile/${userInfo.id}/studies`}>
              <a className='border-b border-green-400 text-green-400 hover:border-green-600 hover:text-green-600'>勉強記録一覧を見る</a>
            </Link>
          </div>
        </>
      }

    </Layout>
  )
}

export default ProfilePage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const userProfile = await getUserProfile(params.id);

  const targets: TargetType[] = await getUserTargets(params.id);
  const targetStatuses: TargetStatus[] = await getTargetStatuses();
  const studies: StudyType[] = await getUserStudies(params.id);
  const certifications: CertificationType[] = await getUserCertifications(params.id);
  const certificationCategories: CertificationCategory[] = await getCertificationCategories();

  const follows = await getFollowUsers(params.id);
  const followers = await getFollowedUsers(params.id);

  return {
    props: { 
      userInfo,
      userProfile,
      targets,
      targetStatuses,
      studies,
      certifications,
      certificationCategories,
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
