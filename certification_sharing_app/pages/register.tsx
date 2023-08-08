import type { NextPage } from 'next'
import Register from '../components/Register'
import Layout from '../components/Layout'

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Register />
    </Layout>
  )
}
  
export default RegisterPage
  