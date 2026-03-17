import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "postId required" },
        { status: 400 }
      );
    }

    /* GET POST */
    const { data: post } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    /* CREATE VARIATIONS */
    const variations = [
      `${post.topic} but more emotional`,
      `${post.topic} luxury version`,
      `${post.topic} relatable POV`,
      `${post.topic} storytelling hook`,
      `${post.topic} bold hook`,
    ];

    /* SAVE TO DB (workers will pick this) */
    const jobs = variations.map(topic => ({
      topic,
      brand_id: post.brand_id,
      avatar_id: post.avatar_id,
      source_post_id: post.id,
      status: "pending",
      scaled: true,
    }));

    await supabase.from("jobs").insert(jobs);

    return NextResponse.json({
      success: true,
      queued: variations.length,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}