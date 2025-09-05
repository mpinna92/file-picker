import { API_URLS } from "@/statics";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RawKBResource, Resource } from "@/types/resources.type";
import { mapRawKBResource } from "@/utils/resource-mapper";

const { STACK_AI_BACKEND } = API_URLS;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }, // 👈 en Next.js 15 params es Promise
) {
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No active session" },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const resourcePath = searchParams.get("resource_path") || "/";
    const { id } = await context.params; // ✅ hay que await params
    const kbId = id;

    if (!kbId) {
      return NextResponse.json(
        { success: false, message: "Missing knowledge_base_id" },
        { status: 400 },
      );
    }

    const url = `${STACK_AI_BACKEND}/knowledge_bases/${kbId}/resources/children?resource_path=${encodeURIComponent(
      resourcePath,
    )}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch KB resources" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const resources: Resource[] = (data.data as RawKBResource[]).map(
      mapRawKBResource,
    );

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
