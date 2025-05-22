'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function Navbar() {
    const route = useRouter()

    const handleLogout = async() => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        route.push("/")
    }

    return (
        <nav>
            {/* Logo */}
            <Link href="/">
                <span>LOGO EMPRESA</span>
            </Link>
            
            <div className="actions">
                <button>
                    <Image src={'/info.svg'} alt='Info' width={40} height={40} title='Info'/>
                </button>
                <button>
                    <Image src={'/config.svg'} alt='Config' width={40} height={40} title='Config'/>
                </button>
                <button>
                    <Image src={'/anuncios.svg'} alt='Anuncio' width={40} height={40} title='Anuncio'/>
                </button>

                <button className='loguotBtn' onClick={handleLogout} title='Cerrar sesión'>
                    <Image src={'/power-off.svg'} alt='Cerrar sesión' width={30} height={30}/>
                </button>
            </div>
            
        </nav>
    );
}