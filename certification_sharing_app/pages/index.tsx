import type { NextPage } from 'next'
import TimeLine from '../components/TimeLine'
import LoginPrompt from '../components/LoginPrompt'
import Layout from '../components/Layout'
import { getAuthUser } from '../lib/accounts'
import { useEffect, useState } from 'react'
import { UserType } from '../type/User.type'

const Home: NextPage<{staticPosts: any}> = ({staticPosts}) => {
  const [userInfo, setUserInfo] = useState({id: 0, username: ""})

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    const user: UserType = await getAuthUser();
    console.log(user); //emailが入っている
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
  // const userInfo = getAuthUser();
  // console.log(userInfo);

  return {
    props: { staticPosts },
    revalidate: 3,
  }
}
