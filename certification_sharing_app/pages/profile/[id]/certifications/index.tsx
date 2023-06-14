import type { NextPage } from 'next'
import CertificationItem from '../../../../components/CertificationItem'
import type { CertificationType } from '../../../../type/Certification.type'
import { UserProfile } from '../../../../type/UserProfile.type'
import { UserType } from '../../../../type/User.type'
import { getAllUserIds, getUser } from '../../../../lib/accounts'

type certificationsType = {
  userInfo: UserType;
  certifications: CertificationType[];
}

const CertificationsPage: NextPage<certificationsType> = ({userInfo, certifications}) => {

  return (
    <>
      <p>{userInfo.username}さんの資格受験結果一覧</p>

      {certifications.map((certification: CertificationType) => 
        <CertificationItem certification={certification} />
      )}

      <p>ユーザーページに戻る</p>
    </>
  )
}

export default CertificationsPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);

  const certifications: CertificationType[] = [];

  return {
    props: { 
      userInfo,
      certifications,
    },
    revalidate: 3,
  }
}

export async function getStaticPaths()
{
  const paths = await getAllUserIds();

  return {
    paths,
    fallback: true,
  }
}