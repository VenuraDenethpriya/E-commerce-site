import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return(
    <main className="flex items-center justify-center px-4 min-h-screen" >
      <SignUp />
    </main>
  )
}