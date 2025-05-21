// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
    // 1. Parsear el body JSON
    const { email, password } = await request.json();

    // 2. Validar campos mínimos
    if (!email || !password) {
        return NextResponse.json(
            { detail: 'Email and password are required.' },
            { status: 400 }
        );
    }

    // 3. Hacer la petición al backend Django para obtener tokens
    const apiRes = await fetch('http://127.0.0.1:8004/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const contentType = apiRes.headers.get('content-type') || '';
    // const data = await apiRes.json();
    let data;

    if (contentType.includes('application/json')) {
        data = await apiRes.json();
    }else{
        const text = await apiRes.text();
        throw new Error(`Return non-JSON response: ${text}`);
    }

    // 4. Si Django responde con error, lo propagamos
    if (!apiRes.ok) {
        return NextResponse.json(data, { status: apiRes.status });
    }

    const { access, refresh } = data;

    // 5. Serializar las cookies HttpOnly
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

    // 6. Devolver las cookies al cliente
    const response = NextResponse.json({ 
        message: 'Login exitoso',
        access,
        refresh, 
    });
    response.headers.set('Set-Cookie', accessCookie);
    response.headers.append('Set-Cookie', refreshCookie);


    return response;
}
