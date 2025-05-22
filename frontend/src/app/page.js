'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


export default function HomePage() {
    const router = useRouter();
    const aLinks = document.querySelectorAll('li');
    aLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(link);
        });
    });

    return (

        <div className='main_page'>
            <div className="container">
                <section className='header'>
                    <h1>LOGO EMPRESA</h1>
                    <p>
                        A new way to play the consecrated game of chess. A decentralized platform for everyone who 
                        wants to earn money playing the most beloved game in the history of mankind. Scholarships, 
                        tournaments, chip system, ratings, integrated rapido or blitz chess mode and much more in 
                        the future.A new way to play the consecrated game of chess. A decentralized platform for 
                        everyone who wants to earn money playing the most beloved game in the history of mankind. 
                        Scholarships, tournaments, chip system, ratings, integrated rapido or blitz chess mode and 
                        much more in the future.more in the future. aca
                    </p>
                </section>
                <section className='main'>
                    <ul>
                        <li onClick={() => router.push('/login')}>
                            <Link href={'/login'}>Login</Link>
                        </li>
                        <li onClick={() => router.push('/register')}>
                            <Link href={'/register'}>Register</Link>
                        </li>
                    </ul>
                    <div className='options'>
                        <ul>
                            <li onClick={() => router.push('/terms')}>
                                <Link href={'/terms'}>Terminos y condic</Link>
                            </li>
                            <li onClick={() => router.push('/user-manual')}>
                                <Link href={'/user-manual'}>Manual de usuario</Link>
                            </li>
                            <li onClick={() => router.push('/faqs')}>
                                <Link href={'/faqs'}>F.A.Q<span>s</span></Link>
                            </li>
                        </ul>    
                    </div>
                </section>
            </div>

            {/* <div className="background">
                <div className='rombo'></div>
            </div> */}
        </div>
    );
}