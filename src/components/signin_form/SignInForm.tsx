'use client'
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { MouseEventHandler, useState } from "react"

export function SignInForm() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [lang, setLang] = useState('')
   const router = useRouter()
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get("callbackUrl") || "/review"

   const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
      event.preventDefault()

      const res = await signIn('credentials', {
         email: email,
         password: password,
         language: lang,
         redirect: true,
         callbackUrl: callbackUrl,
      })
   }

   return (
      <div className="grid gap-2">
         <label htmlFor="email">Email:</label>
         <input className="border-solid border border-gray-800 rounded px-3 py-2"
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="email..." type="email" name="email" required />
         <label htmlFor="password">Password:</label>
         <input className="border-solid border border-gray-800 rounded px-3 py-2"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="password..." type="password" name="password" required />
         <label htmlFor="language">Language:</label>
         <select className="bg-gray-200 rounded" name="language" form="auth" onChange={(e) => setLang(e.currentTarget.value)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
         </select>
         <button className="bg-gray-800 text-gray-300 py-2 mt-6 rounded" onClick={handleSubmit}>Sign in</button>
      </div>
   )
}