(async () => {
    // login
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'john@example.com', password: 'password123' }),
    });
    const loginBody = await loginRes.json().catch(() => null);
    console.log('login status', loginRes.status, 'body', loginBody);
    const setCookie = loginRes.headers.get('set-cookie');
    console.log('set-cookie', setCookie);

    // call /api/auth/me with cookie
    const cookieValue = setCookie ? setCookie.split(';')[0] : '';
    const meRes = await fetch('http://localhost:3000/api/auth/me', { headers: { Cookie: cookieValue } });
    const meBody = await meRes.json().catch(() => null);
    console.log('/api/auth/me status', meRes.status, 'body', meBody);
})();
