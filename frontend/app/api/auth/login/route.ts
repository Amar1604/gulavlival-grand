import { NextResponse } from 'next/server';
import { signToken, setSessionCookie } from '@/lib/auth';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Call FastAPI backend
        const response = await fetch(`${BACKEND_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: errData.detail || 'Invalid email or password' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const user = data.user;
        const primaryRole = user.roles && user.roles.length > 0 ? user.roles[0] : 'Customer';

        // Generate session token
        const token = await signToken({
            id: user.id,
            email: user.email,
            role: primaryRole,
            name: user.full_name ?? undefined,
        });

        // Set session cookie
        await setSessionCookie(token);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: primaryRole,
                name: user.full_name,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred during login' },
            { status: 500 }
        );
    }
}
