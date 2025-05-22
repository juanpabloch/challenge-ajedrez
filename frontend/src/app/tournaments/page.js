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

    useEffect(() => {
        async function loadTournaments() {
            try {
                const res = await fetchWithAuth('http://127.0.0.1:8004/api/tournaments/') 

                if (res.ok) {
                    const data = await res.json();
                    setTournaments(data);
                    console.log("tournaments", data);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error de red', error);
            }
        }
        
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

    return (
        <div className='tournaments_page'>
            <Navbar />
            <div className="tournaments__filter">
                <label htmlFor="stateFilter">Filtrar por estado</label>
                <select id="stateFilter" onChange={(e) => setFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="pending">Pendientes</option>
                    <option value="in_progress">En curso</option>
                    <option value="finish">Finalizados</option>
                </select>
            </div>
            <div className="tournaments">
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
                            <tr>
                                <th></th>
                            </tr>
                        )}
                        
                    </thead>

                    <tbody>
                        {filterTournaments.filter(t => t.state !== 'finish').length > 0 ? (
                            filterTournaments.map(t => (
                            <tr key={t.id} 
                                className={
                                    t.state === 'pending'
                                    ? 'row-pending tournament__row'
                                    : t.state === 'in_progress'
                                    ? 'row-in-progress tournament__row': ''
                            }>
                                {tournamentRow(t)}
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='tournaments__empty'>
                                    No hay torneos disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button onClick={() => router.push('/tournaments/create')}>Crear</button>
            </div>

            <footer>
                <Image src={'/tournament.svg'} alt='tournament' width={80} height={80} />
                <p>Torneos</p>
            </footer>
        </div>
    );
}