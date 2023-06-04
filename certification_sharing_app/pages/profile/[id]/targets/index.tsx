import type { NextPage } from 'next'
import { TargetType } from '../../../../type/Target.type';
import TargetItem from '../../../../components/TargetItem';
import { getAllUserIds, getUser } from '../../../../lib/accounts';
import { getTargetStatuses, getUserProfile, getUserTargets } from '../../../../lib/apis';
import { useRouter } from 'next/router';
import Link from 'next/link';

type targetsType = {
  userInfo: any,
  userProfile: any;
  targets: any;
  targetStatuses: any;
}

const TargetPage: NextPage<targetsType> = ({userInfo, userProfile, targets, targetStatuses}) => {
  const router = useRouter();

  return (
    <>
      <p>{userInfo.username}さんの目標一覧</p>

      {targets.map((target: TargetType) => 
        <TargetItem key={target.id} target={target} statuses={targetStatuses} />
      )}

      <Link href="#">
        <a onClick={() => router.back()}>ユーザーページに戻る</a>
      </Link>
    </>
  )
}

export default TargetPage;

export async function getStaticProps({ params }: any) {
  const userInfo = await getUser(params.id);
  const userProfile = await getUserProfile(params.id);

  const targets: TargetType[] = await getUserTargets(params.id);
  const targetStatuses = await getTargetStatuses();

  return {
    props: { 
      userInfo,
      userProfile,
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
