import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
const body = await request.json();
return NextResponse.json(body, {status: 200});
}