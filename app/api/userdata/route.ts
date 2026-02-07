import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET all users
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// POST create user
export async function POST(req: NextRequest) {
    const { name, email, role, address } = await req.json();

    const requiredFields = { name, email, role, address };

    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value) {
            return NextResponse.json(
                { error: `${key} is required` },
                { status: 400 }
            );
        }
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                address,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Failed to create user" },
            { status: 400 }
        );
    }
}

// PUT update user
export async function PUT(req: NextRequest) {
    const { id, name, email, role, address } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "User id required" }, { status: 400 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                role,
                address,
            },
        });
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// DELETE user
export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "User id required" }, { status: 400 });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        return NextResponse.json(deletedUser, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
