import { API_URLS } from "@/statics";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { STACK_AI_BACKEND } = API_URLS;

export async function POST(req: Request) {
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No active session" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    const url = `${STACK_AI_BACKEND}/knowledge_bases`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create knowledge base",
          details: errorText,
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ success: true, kb: data }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, message: "Internal error", details: err.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Unknown error", details: String(err) },
      { status: 500 },
    );
  }
}
