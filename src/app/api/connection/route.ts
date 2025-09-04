import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URLS } from "@/statics";

export async function GET() {
  const { STACK_AI_BACKEND } = API_URLS;

  // Get token from cookies
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No active session" },
      { status: 401 },
    );
  }

  try {
    // Call StackAI backend
    const res = await fetch(
      `${STACK_AI_BACKEND}/connections?connection_provider=gdrive&limit=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch connection" },
        { status: res.status },
      );
    }

    const data = await res.json();

    // Take the first connection only
    const connection = data[0];

    if (!connection) {
      return NextResponse.json(
        { success: false, message: "No connections found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      connection: {
        connection_id: connection.connection_id,
        name: connection.name,
        created_at: connection.created_at,
        updated_at: connection.updated_at,
      },
    });
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
