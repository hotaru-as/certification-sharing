import Link from "next/link";
import { UserType } from "../../type/User.type";
import { UserProfile } from "../../type/UserProfile.type";

type LayoutProps = {
  userInfo: UserType;
  userProfile: UserProfile;
  isAuth: boolean
}

export default function Profile({ userInfo, userProfile, isAuth }: LayoutProps) {
  if(!userProfile)
  {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-row h-auto mb-4 mx-auto">
        <div className='basis-3/12'>
          {
            (userProfile.iconImg)
            ? <img className='rounded' 
                src={userProfile.iconImg} />
            : <img className='rounded-full' 
                src="https://api-dyie.onrender.com/media/default.png" />
          }
        </div>

        <div className='basis-9/12 md:basis-2/4 m-2 md:m-10'>
          <div className='h-1/3'>
            <h2 className='font-bold text-2xl text-left m-auto'>{userInfo && userInfo.username}</h2>
          </div>

          <p className='mt-2'>{userProfile.introduction && userProfile.introduction}</p>
          {userProfile.birthDay && <p className='mt-2'>誕生日: {userProfile.birthDay}</p>}

          {isAuth
            && <div className='mt-2'>
              <Link href={`/profile/${userInfo.id}/profile-edit`}>
                <a className='text-red-300'>プロフィールを編集する</a>
              </Link>
            </div>}
        </div>
      </div>
    </>
  )
}
