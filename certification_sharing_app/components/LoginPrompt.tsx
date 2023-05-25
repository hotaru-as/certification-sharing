import { FC } from "react";
import Link from 'next/link'

const LoginPrompt: FC = () => {
  return (
    <>
      <div>
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
        <p>ログインして勉強記録をシェアしましょう</p>
      </div>
    </>
  )
}

export default LoginPrompt;