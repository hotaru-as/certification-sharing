import type { NextPage } from 'next'
import CertificationItem from '../../../components/CertificationItem'
import type { CertificationType } from '../../../type/Certification.type'

const CertificationsPage: NextPage = () => {
  const certifications: CertificationType[] = [{name: "", date: "", result: true}];

  return (
    <>
      <p>ユーザー名さんの資格受験結果一覧</p>

      {certifications.map((certification: CertificationType) => 
        <CertificationItem certification={certification} />
      )}

      <p>ユーザーページに戻る</p>
    </>
  )
}

export default CertificationsPage;
