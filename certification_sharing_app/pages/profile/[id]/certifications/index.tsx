import type { NextPage } from 'next'
import CertificationItem from '../../../../components/CertificationItem'
import type { CertificationType } from '../../../../type/Certification.type'
import { UserType } from '../../../../type/User.type'
import { getAllUserIds, getUser } from '../../../../lib/accounts'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCertificationCategories, getUserCertifications } from '../../../../lib/certification'
import { CertificationCategory } from '../../../../type/CertificationCategory.type'
import Layout from '../../../../components/Layout/Layout'
import ItemListLayout from '../../../../components/Layout/ItemListLayout'

type certificationsType = {
  userInfo: UserType;
  certifications: CertificationType[];
  certificationCategories: CertificationCategory[]
}

const CertificationsPage: NextPage<certificationsType> = ({userInfo, certifications, certificationCategories}) => {
  return (
    <Layout title='Certifications'>
      <ItemListLayout color='yellow' userInfo={userInfo} title='さんの資格受験結果一覧'>
        {certifications && certifications.map((certification: CertificationType) => 
          <CertificationItem key={certification.id} certification={certification} categories={certificationCategories} />
        )}
      </ItemListLayout>
    </Layout>
  )
}

export default CertificationsPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const certifications: CertificationType[] = await getUserCertifications(params.id);
  const certificationCategories: CertificationCategory[] = await getCertificationCategories();

  return {
    props: { 
      userInfo,
      certifications,
      certificationCategories,
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
