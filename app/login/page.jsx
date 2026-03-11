"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleLogin(){

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
      return
    }

    router.push("/dashboard")
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>Login</h1>

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

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  )

}