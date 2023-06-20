import type { NextPage } from 'next'
import CertificationItem from '../../../../components/CertificationItem'
import type { CertificationType } from '../../../../type/Certification.type'
import { UserType } from '../../../../type/User.type'
import { getAllUserIds, getUser } from '../../../../lib/accounts'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getUserCertifications } from '../../../../lib/certification'

type certificationsType = {
  userInfo: UserType;
  certifications: CertificationType[];
}

const CertificationsPage: NextPage<certificationsType> = ({userInfo, certifications}) => {
  const router = useRouter();

  return (
    <>
      <p>{userInfo.username}さんの資格受験結果一覧</p>

      {certifications.map((certification: CertificationType) => 
        <CertificationItem certification={certification} />
      )}

      <Link href="#">
        <a onClick={() => router.back()}>ユーザーページに戻る</a>
      </Link>
    </>
  )
}

export default CertificationsPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const certifications: CertificationType[] = await getUserCertifications(params.id);

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
