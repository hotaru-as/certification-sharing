import type { NextPage } from 'next'

import Layout from '../../../../components/Layout/Layout';
import ItemListLayout from '../../../../components/Layout/ItemListLayout';
import TargetItem from '../../../../components/Item/TargetItem';

import { getAllUserIds, getUser } from '../../../../lib/accounts';
import { getTargetStatuses, getUserTargets } from '../../../../lib/target';
import { TargetType } from '../../../../type/Target.type';
import { TargetStatus } from '../../../../type/TargetStatus.type';
import { UserType } from '../../../../type/User.type';

type targetsType = {
  userInfo: UserType,
  targets: TargetType[];
  targetStatuses: TargetStatus[];
}

const TargetPage: NextPage<targetsType> = ({userInfo, targets, targetStatuses}) => {
  return (
    <Layout title='Targets'>
      <ItemListLayout color='blue' userInfo={userInfo} title='さんの目標一覧'>
        {targets && targets.map((target: TargetType) => 
          <TargetItem key={target.id} target={target} statuses={targetStatuses} />
        )}
      </ItemListLayout>
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
