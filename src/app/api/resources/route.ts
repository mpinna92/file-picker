import { API_URLS } from "@/statics";
import { RawResource, Resource } from "@/types/resources.type";
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
    const resourceId = searchParams.get("resource_id");

    if (!connectionId) {
      return NextResponse.json(
        { success: false, message: "Missing connection_id" },
        { status: 400 },
      );
    }

    // Build URL: root or children of a folder
    const baseUrl = `${STACK_AI_BACKEND}/connections/${connectionId}/resources/children`;
    const url = resourceId ? `${baseUrl}?resource_id=${resourceId}` : baseUrl;

    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch resources" },
        { status: res.status },
      );
    }

    const data = await res.json();

    // Normalize and type response
    const resources: Resource[] = (data.data as RawResource[]).map((r) => ({
      resource_id: r.resource_id,
      path: r.inode_path?.path,
      type: r.inode_type === "directory" ? "folder" : "file",
      updated_at: r.updated_at || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, resources });
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
