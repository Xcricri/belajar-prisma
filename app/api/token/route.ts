import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: Request) {
    const { userId, getToken } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const token = await getToken();
        return NextResponse.json({ token });
    } catch (err) {
        return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
    }

}