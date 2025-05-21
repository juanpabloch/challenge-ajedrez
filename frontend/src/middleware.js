// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // Rutas públicas
    if (pathname.startsWith('/login') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    if (pathname === '/') {
        if (token) {
            const url = request.nextUrl.clone();
            url.pathname = '/tournaments';
            return NextResponse.redirect(url);   
        }else{
            return NextResponse.next();
        }
    }

    // Si no hay token, redirige al login
    if (!token) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    console.log('Token encontrado, permitiendo acceso a la ruta');

    return NextResponse.next();
}

// Indica qué rutas cargarán el middleware
export const config = {
    matcher: ['/', '/tournaments/:path*'],
};
