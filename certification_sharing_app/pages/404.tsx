import type { NextPage } from 'next'
import Layout from '../components/Layout/Layout'

const Custom404Page: NextPage = () => {
  return (
    <Layout title="404 Error">
        <div>ページが見つかりません。</div>
    </Layout>
  )
}
  
export default Custom404Page
  