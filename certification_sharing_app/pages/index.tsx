import type { NextPage } from 'next'
import TimeLine from '../components/TimeLine'
import LoginPrompt from '../components/LoginPrompt'
import Layout from '../components/Layout'
import { getOwnUser } from '../lib/accounts'
import { useEffect, useState } from 'react'
import { UserType } from '../type/User.type'

const Home: NextPage<{staticPosts: any}> = ({staticPosts}) => {
  const [userInfo, setUserInfo] = useState({user_id: 0, user_name: ""})

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    const user: UserType = await getOwnUser();
    console.log(user);
    setUserInfo(user);
  }

  const isLogin = true;
  return (
    <Layout>
      <div>
        <div>
          {isLogin
            // ? <TimeLine staticPosts={staticPosts}/>
            ? <TimeLine userInfo={userInfo} staticPosts={{}}/>
            : <LoginPrompt />
          }
        </div>
      </div>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const staticPosts = {}; //タイムラインの情報を取ってくる
  // const userInfo = getOwnUser();
  // console.log(userInfo);

  return {
    props: { staticPosts },
    revalidate: 3,
  }
}
