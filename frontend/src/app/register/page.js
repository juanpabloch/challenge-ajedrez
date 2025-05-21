"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link'

export default function RegisterPage() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [terms, setTerms] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:8004/api/register/', {
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
        <>
            <section className='hero'>
                <p>LOGO</p>
                <Link href={'/'}>x</Link>
            </section>

            <form onSubmit={handleSubmit}>
                <label>
                    Nombre
                    <input type="text" value={fname} onChange={(e)=> setFname(e.target.value)} required/>
                </label>
                <br />
                <label>
                    Apellido
                    <input type="text" value={lname} onChange={(e)=> setLname(e.target.value)} required/>
                </label>
                <br />
                <label>
                    Nombre de usuario
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required/>
                </label>
                <br />
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
                <label>
                    Repetir contraseña:
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                </label>
                <br />
                <label>
                    Lei y acepto los terminos y condiciones
                    <input type="checkbox" value={terms} onChange={(e) => setTerms(e.target.checked)} required />
                </label>
                <br />
                <button type="submit">Registrar</button>
                <button className='terms'>
                    <Link href={'terms'}>Terminos y condic</Link>
                </button>

            </form>

            <div className='options'>
                <span>Ya tienes cuenta? <Link href={'login/'}>Iniciar sesion</Link></span>
            </div>

        </>
    );
}