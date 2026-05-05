import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

// TU CONFIG REAL DE FIREBASE - YA ESTÁ LISTO
const firebaseConfig = {
  apiKey: "AIzaSyCHw-gdVsPBZ49Yw_7c68RWBhIUfOZxSd8",
  authDomain: "megastore-399ac.firebaseapp.com",
  projectId: "megastore-399ac",
  storageBucket: "megastore-399ac.firebasestorage.app",
  messagingSenderId: "51295482848",
  appId: "1:51295482848:web:45237d398b2ba0d65a3185"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Revisa la consola.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-2xl">Cargando Megastore...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">🔥 MEGASTORE 🔥</h1>
      
      {user ? (
        <div className="text-center">
          <img 
            src={user.photoURL} 
            alt="Foto de perfil" 
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-cyan-400"
          />
          <p className="text-xl mb-2">Bienvenido, {user.displayName}</p>
          <p className="text-gray-400 mb-6">{user.email}</p>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-6">Inicia sesión para entrar a la tienda</p>
          <button 
            onClick={handleLogin}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-bold"
          >
            Iniciar Sesión con Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App
// MEGASTORE DEPLOY 2026
