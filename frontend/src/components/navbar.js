'use client';

import Link from 'next/link';

export default function Navbar() {

    const handleLogout = async() => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            {/* Logo */}
            <Link href="/">
                <span>LOGO</span>
            </Link>
            
            {/* Botón de cerrar sesión */}
            <button onClick={handleLogout}>
                <Link href="/">
                    <span>Cerrar sesión</span>
                </Link>
            </button>
        </nav>
    );
}