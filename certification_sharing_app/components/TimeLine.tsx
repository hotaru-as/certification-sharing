import Link from "next/link";
import { FC } from "react";
import { PostType } from "../type/Post.type";
import Post from "./Post";
import Cookie from "universal-cookie";
import { UserInfoType } from "../type/UserInfo.type";

const cookie = new Cookie();

const TimeLine: FC<{userInfo: UserInfoType, staticPosts: any}> = ({userInfo, staticPosts}) => {
  const posts: PostType[] = [];
  // const filteredPosts = staticPosts?.sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )

  const getProfile = async () => {
    try{
      console.log(cookie.get("access_token"))
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profile/8`,
        {
          method: "GET",
          // body: JSON.stringify({ username: username, password: password }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${cookie.get("access_token")}`
          },  
        }
      )
      .then((res) => {
        if (res.status === 400) {
          throw "authentication failed";
        }
        console.log(res.json())
      });
      return true;
    } catch(err) {
      alert(err);
      return false;
    }  
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
