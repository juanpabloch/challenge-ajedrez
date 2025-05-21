export async function fetchWithAuth(url, options = {}, method = 'GET', payload = {}) {
    const token = localStorage.getItem('accessToken');
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    let res;

    if(method == 'POST'){
        res = await fetch(url, { 
            method, 
            ...options, 
            headers,
            body: JSON.stringify(payload),
        });
    }else{
        res = await fetch(url, { ...options, headers });
    }
    

    if (res.status === 401) {
        console.log('Token expirado, intentando refrescar...');
        // intenta refrescar
        const refresh = localStorage.getItem('refreshToken');

        const r = await fetch('http://127.0.0.1:8004/api/token/refresh/', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
                refresh: JSON.stringify(refresh)
            }),
        });

        if (r.ok) {
            const { access: newAccess } = await r.json();
            localStorage.setItem('accessToken', newAccess);
            
            return fetchWithAuth(url, options);
        }
    }

    return res;
}