const API = 'http://localhost:3000/api';

function setStatus(msg, ok) {
  const el = document.getElementById('loginStatus');
  el.textContent = msg;
  el.className = 'status ' + (ok ? 'ok' : 'err');
}

function show(data) {
  document.getElementById('output').textContent =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

async function login() {
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const response = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(`❌ ${data.error || 'Error en el servidor'}`, false);
      return;
    }

    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
    setStatus(`✅ Sesión iniciada como ${data.user.nombre} (${data.user.role})`, true);
  } catch (err) {
    console.error(err);
    setStatus('❌ No se pudo conectar con la API', false);
  }
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  setStatus('Sesión cerrada', true);
  show('— Inicia sesión y prueba los endpoints —');
}

// Helper para todas las llamadas que necesitan token
async function authFetch(path) {
  const token = sessionStorage.getItem('token');

  if (!token) {
    show('⚠️ No hay token. Inicia sesión primero.');
    return;
  }

  try {
    const response = await fetch(`${API}${path}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();

    if (response.status === 401) {
      show(`❌ 401 No autorizado: ${data.error}`);
      return;
    }
    if (response.status === 403) {
      show(`❌ 403 Prohibido: ${data.error}`);
      return;
    }

    show(data);
  } catch (err) {
    show('❌ Error de red: ' + err.message);
  }
}

const loadMe = () => authFetch('/me');
const loadPersonajes = () => authFetch('/personajes');
const loadUsuarios = () => authFetch('/usuarios/1/personajes');