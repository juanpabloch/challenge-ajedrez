// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
    const { email, password } = await request.json();
s
    if (!email || !password) {
        return NextResponse.json(
            { detail: 'Email and password are required.' },
            { status: 400 }
        );
    }

    const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;
    const apiRes = await fetch(`${apiUrl}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const contentType = apiRes.headers.get('content-type') || '';

    let data;

    if (contentType.includes('application/json')) {
        data = await apiRes.json();
    }else{
        const text = await apiRes.text();
        throw new Error(`Return non-JSON response: ${text}`);
    }

    if (!apiRes.ok) {
        return NextResponse.json(data, { status: apiRes.status });
    }

    const { access, refresh } = data;

    const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 30,
    };

    const accessCookie = serialize('accessToken', access, {
        ...cookieOptions,
        maxAge: 60 * 30,       // 30 minutos
    });
    const refreshCookie = serialize('refreshToken', refresh, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24,  // 1 día
    });

    const response = NextResponse.json({ 
        message: 'Login exitoso',
        access,
        refresh, 
    });
    response.headers.set('Set-Cookie', accessCookie);
    response.headers.append('Set-Cookie', refreshCookie);


    return response;
}
