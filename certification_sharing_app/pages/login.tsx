import type { NextPage } from 'next'
import Layout from '../components/Layout/Layout'
import Login from '../components/Login'

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Login />
    </Layout>
  )
}
  
export default LoginPage
  