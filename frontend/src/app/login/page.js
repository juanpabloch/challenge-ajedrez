"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image'

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
        <div className='login_page'>
            <div className="container">
                <section className='hero'>
                    <h2>LOGO EMPRESA</h2>
                    <Link className='closeBtn' href={'/'}>
                        <Image src={'/close.svg'} alt='close' width={25} height={25} />
                    </Link>
                </section>

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