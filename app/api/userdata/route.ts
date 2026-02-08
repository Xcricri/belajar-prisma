import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all users or by id
export async function GET(req: NextRequest) {
    const id = new URL(req.url).searchParams.get("id");

    try {
        if (id) {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(user);
        }

        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (err) {
        return handleError(err);
    }
}


// POST create user
export async function POST(req: NextRequest) {
    try {
        const { name, email, role, address } = await req.json();

        for (const [key, value] of Object.entries({ name, email, role, address })) {
            if (!value) return NextResponse.json({ error: `${key} is required` }, { status: 400 });
        }

        const newUser = await prisma.user.create({ data: { name, email, role, address } });
        return NextResponse.json(newUser, { status: 201 });
    } catch (err) {
        return handleError(err, 400);
    }
}

// PUT update user by id
export async function PUT(req: NextRequest) {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    try {
        const body = await req.json();
        const user = await prisma.user.update({ where: { id: Number(id) }, data: body });
        return NextResponse.json(user);
    } catch (err) {
        return handleError(err);
    }
}

// DELETE user by id
export async function DELETE(req: NextRequest) {
    const id = new URL(req.url).searchParams.get("id");
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