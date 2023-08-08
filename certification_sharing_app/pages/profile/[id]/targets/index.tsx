import type { NextPage } from 'next'
import { TargetType } from '../../../../type/Target.type';
import TargetItem from '../../../../components/TargetItem';
import { getAllUserIds, getUser } from '../../../../lib/accounts';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getTargetStatuses, getUserTargets } from '../../../../lib/target';
import { TargetStatus } from '../../../../type/TargetStatus.type';
import { UserType } from '../../../../type/User.type';
import Layout from '../../../../components/Layout';

type targetsType = {
  userInfo: UserType,
  targets: TargetType[];
  targetStatuses: TargetStatus[];
}

const TargetPage: NextPage<targetsType> = ({userInfo, targets, targetStatuses}) => {
  const router = useRouter();

  return (
    <Layout title='Targets'>
      <div className='my-2 max-w-sm'>
        <p className='text-blue-600'>{userInfo && userInfo.username}さんの目標一覧</p>

        {targets && targets.map((target: TargetType) => 
          <TargetItem key={target.id} target={target} statuses={targetStatuses} />
        )}

        <Link href="#">
          <a className="text-blue-400" onClick={() => router.back()}>ユーザーページに戻る</a>
        </Link>
      </div>
    </Layout>
  )
}

export default TargetPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);

  const targets: TargetType[] = await getUserTargets(params.id);
  const targetStatuses = await getTargetStatuses();

  return {
    props: { 
      userInfo,
      targets,
      targetStatuses,
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
