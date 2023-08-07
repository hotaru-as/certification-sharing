import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import StudyItem from '../../../../components/StudyItem';
import { getAllUserIds, getUser } from '../../../../lib/accounts';
import { getUserStudies } from '../../../../lib/study';
import { StudyType } from '../../../../type/Study.type';
import { UserType } from '../../../../type/User.type';

type studiesType = {
  userInfo: UserType;
  studies: StudyType[];
}

const StudyPage: NextPage<studiesType> = ({userInfo, studies}) => {
  const router = useRouter();

  return (
    <>
      <p>{userInfo.username}さんの勉強記録一覧</p>

      {studies.map((study: StudyType) => 
        <StudyItem key={study.id} study={study} />
      )}

      <Link href="#">
        <a onClick={() => router.back()}>ユーザーページに戻る</a>
      </Link>
    </>
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
