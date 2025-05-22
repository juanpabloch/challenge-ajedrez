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
        
        const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;
        const res = await fetchWithAuth(`${apiUrl}/api/tournaments/`,
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
        <div className='tournament_register_page'>
            <div className="container">
                <h1>Crear Torneo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="left">
                            <label>
                                <input placeholder="Nombre torneo" type="text" value={name} onChange={(e)=> setName(e.target.value)} required/>
                            </label>
                            
                            <label>
                                <textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Descripción" rows={10} cols={50} required/>
                            </label>
                        </div>
                        
                        <div className="right">
                            <label>
                                <select name="mode" id="mode" onChange={(e) => setMode(e.target.value)} required>
                                    <option value="">MODO</option>
                                    <option value="bullet">Bullet</option>
                                    <option value="standard">Standard</option>
                                </select>
                            </label>
                            
                            <label>
                                <span>Fecha inicio</span>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                            </label>
                            
                            <label>
                                <span>Hora inicio</span>
                                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                            </label>
                            
                            <label>
                                <span>Jugadores</span>
                                <input type="number" value={players} onChange={(e) => setPlayers(e.target.value)} required />
                            </label>
                            
                            <label>
                                <span>Premio</span>
                                <input type="number" value={prize} onChange={(e) => setPrize(e.target.value)} required />
                            </label>
                        </div>
                    </div>
                    

                    <div className="actionsBtn">
                        <Link href={'/tournaments'} className='cancelBtn'>Cancelar</Link>
                        <button type="submit">Crear</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}