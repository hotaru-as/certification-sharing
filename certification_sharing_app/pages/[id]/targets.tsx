import type { NextPage } from 'next'
import { TargetType } from '../../type/Target.type';
import TargetItem from '../../components/TargetItem';

const TargetPage: NextPage = () => {
  const targets: TargetType[] = [{content: "", date: "", status: ""}];

  return (
    <>
      <p>ユーザー名さんの目標一覧</p>

      {targets.map((target: TargetType) => 
        <TargetItem target={target} />
      )}

      <p>ユーザーページに戻る</p>
    </>
  )
}

export default TargetPage;
