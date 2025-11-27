import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, score, details } = body;

    console.log("Submission received:", { name, score });

    // TODO: Connect to Vercel Postgres here
    // await sql`INSERT INTO results (name, score, details) VALUES (${name}, ${score}, ${JSON.stringify(details)})`;

    return NextResponse.json({ success: true });
}
