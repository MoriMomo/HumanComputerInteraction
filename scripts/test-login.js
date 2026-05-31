(async ()=>{
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'john@example.com', password: 'password123' }),
  });
  console.log('status', res.status);
  try { const body = await res.json(); console.log('body', body); } catch(e) { console.log('no json'); }
  console.log('set-cookie', res.headers.get('set-cookie'));
})();
