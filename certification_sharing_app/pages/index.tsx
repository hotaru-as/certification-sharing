import type { NextPage } from 'next'
import { PostType } from '../type/Post.type'
import TimeLine from '../components/TimeLine'
import LoginPrompt from '../components/LoginPrompt'

const Home: NextPage<{staticPosts: any}> = ({staticPosts}) => {
  const isLogin = true;
  return (
    <div>
      {isLogin
        ? <TimeLine staticPosts={staticPosts}/>
        : <LoginPrompt />
      }
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const staticPosts = {}; //タイムラインの情報を取ってくる

  return {
    props: { staticPosts },
    revalidate: 3,
  }
}
