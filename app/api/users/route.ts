import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET??");
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("??????post?");
  return Response.json(data, { status: 201 });
}
