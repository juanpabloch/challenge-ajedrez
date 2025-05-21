'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


export default function HomePage() {

    return (
        <div>
            <h1>Bienvenido a la Página Principal</h1>
            <ul>
                <li>
                    <Link href={'/login'}>Login</Link>
                </li>
                <li>
                    <Link href={'/register'}>Register</Link>
                </li>
            </ul>
            <div className='options'>
                <ul>
                    <li>
                        <Link href={'/terms'}>Terminos y condiciones</Link>
                    </li>
                    <li>
                        <Link href={'/user-manual'}>Manual de usuario</Link>
                    </li>
                    <li>
                        <Link href={'/faqs'}>F.A.Qs</Link>
                    </li>
                </ul>    
            </div>
            
        </div>
    );
}