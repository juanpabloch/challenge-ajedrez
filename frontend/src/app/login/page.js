"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        });

        const response = await res.json();
        const { access, refresh } = response;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        if(res.ok){
            router.push('/tournaments');
        }else {
            const err = await res.json();
            console.log(err);
        }
    };


    return (
        <>
        <section className='hero'>
                <p>LOGO</p>
                <Link href={'/'}>x</Link>
        </section>

        <form onSubmit={handleSubmit}>
            <label>
                Correo Electrónico:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <br />
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Ingresar</button>
        </form>

        <br />

        <div className='options'>
            <span>No tienes cuenta? <Link href={'register/'}>Registrate</Link></span>
        </div>
        </>
    );
}