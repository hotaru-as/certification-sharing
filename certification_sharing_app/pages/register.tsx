import type { NextPage } from 'next'
import Register from '../components/Register'
import Layout from '../components/Layout/Layout'

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  )
}
  
export default RegisterPage
  