import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Home
