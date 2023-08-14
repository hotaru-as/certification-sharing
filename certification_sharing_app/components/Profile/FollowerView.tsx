import { useEffect, useState } from "react";
import { Follower } from "../../type/Follower.type";
import { UserType } from "../../type/User.type";
import { getAuthUser, verifyIsOwnUser } from "../../lib/accounts";
import { addFollowUser, deleteFollowUser, getOwnFollowUsers } from "../../lib/follower";

type LayoutProps = {
  userInfo: UserType;
  follows: Follower[];
  followers: Follower[];
}

export default function FollowerView({ userInfo, follows, followers }: LayoutProps) {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState<UserType | undefined>(undefined)

  const [followerNum, setFollowerNum] = useState(followers ? followers.length : 0);
  const followNum = follows ? follows.length : 0;

  useEffect(() => {
    prepare();
  }, [])

  const prepare = async () => {
    const isOwnUser = await verifyIsAuthUser();
    const loginUser = await getLoginUser();
    const isLogin = loginUser ? true : false;
    const isFollow = await verifyIsFollow(isOwnUser, loginUser);

    setIsAuthUser(isOwnUser);
    setIsLogin(isLogin);
    setLoginUser(loginUser);
    setIsFollow(isFollow);
  }

  const verifyIsAuthUser = async () => {
    const isOwnUser = await verifyIsOwnUser(userInfo);
    return isOwnUser;
  }

  const getLoginUser = async () => {
    const loginUser: UserType = await getAuthUser();
    return (loginUser && loginUser.id !== 0) ? loginUser : undefined;
  }
  
  const verifyIsFollow = async (isOwnUser: boolean, loginUser: UserType | undefined) => {
    if(!userInfo || isOwnUser || !loginUser) return false;

    if(loginUser) {
      const follower = await getOwnFollowUsers(loginUser.id, userInfo.id);
      if(follower && follower.length != 0) {
        return true;
      }
    }

    return false;
  }

  const addFollowerNum = async() => {
    if(!loginUser) return;

    setFollowerNum(followerNum + 1);
    setIsFollow(true);
    
    await addFollowUser(loginUser.id, userInfo.id)
  }

  const deleteFollowerNum = async () => {
    if(!loginUser) return;

    setFollowerNum(followerNum - 1);
    setIsFollow(false);

    const follower = await getOwnFollowUsers(loginUser.id, userInfo.id);
    await deleteFollowUser(follower[0].id);
  }

  return (
    <>
      <div className='flex flex-row'>
        <p className='basis-20'>フォロー: {followNum}</p>
        <p className='basis-20'>フォロワー: {followerNum}</p>
      </div>

      {(isLogin && !isAuthUser)
        && (
          isFollow 
            ? <button onClick={() => deleteFollowerNum()}>フォローを解除する</button>
            : <button onClick={() => addFollowerNum()}>フォローする</button>
        )
      }
    </>
  )
}
