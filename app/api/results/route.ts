import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret');

        // Basic protection
        if (secret !== process.env.ADMIN_PASSWORD && secret !== 'admin2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { rows } = await sql`SELECT * FROM results ORDER BY created_at DESC`;
        return NextResponse.json({ results: rows });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
