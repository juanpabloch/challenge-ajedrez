"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [terms, setTerms] = useState(false);
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${apiUrl}/api/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                first_name: fname,
                last_name: lname, 
                user_name: username,
                email, 
                password1: password, 
                password2: password2, 
                terms,
            }),
        });

        const response = await res.json();
        

        if (res.ok) {
            router.push('/login');
        } else {
            console.log('Error al registrar el usuario', res);
            console.log("respuesta", response);
        }
    };

    return (
        <div className='register_page'>
            <div className="container">
                <section className='hero'>
                    <h2>LOGO EMPRESA</h2>
                    <Link className='closeBtn' href={'/'}>
                        <Image src={'/close.svg'} alt='close' width={30} height={30} />
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre
                        <input type="text" value={fname} onChange={(e)=> setFname(e.target.value)} required/>
                    </label>
                    
                    <label>
                        Apellido
                        <input type="text" value={lname} onChange={(e)=> setLname(e.target.value)} required/>
                    </label>
                    
                    <label>
                        Nombre de usuario
                        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required/>
                    </label>
                    
                    <label>
                        Email
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </label>
                    
                    <label>
                        Contraseña
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    
                    <label>
                        Repetir contraseña
                        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                    </label>
                    
                    <label className='termsLabel'>
                        <span>Leí y acepto los términos y condiciones</span>
                        <div className="checkContainer">
                            <input type="checkbox" value={terms} onChange={(e) => setTerms(e.target.checked)} required />
                        </div>
                        
                    </label>

                    <div className="buttons">
                        <button type="submit">Registrar</button>
                        <button className='terms'>
                            <Link href={'terms'}>Términos y condic</Link>
                        </button>
                    </div>

                </form>

                <div className='options'>
                    <span>Ya tienes cuenta? <Link href={'login/'}>Iniciar sesion</Link></span>
                </div>
            </div>
        </div>
    );
}