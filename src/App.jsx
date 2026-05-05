import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// CONFIGURACIÓN OFICIAL DE MEGASTORE 399AC
const firebaseConfig = {
  apiKey: "AIzaSyCHw-gdVsPBZ49Yw_7c68RWBhIUfOZxSd8",
  authDomain: "megastore-399ac.firebaseapp.com",
  projectId: "megastore-399ac",
  storageBucket: "megastore-399ac.firebasestorage.app",
  messagingSenderId: "51295482848",
  appId: "1:51295482848:web:45237d398b2ba0d65a3185"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// FIX CRÍTICO: Esto obliga a Google a preguntar qué cuenta usar
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con Google. Verifica que el dominio esté autorizado en Firebase.");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando MEGASTORE...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
        <h1>MEGASTORE</h1>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={user.photoURL} alt="perfil" style={{ width: '35px', borderRadius: '50%' }} />
            <span>{user.displayName}</span>
            <button onClick={logout}>Salir</button>
          </div>
        ) : (
          <button 
            onClick={loginGoogle} 
            style={{ background: '#4285F4', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Entrar con Google
          </button>
        )}
      </header>

      <nav style={{ margin: '20px 0', display: 'flex', gap: '20px', fontWeight: 'bold' }}>
        <span>HOMBRE</span>
        <span>MUJER</span>
        <span>TECH</span>
        <span style={{ color: '#4285F4' }}>VENDER PRODUCTO</span>
      </nav>

      <main>
        <h2>Productos Destacados</h2>
        <div style={{ border: '1px solid #ddd', padding: '15px', width: '250px', borderRadius: '8px' }}>
          <h3>Parka Acolchada Premium NEXUS</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>S/189.99</p>
          <button style={{ width: '100%', padding: '10px', background: 'black', color: 'white', borderRadius: '5px' }}>
            Agregar al carrito
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

// MEGASTORE DEPLOY 2026 - FINAL FIX LOGIN
                                   
