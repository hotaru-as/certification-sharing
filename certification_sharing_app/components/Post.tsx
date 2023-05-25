import { FC } from "react";
import { PostType } from "../type/Post.type";
import Link from 'next/link'

const Post: FC<{post: PostType}> = ({post}) => {
  return (
    <>
      <Link href="#">
        <p>アイコン</p>
      </Link>
      <Link href="#">
        <p>ユーザー名</p>
      </Link>
      <p>ユーザー名さんが{""}{""}ました！{""}</p>
      <p>コメント</p>
      <button>いいね</button>
      <p>いいね数</p>
    </>
  )
}

export default Post;