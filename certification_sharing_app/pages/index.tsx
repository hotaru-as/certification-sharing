import type { NextPage } from 'next'
import TimeLine from '../components/TimeLine'
import LoginPrompt from '../components/LoginPrompt'
import Layout from '../components/Layout/Layout'
import { getAllUser, getAuthUser, getUser } from '../lib/accounts'
import { useEffect, useState } from 'react'
import { UserType } from '../type/User.type'
import { getFollowUsers } from '../lib/follower'
import { Follower } from '../type/Follower.type'
import { TargetType } from '../type/Target.type'
import { getTargetStatuses, getUserTargets } from '../lib/target'
import Post from '../components/Post'
import { PostType } from '../type/Post.type'
import { getUserProfile } from '../lib/userProfile'
import { CertificationType } from '../type/Certification.type'
import { getCertificationCategories, getUserCertifications } from '../lib/certification'
import CertificationItem from '../components/CertificationItem'
import { StudyType } from '../type/Study.type'
import { getUserStudies } from '../lib/study'
import { TargetStatus } from '../type/TargetStatus.type'
import { CertificationCategory } from '../type/CertificationCategory.type'
import { UserProfile } from '../type/UserProfile.type'

type homeType = {
  staticPosts: PostType[];
}

const Home: NextPage<homeType> = ({ staticPosts }) => {
  const [userInfo, setUserInfo] = useState({id: 0, username: ""})
  // const [isLogin, setIsLogin] = useState(false);
  // const [allPosts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    getUserInfo()
  }, [])
  
  const getUserInfo = async () => {
    const authUser: UserType = await getAuthUser();
    setUserInfo(authUser);
  }

  return (
    <Layout title='TimeLine'>
      <div>
        <div>
          <TimeLine userInfo={userInfo} staticPosts={staticPosts}/>
          {/* {isLogin
            // ? <TimeLine staticPosts={staticPosts}/>
            ? <TimeLine userInfo={userInfo} staticPosts={allPosts}/>
            : <LoginPrompt />
          } */}
        </div>
      </div>
    </Layout>
  )
}

export default Home

const getTargets = async (user: UserType, userProfile: UserProfile, targetStatuses: TargetStatus[], count: number): Promise<PostType[]> => {
  const staticPosts: PostType[] = [];

  const targets: TargetType[] = await getUserTargets(user.id);
  targets.map((target: TargetType) => {
    const targetStatus = targetStatuses.find((status: TargetStatus) => status.id.toString() == target.status)
    if(targetStatus == null) return;
    const targetStatusName = targetStatus.name

    const post: PostType = {
      id: staticPosts.length + count,
      user_id: user.id,
      user_name: user.username,
      user_img: userProfile.iconImg ? userProfile.iconImg : "http://127.0.0.1:8000/media/hotaru.png",
      post_type: "target",
      result: `${user.username}さんが目標"${target.target}"を更新しました！`,
      status: `ステータス: ${targetStatusName}`,
      comment: target.comment,
      createdAt: target.createdAt
    }
    staticPosts.push(post)  
  });

  return staticPosts;
}

const getCertifications = async (user: UserType, userProfile: UserProfile, certificationCategories: CertificationCategory[], count: number): Promise<PostType[]> => {
  const staticPosts: PostType[] = [];

  const certifications: CertificationType[] = await getUserCertifications(user.id);
  certifications.map((certification: CertificationType) => {
    const certificationCategory = certificationCategories.find((category: CertificationCategory) => category.id == certification.certification)
    if (certificationCategory == null) return;
    const certificationName = certificationCategory.name

    const post: PostType = {
      id: staticPosts.length + count,
      user_id: user.id,
      user_name: user.username,
      user_img: userProfile.iconImg ? userProfile.iconImg : "http://127.0.0.1:8000/media/hotaru.png",
      post_type: "certification",
      result: `${user.username}さんが${certificationName}の結果を報告しました！`,
      status: `結果: ${certification.result}`,
      comment: certification.comment,
      createdAt: certification.createdAt
    }
    staticPosts.push(post)
  })

  return staticPosts;
}

const getStudies = async (user: UserType, userProfile: UserProfile, count: number): Promise<PostType[]> => {
  const staticPosts: PostType[] = [];

  const studies: StudyType[] = await getUserStudies(user.id);
  studies.map((study: StudyType) => {
    const post: PostType = {
      id: staticPosts.length + count,
      user_id: user.id,
      user_name: user.username,
      user_img: userProfile.iconImg ? userProfile.iconImg : "http://127.0.0.1:8000/media/hotaru.png",
      post_type: "study",
      result: `${user.username}さんが"${study.content}"を勉強しました！`,
      status: `勉強時間: ${study.studyTime}`,
      comment: study.comment,
      createdAt: study.createdAt
    }
    staticPosts.push(post)
  })

  return staticPosts
}

export async function getStaticProps() {
  const targetStatuses = await getTargetStatuses();
  const certificationCategories = await getCertificationCategories();

  var staticPosts: PostType[] = [];

  const users = await getAllUser();
  await Promise.all(users.map(async (user: UserType) => {
    const userProfile = await getUserProfile(user.id.toString())

    const targets = await getTargets(user, userProfile, targetStatuses, staticPosts.length)
    staticPosts = [...staticPosts, ...targets]
  
    const certifications = await getCertifications(user, userProfile, certificationCategories, staticPosts.length)
    staticPosts = [...staticPosts, ...certifications]

    const studies = await getStudies(user, userProfile, staticPosts.length)
    staticPosts = [...staticPosts, ...studies]
  }))

  staticPosts.sort(function(a, b){
    return (a.createdAt < b.createdAt ? 1 : -1);
  })

  var count = 0;
  staticPosts.map((post: PostType) => {
    post.id = count;
    count += 1;
  })

  return {
    props: {
      staticPosts 
    },
    revalidate: 3,
  }
}
