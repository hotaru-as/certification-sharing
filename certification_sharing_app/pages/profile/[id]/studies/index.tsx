import type { NextPage } from 'next'
import RecordItem from '../../../../components/RecordItem'
import { RecordType } from '../../../../type/Record.type'

const RecoredPage: NextPage = () => {
  const records: RecordType[] = [{content: "", time: ""}];

  return (
    <>
      <p>ユーザー名さんの勉強記録一覧</p>

      {records.map((record: RecordType) => 
        <RecordItem record={record} />
      )}

      <p>ユーザーページに戻る</p>
    </>
  )
}

export default RecoredPage;
