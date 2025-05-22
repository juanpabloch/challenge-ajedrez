// app/tournaments/[id]/page.jsx
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../../components/navbar'; 

export default async function TournamentDetailPage({ params }) {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;
    const res = await fetch(`${apiUrl}/api/tournaments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        cache: 'no-store',
    });

    if (res.status === 404) {
        notFound();
    }
    if (!res.ok) {
        throw new Error('Error al cargar el torneo');
    }

    const tournament = await res.json();

    // Formateo de fecha y hora
    const iso = `${tournament.start_date}T${tournament.start_time}`;
    const dt = new Date(iso);
    const dateStr = dt.toLocaleDateString('sv').replace(/-/g, '/');
    const timeStr = dt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const stateLabel = {
        pending: 'Pendiente',
        in_progress: 'En curso',
        finish: 'Finalizado'
    }[tournament.state] || tournament.state;

    return (
        <div className="tournament-detail_page">
            <Navbar showBack={true} />
            <div className="tournament-detail">
                <h1>{tournament.name}</h1>
                <p><strong>Descripción:</strong> {tournament.description}</p>
                <p>
                    <strong>Fecha y hora de inicio:</strong> {dateStr} {timeStr}
                </p>
                <p><strong>Modo:</strong> {tournament.mode}</p>
                <p><strong>Jugadores:</strong> {tournament.players}</p>
                <p><strong>Premio:</strong> {tournament.prize} PTS</p>
                <p><strong>Estado:</strong> {stateLabel}</p>
            </div>

            <footer>
                <Image src={'/tournament.svg'} alt='tournament' width={80} height={80} />
            </footer>
        </div>
    );
}
