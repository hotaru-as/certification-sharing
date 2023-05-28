import type { NextPage } from 'next'
import TimeLine from '../components/TimeLine'
import LoginPrompt from '../components/LoginPrompt'
import Layout from '../components/Layout'
import { getUser } from '../lib/accounts'
import { useEffect, useState } from 'react'
import { UserInfoType } from '../type/UserInfo.type'

const Home: NextPage<{staticPosts: any}> = ({staticPosts}) => {
  const [userInfo, setUserInfo] = useState({user_id: 0, user_name: ""})

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    const user: UserInfoType = await getUser();
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
  // const userInfo = getUser();
  // console.log(userInfo);

  return {
    props: { staticPosts },
    revalidate: 3,
  }
}
