/** @format */

import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = "http://13.60.79.156:8000/recommend"; // your FastAPI URL

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(FASTAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "FastAPI request failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching from FastAPI:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
