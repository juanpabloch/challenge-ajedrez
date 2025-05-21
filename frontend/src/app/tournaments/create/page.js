"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link'
import { fetchWithAuth } from '../../../../utils/api';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mode, setMode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [players, setPlayers] = useState('');
    const [prize, setPrize] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await fetchWithAuth('http://127.0.0.1:8004/api/tournaments/',
            {}, 
            'POST', 
            { 
                name,
                description,
                mode,
                start_date: startDate,
                start_time: startTime,
                players,
                prize,
            }
        )

        const response = await res.json();
        

        if (res.ok) {
            router.push('/tournaments');
        } else {
            console.log('Error al registrar torneo', res);
            console.log("respuesta", response);
        }
    };

    return (
        <>
            <h1>Crear Torneo</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input placeholder="Nombre" type="text" value={name} onChange={(e)=> setName(e.target.value)} required/>
                </label>
                <br />
                <label>
                    <textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Descripcion" rows={4} cols={50} required/>
                </label>
                <br />
                <label>
                    <select name="mode" id="mode" onChange={(e) => setMode(e.target.value)} required>
                        <option value="">MODO</option>
                        <option value="bullet">Bullet</option>
                        <option value="standard">Standard</option>
                    </select>
                </label>
                <br />
                <label>
                    Fecha inicio
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                </label>
                <br />
                <label>
                    Hora inicio
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </label>
                <br />
                <label>
                    Jugadores
                    <input type="number" value={players} onChange={(e) => setPlayers(e.target.value)} required />
                </label>
                <br />
                <label>
                    Premio
                    <input type="number" value={prize} onChange={(e) => setPrize(e.target.value)} required />
                </label>
                <br />

                <button className='terms'>
                    <Link href={'/tournaments'}>Cancelar</Link>
                </button>
                <button type="submit">Crear</button>
            </form>
        </>
    );
}