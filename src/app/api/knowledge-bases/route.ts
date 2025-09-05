import { API_URLS } from "@/statics";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { STACK_AI_BACKEND } = API_URLS;

// POST /api/knowledge-bases
export async function POST(request: Request) {
  const token = (await cookies()).get("session_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No active session" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { connectionId, resourceIds } = body as {
      connectionId: string;
      resourceIds: string[];
    };

    if (!connectionId || !resourceIds?.length) {
      return NextResponse.json(
        { success: false, message: "Missing connectionId or resourceIds" },
        { status: 400 },
      );
    }

    const payload = {
      connection_id: connectionId,
      connection_source_ids: resourceIds,
      name: "User Knowledge Base",
      description: "Created from custom File Picker",
      indexing_params: {
        ocr: false,
        unstructured: true,
        embedding_params: {
          embedding_model: "text-embedding-ada-002",
          api_key: null,
        },
        chunker_params: {
          chunk_size: 1500,
          chunk_overlap: 500,
          chunker: "sentence",
        },
      },
      org_level_role: null,
      cron_job_id: null,
    };

    const res = await fetch(`${STACK_AI_BACKEND}/knowledge_bases`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { success: false, message: "Failed to create KB", details: text },
        { status: res.status },
      );
    }

    const kb = await res.json();

    return NextResponse.json({
      success: true,
      knowledge_base_id: kb.knowledge_base_id,
      message: "Knowledge base created successfully",
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
