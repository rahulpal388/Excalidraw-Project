import { Button } from "@repo/ui/button"
import Link from "next/link"

export default function Home() {

  return <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center ">
    <p className="text-3xl font-bold   ">Home</p>

    <div className="flex gap-4">
      <Link href={"./signUp"} className="bg-green-100 text-green-700 rounded py-2 px-4  "> SignUp</Link>
      <Link href={"./signIn"} className="bg-blue-100 text-blue-700 rounded py-2 px-4  ">SignIn</Link>
    </div>
  </div>
}