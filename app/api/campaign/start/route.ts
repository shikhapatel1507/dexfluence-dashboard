import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("🚀 Campaign start:", body);

    // TODO: trigger your campaign logic here

    return NextResponse.json({
      success: true,
      message: "Campaign started",
    });

  } catch (err: any) {
    console.error("❌ Campaign error:", err);

    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}