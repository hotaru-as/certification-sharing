import Link from "next/link";
import { FC } from "react";
import { PostType } from "../type/Post.type";
import Post from "./Post";
import { UserInfoType } from "../type/UserInfo.type";

const TimeLine: FC<{userInfo: UserInfoType, staticPosts: any}> = ({userInfo, staticPosts}) => {
  const posts: PostType[] = [];
  // const filteredPosts = staticPosts?.sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )

  const getProfile = async () => {
  }

  return (
    <>
      <div>
        <Link href={`/profile/${userInfo.user_id}`}>
          プロフィール
        </Link>
        <h2>{userInfo.user_name}さんのタイムライン</h2>
        {posts.map((post: PostType) => 
          <Post post={post} />
        )}
      </div>
    </>
  )
}

export default TimeLine;
