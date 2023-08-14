import { useEffect, useState } from "react";
import { Follower } from "../../type/Follower.type";
import { UserType } from "../../type/User.type";
import { getAuthUser } from "../../lib/accounts";
import { addFollowUser, deleteFollowUser, getOwnFollowUsers } from "../../lib/follower";

type LayoutProps = {
  userInfo: UserType;
  follows: Follower[];
  followers: Follower[];
  isAuth: boolean
  authUser: UserType | undefined
}

export default function FollowerView({ userInfo, follows, followers, isAuth, authUser }: LayoutProps) {
  const [isFollow, setIsFollow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [followerNum, setFollowerNum] = useState(followers ? followers.length : 0);
  const followNum = follows ? follows.length : 0;

  useEffect(() => {
    verifyIsLogin();
  }, [])

  useEffect(() => {
    verifyIsFollow();
  }, [])

  const verifyIsLogin = async () => {
    const authUser: UserType = await getAuthUser();

   if(Object.keys(authUser).length !== 0)
    {
      setIsLogin(true);
      return;
    }

    setIsLogin(false);
  }
  
  const verifyIsFollow = async () => {
    if(!userInfo || !isAuth || !isLogin) return;

    if(authUser) {
      const follower = await getOwnFollowUsers(authUser.id, userInfo.id);
      if(follower && follower.length != 0) {
        setIsFollow(true);
      }
    }
  }

  const addFollowerNum = async() => {
    if(!authUser) return;

    setFollowerNum(followerNum + 1);
    setIsFollow(true);
    
    await addFollowUser(authUser.id, userInfo.id)
  }

  const deleteFollowerNum = async () => {
    if(!authUser) return;

    setFollowerNum(followerNum - 1);
    setIsFollow(false);

    const follower = await getOwnFollowUsers(authUser.id, userInfo.id);
    await deleteFollowUser(follower[0].id);
  }

  return (
    <>
      <div className='flex flex-row'>
        <p className='basis-20'>フォロー: {followNum}</p>
        <p className='basis-20'>フォロワー: {followerNum}</p>
      </div>

      {isLogin 
        && (
          isAuth
          || (isFollow ?
            <button onClick={() => deleteFollowerNum()}>フォローを解除する</button>
            : <button onClick={() => addFollowerNum()}>フォローする</button>))}
    </>
  )
}
