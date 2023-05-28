import type { NextPage } from 'next'
import { PostType } from '../type/Post.type'
import TimeLine from '../components/TimeLine'
import LoginPrompt from '../components/LoginPrompt'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home: NextPage<{staticPosts: any}> = ({staticPosts}) => {
  const isLogin = true;
  return (
    <Layout>
      <div>
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
        <div>
          {isLogin
            ? <TimeLine staticPosts={staticPosts}/>
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

  return {
    props: { staticPosts },
    revalidate: 3,
  }
}
