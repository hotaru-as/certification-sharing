import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import TimeLine from '../components/TimeLine'
import Layout from '../components/Layout/Layout'

import { getAllUser, getAuthUser } from '../lib/accounts'
import { convertCertificationsToPosts } from '../lib/certification'
import { convertStudiesToPosts } from '../lib/study'
import { convertTargetsToPosts } from '../lib/target'
import { getUserProfile } from '../lib/userProfile'

import { PostType } from '../type/Post.type'
import { UserType } from '../type/User.type'

type homeType = {
  posts: PostType[];
}

const Home: NextPage<homeType> = ({ posts }) => {
  const [userInfo, setUserInfo] = useState({id: 0, username: ""})

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
          <TimeLine userInfo={userInfo} staticPosts={posts}/>
        </div>
      </div>
    </Layout>
  )
}

export default Home

const getUserPosts = async (users: UserType[]) =>
{
  var posts: PostType[] = [];

  await Promise.all(users.map(async (user: UserType) => {
    const userProfile = await getUserProfile(user.id.toString())

    const targets = await convertTargetsToPosts(user, userProfile)
    posts = [...posts, ...targets]
  
    const certifications = await convertCertificationsToPosts(user, userProfile)
    posts = [...posts, ...certifications]

    const studies = await convertStudiesToPosts(user, userProfile)
    posts = [...posts, ...studies]
  }))

  posts.sort(function(a, b){
    return (a.createdAt < b.createdAt ? 1 : -1);
  })

  var count = 0;
  posts.map((post: PostType) => {
    post.id = count;
    count += 1;
  })

  return posts;
}

export async function getStaticProps() {
  const users = await getAllUser();
  var posts = await getUserPosts(users);

  return {
    props: {
      posts 
    },
    revalidate: 3,
  }
}
