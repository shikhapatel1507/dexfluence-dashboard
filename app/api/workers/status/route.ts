import { NextResponse } from "next/server"

export async function GET() {

  const workers = [
    { name: "scriptWorker", active: true },
    { name: "imageWorker", active: true },
    { name: "videoWorker", active: true },
    { name: "publishWorker", active: true }
  ]

  return NextResponse.json({
    success: true,
    workers
  })

}