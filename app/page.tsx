"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Signup(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleSignup(){

    const { data, error } = await supabase.auth.signUp({

      email,
      password

    })

    if(error){

      alert(error.message)
      return

    }

    router.push("/setup")

  }

  return(

    <div className="flex h-screen items-center justify-center">

      <div className="w-96 bg-white border p-8 rounded">

        <h1 className="text-xl font-bold mb-6">
          Create Brand Account
        </h1>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-black text-white w-full p-2"
        >
          Sign Up
        </button>

      </div>

    </div>

  )

}