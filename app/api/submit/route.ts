import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, score, details } = body;

        console.log("Submission received:", { name, score });

        // Insert into Vercel Postgres
        await sql`
      INSERT INTO results (name, score, details, created_at)
      VALUES (${name}, ${score}, ${JSON.stringify(details)}, NOW())
    `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ success: false, error: 'Database Error' }, { status: 500 });
    }
}
