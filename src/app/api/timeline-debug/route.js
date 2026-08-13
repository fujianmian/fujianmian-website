import { NextResponse } from "next/server";

const diagnostics = [];
const MAX_ENTRIES = 120;

export async function POST(request) {
  const payload = await request.json();
  diagnostics.push({ receivedAt: new Date().toISOString(), ...payload });
  if (diagnostics.length > MAX_ENTRIES) diagnostics.splice(0, diagnostics.length - MAX_ENTRIES);

  return NextResponse.json({ received: true });
}

export function GET() {
  return NextResponse.json({ diagnostics });
}
