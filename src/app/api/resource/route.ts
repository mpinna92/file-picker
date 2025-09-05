import { API_URLS } from "@/statics";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { STACK_AI_BACKEND } = API_URLS;

export async function GET(request: Request) {
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No active session" },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get("connection_id");
    const resourceIds = searchParams.get("resource_ids");

    if (!connectionId || !resourceIds) {
      return NextResponse.json(
        { success: false, message: "Missing connection_id or resource_ids" },
        { status: 400 },
      );
    }

    const url = `${STACK_AI_BACKEND}/connections/${connectionId}/resources?resource_ids=${resourceIds}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch resource(s)" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ success: true, resource: data });
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
