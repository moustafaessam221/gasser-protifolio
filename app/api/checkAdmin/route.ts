import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const isAdmin = email === process.env.ADMIN_EMAIL;

  return NextResponse.json({ isAdmin });
}
