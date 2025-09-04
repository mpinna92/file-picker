import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEFAULT_CREDENTIALS, API_URLS } from "@/statics";

export async function GET() {
  const { EMAIL, PASSWORD, ANON_KEY } = DEFAULT_CREDENTIALS;
  const { SUPABASE_AUTH_URL } = API_URLS;

  // Check if the session cookie already exists
  const session = (await cookies()).get("session_token");

  if (session) {
    return NextResponse.json({
      success: true,
      message: "Session is valid",
    });
  }

  // If no cookie, perform automatic login
  try {
    const requestUrl = `${SUPABASE_AUTH_URL}/auth/v1/token?grant_type=password`;

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Apikey: ANON_KEY,
      },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
        gotrue_meta_security: {},
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Automatic login failed" },
        { status: res.status },
      );
    }

    const data = await res.json();
    const accessToken = data.access_token;

    // Renew session cookie
    const response = NextResponse.json({
      success: true,
      message: "Session was renewed automatically",
    });

    response.cookies.set("session_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
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
