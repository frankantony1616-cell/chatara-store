import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 1. CONFIGURACIÓN MEGASTORE
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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try { await signInWithPopup(auth, provider); } 
    catch (e) { alert("Error al conectar"); }
  };

  const logout = () => signOut(auth);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} añadido al carrito 🛒`);
  };

  if (loading) return <div style={styles.loader}>Cargando MEGASTORE...</div>;

  return (
    <div style={styles.container}>
      {/* NAVBAR PRO */}
      <header style={styles.header}>
        <h1 style={styles.logo}>MEGA<span style={{color:'#ff4d00'}}>STORE</span></h1>
        <div style={styles.navIcons}>
          <span>🛒 ({cart.length})</span>
          {user ? (
            <div style={styles.userZone}>
              <img src={user.photoURL} style={styles.avatar} alt="user" />
              <button onClick={logout} style={styles.btnLink}>Salir</button>
            </div>
          ) : (
            <button onClick={login} style={styles.btnLogin}>Entrar</button>
          )}
        </div>
      </header>

      {/* CATEGORÍAS */}
      <nav style={styles.categoryNav}>
        <a href="#" style={styles.navLink}>HOMBRE</a>
        <a href="#" style={styles.navLink}>MUJER</a>
        <a href="#" style={styles.navLink}>TECH</a>
        <a href="#" style={{...styles.navLink, color: '#ff4d00'}}>SALE</a>
      </nav>

      {/* BANNER PRINCIPAL */}
      <div style={styles.banner}>
        <h2 style={styles.bannerTitle}>NUEVA COLECCIÓN 2026</h2>
        <p>Estilo técnico para el futuro</p>
      </div>

      {/* GRILLA DE PRODUCTOS */}
      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>Productos Destacados</h2>
        <div style={styles.productGrid}>
          {[1, 2].map((id) => (
            <div key={id} style={styles.card}>
              <div style={styles.imagePlaceholder}>
                <img 
                  src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=400" 
                  style={styles.productImg} 
                  alt="Parka"
                />
              </div>
              <p style={styles.vendor}>Tienda NEXUS</p>
              <h3 style={styles.productName}>NEXUS INSULATED PARKA v{id}</h3>
              <p style={styles.price}>S/ 189.99</p>
              <button 
                onClick={() => addToCart({name: `Parka v${id}`, price: 189.99})} 
                style={styles.btnAdd}
              >
                AGREGAR AL CARRITO
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2026 MEGASTORE - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#fff', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', backgroundColor: '#000', color: '#fff', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-1px', margin: 0 },
  navIcons: { display: 'flex', alignItems: 'center', gap: '15px' },
  userZone: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ff4d00' },
  btnLogin: { backgroundColor: '#fff', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' },
  btnLink: { color: '#fff', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' },
  categoryNav: { display: 'flex', justifyContent: 'center', gap: '30px', padding: '15px', borderBottom: '1px solid #eee', fontSize: '0.8rem', fontWeight: 'bold' },
  navLink: { textDecoration: 'none', color: '#333' },
  banner: { height: '200px', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))' },
  bannerTitle: { fontSize: '1.8rem', fontWeight: '900', margin: '0 0 5px 0' },
  main: { padding: '30px 20px' },
  sectionTitle: { fontSize: '1.2rem', marginBottom: '20px', fontWeight: '800' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#fff', padding: '10px' },
  productImg: { width: '100%', borderRadius: '4px', objectFit: 'cover' },
  vendor: { fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginTop: '10px' },
  productName: { fontSize: '0.9rem', fontWeight: 'bold', margin: '5px 0' },
  price: { fontSize: '1.1rem', fontWeight: '800', margin: '0 0 10px 0' },
  btnAdd: { width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' },
  footer: { textAlign: 'center', padding: '40px', fontSize: '0.7rem', color: '#aaa', borderTop: '1px solid #eee' },
  loader: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }
};

export default App;
