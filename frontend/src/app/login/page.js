"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        });

        const response = await res.json();
        
        if(res.ok){
            const { access, refresh } = response;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            router.push('/tournaments');
        }else {
            setError(response.detail || 'Error al iniciar sesión.');
        }
    };


    return (
        <div className='login_page'>
            <div className="container">
                <section className='hero'>
                    <h2>LOGO EMPRESA</h2>
                    <Link className='closeBtn' href={'/'}>
                        <Image src={'/close.svg'} alt='close' width={25} height={25} />
                    </Link>
                </section>

                {error && (
                    <p style={{ color: 'red', marginBottom: '1rem' }}>
                    ⚠️ {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </label>
                    
                    <label>
                        Contraseña
                        <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    
                    <div className="buttons">
                        <button type="submit">Ingresar</button>
                        <Link href={'/terms'}>Términos y condic</Link>
                    </div>
                </form>

                <div className='options'>
                    <span>No tienes cuenta? <Link href={'register/'}>Registrate</Link></span>
                </div>
            </div>
        </div>
    );
}