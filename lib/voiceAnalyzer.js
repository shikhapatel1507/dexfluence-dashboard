import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function analyzeVoice(text){

  const res = await openai.chat.completions.create({
    model:"gpt-4o-mini",
    messages:[
      {
        role:"system",
        content:"Analyze brand tone and writing style"
      },
      {
        role:"user",
        content:text
      }
    ]
  })

  return res.choices[0].message.content

}