"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Login(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function login(){

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

if(!error){

router.push("/dashboard")

}

}

return(

<div className="flex items-center justify-center h-screen">

<div className="w-96 border p-8 rounded">

<h1 className="text-2xl font-bold mb-6">
Login
</h1>

<input
className="border w-full p-2 mb-4"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="border w-full p-2 mb-4"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={login}
className="bg-black text-white w-full p-2"
>

Login

</button>

</div>

</div>

)

}