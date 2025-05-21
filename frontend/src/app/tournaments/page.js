'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { fetchWithAuth } from '../../../utils/api';

import Navbar from '../../components/navbar'; 


export default function TournamentsPage() {
    const router = useRouter();
    const [tournaments, setTournaments] = useState([])

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

    function tournamentRow(tournament) {
        const iso = `${tournament.start_date}T${tournament.start_time}`;
        const date = new Date(iso);
        const dateStr = date.toLocaleDateString('sv').replace(/-/g, '/');
        const timeStr = date.toLocaleTimeString('en-US', {
            hour: 'numeric', minute: '2-digit', hour12: true
        });

        return (
            <>
                <td>{tournament.name}</td>
                <td>{dateStr} {timeStr}</td>
                <td>{tournament.mode}</td>
                <td>{tournament.prize} PTS</td>
            </>
        );
    }

    return (
        <div>
            <Navbar />

            <div className="tournaments">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Torneo</th>
                            <th>Fecha de inicio</th>
                            <th>Modo</th>
                            <th>Premio</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tournaments.filter(t => t.state !== 'finish').length > 0 ? (
                            tournaments.map(t => (
                            <tr key={t.id} 
                                className={
                                    t.state === 'pending'
                                    ? 'row-pending'
                                    : t.state === 'in_progress'
                                    ? 'row-in-progress': ''
                            }>
                                {tournamentRow(t)}
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    No hay torneos disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button onClick={() => router.push('/tournaments/create')}>Crear Torneo</button>
            </div>
        </div>
    );
}