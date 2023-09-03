import { FC } from "react";
import { PostType } from "../type/Post.type";
import Link from 'next/link'

const Post: FC<{post: PostType}> = ({post}) => {
  return (
    <>
      <div className="flex flex-row bg-red-100 m-4 rounded-lg">
        <div className="basis-1/6 rounded-full m-2">
          <Link href={`/profile/${post.user_id}`}>
            <img className="rounded-full cursor-pointer" src={post.user_img} />
          </Link>
        </div>
        <div className="basis-3/4 m-2">
          <p className="text-gray-600 text-sm">{post.createdAt}</p>
          <Link href={`/profile/${post.user_id}`}>
            <a className="text-2xl text-gray-800">{post.user_name}</a>
          </Link>
          <p>{post.result}</p>
          <p>{post.status}</p>
          <p className="bg-red-50">{post.comment}</p>
        </div>
      </div>
    </>
  )
}

export default Post;