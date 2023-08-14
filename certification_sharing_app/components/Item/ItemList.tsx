import Link from "next/link";
import CertificationItem from "./CertificationItem";
import StudyItem from "./StudyItem";
import TargetItem from "./TargetItem";
import { UserType } from "../../type/User.type";
import { TargetType } from "../../type/Target.type";
import { TargetStatus } from "../../type/TargetStatus.type";
import { StudyType } from "../../type/Study.type";
import { CertificationType } from "../../type/Certification.type";
import { CertificationCategory } from "../../type/CertificationCategory.type";

type LayoutProps = {
  userInfo: UserType;
  isAuth: boolean
  targets: TargetType[];
  targetStatuses: TargetStatus[];
  studies: StudyType[];
  certifications: CertificationType[];
  certificationCategories: CertificationCategory[];
}

export default function ItemList(props: LayoutProps) {
  const userInfo = props.userInfo;
  const isAuth = props.isAuth;
  const targets = props.targets;
  const targetStatuses = props.targetStatuses;
  const studies = props.studies;
  const certifications = props.certifications;
  const certificationCategories = props.certificationCategories;

  return (
    <>
      {
        (userInfo && userInfo.id !== 0) &&
        <>
          <div className='my-2 mx-auto max-w-sm'>
            <p className='text-blue-600'>目標</p>
            {(targets && targets.length > 0) &&
              <TargetItem target={targets[0]} statuses={targetStatuses} />
            }
            {isAuth
              && <Link href={`/profile/${userInfo.id}/targets/add`}>
                <a className="border rounded border-blue-400 text-blue-400">追加</a>
              </Link>}
            <Link href={`/profile/${userInfo.id}/targets`}>
              <a className='border-b border-blue-400 text-blue-400 hover:border-blue-600 hover:text-blue-600'>目標一覧を見る</a>
            </Link>
          </div>

          <div className='my-2 mx-auto max-w-sm'>
            <p className='text-yellow-500'>資格結果</p>
            {(certifications && certifications.length) > 0 && 
              <CertificationItem certification={certifications[0]} categories={certificationCategories} />
            }
            {isAuth 
              && <Link href={`/profile/${userInfo.id}/certifications/add`}>
                <a className="border rounded border-yellow-400 text-yellow-400">追加</a>
              </Link>}
            <Link href={`/profile/${userInfo.id}/certifications`}>
              <a className='border-b border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:text-yellow-500'>資格結果一覧を見る</a>
            </Link>
          </div>

          <div className='my-2 mx-auto max-w-sm'>
            <p className='text-green-600'>勉強記録</p>
            {(studies && studies.length > 0) &&
              <StudyItem study={studies[0]}/>
            }
            {isAuth
              && <Link href={`/profile/${userInfo.id}/studies/add`}>
                <a className="border rounded border-green-400 text-green-400">追加</a>
              </Link>}
            <Link href={`/profile/${userInfo.id}/studies`}>
              <a className='border-b border-green-400 text-green-400 hover:border-green-600 hover:text-green-600'>勉強記録一覧を見る</a>
            </Link>
          </div>
        </>
      }
    </>
  )
}
