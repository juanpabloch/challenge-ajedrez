'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { fetchWithAuth } from '../../../utils/api';

import Navbar from '../../components/navbar'; 


export default function TournamentsPage() {
    const router = useRouter();
    const [tournaments, setTournaments] = useState([])
    const [filterTournaments, setFiltered] = useState([]);
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadTournaments() {
        setLoading(true);
        setError(null);
        
        try {
            const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;
            const response = await fetchWithAuth(`${apiUrl}/api/tournaments/`) 

            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/login');
                    return
                }

                const errJson = await response.json().catch(() => null);
                throw new Error(errJson?.detail || `Error ${response.status}`);
            }

            const data = await response.json();
            setTournaments(data);
            
        } catch (error) {
            setError(error.message || 'Error desconocido');
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTournaments();
    }, [router]);

    useEffect(() => {
        setFiltered(
            tournaments.filter(t => {
                if (filter === '') return true;
                return t.state === filter;
            })
        );
    }, [filter, tournaments]);


    function tournamentRow(tournament) {
        const iso = `${tournament.start_date}T${tournament.start_time}`;
        const date = new Date(iso);
        const dateStr = date.toLocaleDateString('sv').replace(/-/g, '/');
        const timeStr = date.toLocaleTimeString('en-US', {
            hour: 'numeric', minute: '2-digit', hour12: true
        });
        const mode = tournament.mode.charAt(0).toUpperCase() + tournament.mode.slice(1);
        const modeImage = tournament.mode === 'bullet' ? '/bullet.svg' : '/standard.svg';
        const state = tournament.state === 'pending' ? 'Pendiente' : tournament.state === 'in_progress' ? 'En curso' : 'Finalizado';

        return (
            <>
                <td>{tournament.name}</td>
                <td>{dateStr} {timeStr}</td>
                <td style={{ textAlign: 'left' }}><Image src={modeImage} alt='' width={20} height={20} /> {mode}</td>
                <td>{tournament.prize} PTS</td>
                <td>{state}</td>
            </>
        );
    }

    function handleRowClick(tournament) {
        console.log('Row clicked:', tournament);
        router.push(`/tournaments/${tournament.id}`);
    }



    return (
        <div className='tournaments_page'>
            <Navbar />

            {
                loading ? (
                    <></>
                ) : error ? (
                    <></>
                ) : (
                    <div className="tournaments__filter">
                        <label htmlFor="stateFilter">Filtrar por estado</label>
                        <select id="stateFilter" onChange={(e) => setFilter(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="pending">Pendientes</option>
                            <option value="in_progress">En curso</option>
                            <option value="finish">Finalizados</option>
                        </select>
                    </div>
                )
            }
            
            
            <div className="tournaments">
                {loading ? (
                    <p>Cargando torneos…</p>
                ) : error ? (
                    <div className='tournaments__error'>
                        <p>{error}</p>
                        <button onClick={loadTournaments}>Reintentar</button>
                    </div>
                ) : (
                <>
                    <table className='tournaments__table' cellSpacing="0" cellPadding="0">
                    <thead>
                        {filterTournaments.length > 0 ? (
                            <tr>
                                <th>Torneo</th>
                                <th>Fecha de inicio</th>
                                <th style={{ textAlign: 'left' }}>Modo</th>
                                <th>Premio</th>
                                <th>Estado</th>
                            </tr>
                            ) : (
                            <tr><th colSpan={5}>No hay torneos disponibles.</th></tr>
                        )}
                    </thead>
                    <tbody>
                        {filterTournaments
                            .filter(t => t.state !== 'finish')
                            .map(t => (
                                <tr
                                    key={t.id}
                                    className={`tournament__row row-${t.state}`}
                                    onClick={() => handleRowClick(t)}
                                    style={{ cursor: 'pointer' }}
                                >
                                {tournamentRow(t)}
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                    <button onClick={() => router.push('/tournaments/create')}>Crear</button>
                </>
                )}
            </div>

            <footer>
                <Image src={'/tournament.svg'} alt='tournament' width={80} height={80} />
                <p>Torneos</p>
            </footer>
        </div>
    );
}