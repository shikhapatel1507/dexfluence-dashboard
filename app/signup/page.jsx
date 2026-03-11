"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Signup(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleSignup(){

    const { error } = await supabase.auth.signUp({
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

    <div style={{padding:"40px"}}>

      <h1>Create Account</h1>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleSignup}>
        Sign Up
      </button>

    </div>

  )

}