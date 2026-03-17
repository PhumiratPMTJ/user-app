import { useState } from 'react';

const API = 'http://cpeup05.duckdns.org/api';

function App() {
  const [page, setPage] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const register = async () => {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.user) {
      setLoggedIn(true);
      setCurrentUser(data.user.username);
      setPage('home');
    }
    setResult(JSON.stringify(data, null, 2));
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentUser('');
    setPage('home');
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      {/* Navbar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setPage('home')}>Home</button>
        {!loggedIn && <button onClick={() => setPage('register')}>Register</button>}
        {!loggedIn && <button onClick={() => setPage('login')}>Login</button>}
        {loggedIn && <button onClick={logout}>Logout</button>}
      </div>

      {/* Home */}
      {page === 'home' && (
        <div>
          <h2>หน้าหลัก</h2>
          {loggedIn ? <p>ยินดีต้อนรับ <b>{currentUser}</b> 👋</p> : <p>กรุณา Login หรือ Register ครับ</p>}
        </div>
      )}

      {/* Register */}
      {page === 'register' && (
        <div>
          <h2>Register</h2>
          <input style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
            onClick={register}>Register</button>
          {result && <pre style={{ background: '#f0f0f0', padding: '10px', marginTop: '10px' }}>{result}</pre>}
        </div>
      )}

      {/* Login */}
      {page === 'login' && (
        <div>
          <h2>Login</h2>
          <input style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button style={{ width: '100%', padding: '10px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
            onClick={login}>Login</button>
          {result && <pre style={{ background: '#f0f0f0', padding: '10px', marginTop: '10px' }}>{result}</pre>}
        </div>
      )}
    </div>
  );
}

export default App;