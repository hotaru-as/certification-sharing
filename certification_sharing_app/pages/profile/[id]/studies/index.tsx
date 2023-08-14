import type { NextPage } from 'next'

import ItemListLayout from '../../../../components/Layout/ItemListLayout';
import Layout from '../../../../components/Layout/Layout';
import StudyItem from '../../../../components/Item/StudyItem';

import { getAllUserIds, getUser } from '../../../../lib/accounts';
import { getUserStudies } from '../../../../lib/study';
import { StudyType } from '../../../../type/Study.type';
import { UserType } from '../../../../type/User.type';

type studiesType = {
  userInfo: UserType;
  studies: StudyType[];
}

const StudyPage: NextPage<studiesType> = ({userInfo, studies}) => {
  return (
    <Layout title='Studies'>
      <ItemListLayout color='green' userInfo={userInfo} title='さんの勉強記録一覧'>
        {studies && studies.map((study: StudyType) => 
          <StudyItem key={study.id} study={study} />
        )}
      </ItemListLayout>
    </Layout>
  )
}

export default StudyPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const studies: StudyType[] = await getUserStudies(params.id);

  return {
    props: {
      userInfo, 
      studies,
    },
    revalidate: 3,
    notFound: !userInfo || userInfo.id == 0,
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
