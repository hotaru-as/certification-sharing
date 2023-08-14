import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

import FollowerView from '../../../components/Profile/FollowerView'
import ItemList from '../../../components/Item/ItemList'
import Layout from '../../../components/Layout/Layout'
import Profile from '../../../components/Profile/Profile'

import { CertificationType } from '../../../type/Certification.type'
import { CertificationCategory } from '../../../type/CertificationCategory.type'
import { Follower } from '../../../type/Follower.type'
import { StudyType } from '../../../type/Study.type'
import { TargetStatus } from '../../../type/TargetStatus.type'
import { TargetType } from '../../../type/Target.type'
import { UserProfile } from '../../../type/UserProfile.type'
import { UserType } from '../../../type/User.type'

import { getAllUserIds, getAuthUser, getUser, verifyIsOwnUser } from '../../../lib/accounts'
import { getCertificationCategories, getUserCertifications } from '../../../lib/certification'
import { getFollowedUsers, getFollowUsers } from '../../../lib/follower'
import { getUserStudies } from '../../../lib/study'
import { getTargetStatuses, getUserTargets } from '../../../lib/target'
import { getUserProfile } from '../../../lib/userProfile'

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

  const [isAuthUser, setIsAuthUser] = useState(false);
  const [authUser, setAuthUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    verifyIsAuthUser();
  }, [])

  const verifyIsAuthUser = async () => {
    const isOwnUser =await verifyIsOwnUser(userInfo);
    setIsAuthUser(isOwnUser);

    if(isOwnUser)
    {
      const authUser: UserType = await getAuthUser();
      setAuthUser(authUser)
    }
  }

  return (
    <Layout title='Profile'>
      <Profile userInfo={userInfo} userProfile={userProfile} isAuth={isAuthUser} />

      <FollowerView userInfo={userInfo} follows={follows} followers={followers}
        isAuth={isAuthUser} authUser={authUser}/>

      {isAuthUser 
        && <Link href={`/`}>
          <a>タイムラインを見る</a>
        </Link>}

      <ItemList userInfo={userInfo} isAuth={isAuthUser} 
        targets={targets} targetStatuses={targetStatuses} studies={studies} 
        certifications={certifications} certificationCategories={certificationCategories}/>
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
    notFound: !userInfo || userInfo.id == 0,
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
