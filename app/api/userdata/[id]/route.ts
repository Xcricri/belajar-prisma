import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// Get id from parameter
function getIdFromRequest(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("Missing user id");
    return Number(id);
}

// GET: Ambil user by id
export async function GET(req: Request) {
    try {
        const id = getIdFromRequest(req);
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return NextResponse.json(user);
    } catch (err) {
        return handleError(err);
    }
}

// DELETE user by id
export async function DELETE(req: Request) {
    const id = getIdFromRequest(req)
    if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (err) {
        return handleError(err);
    }
}

// Handle error
async function handleError(err: unknown, status = 500) {
    return NextResponse.json(
        { error: err instanceof Error ? err.message : "An unknown error occurred" },
        { status }
    );
}