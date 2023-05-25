import { FC } from "react";
import { PostType } from "../type/Post.type";
import Post from "./Post";

const TimeLine: FC<{staticPosts: any}> = ({staticPosts}) => {
  const posts: PostType[] = [];
  // const filteredPosts = staticPosts?.sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )

  return (
    <>
      <div>
        {posts.map((post: PostType) => 
          <Post post={post} />
        )}
      </div>
    </>
  )
}

export default TimeLine;
