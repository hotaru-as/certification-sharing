import Link from "next/link";
import { FC } from "react";
import { PostType } from "../type/Post.type";
import Post from "./Post";
import { UserType } from "../type/User.type";

const TimeLine: FC<{userInfo: UserType, staticPosts: any}> = ({userInfo, staticPosts}) => {
  return (
    <>
      <div>
        {
          userInfo.id !== 0
          ? (
            <>
              <h2 className="m-4 text-lg">
                <Link href={`/profile/${userInfo.id}`}>
                  <a className="font-bold text-pink-600">プロフィール</a>
                </Link>
                ページに進む
              </h2>
              <h2 className="mx-4">{userInfo.username}さんのタイムライン</h2>  
            </>
          )
          : (
            <>
              <h2 className="m-4 text-lg">
                <Link href={`/login`}>
                  <a className="font-bold text-pink-600">ログイン</a>
                </Link>
                または
                <Link href={`/register`}>
                  <a className="font-bold text-pink-600">アカウントを作成</a>
                </Link>
                して勉強記録をシェアしよう！</h2>
              <h2 className="mx-4 mt-10">タイムライン</h2>  
            </>
          )
        }
        {staticPosts.map((post: PostType) => 
          <Post key={post.id} post={post} />
        )}
      </div>
    </>
  )
}

export default TimeLine;
