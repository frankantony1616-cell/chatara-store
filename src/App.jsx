import { useState } from 'react'

function App() {
  const numeroWhatsApp = "51934799890";
  const logoUrl = "https://i.imgur.com/eHpe6iN.png";

  const [categoriaActiva, setCategoriaActiva] = useState('HOMBRE');
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);
  const [colorSeleccionado, setColorSeleccionado] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('M');

  const productos = [
    {
      id: 1,
      nombre: "NEXUS INSULATED TECHNICAL PARKA",
      precio: 189.99,
      categoria: "HOMBRE",
      rating: 5,
      variantes: [
        { nombre: 'Navy', hex: '#1e3a5f', imagen: "https://i.imgur.com/Kz7w8Xq.jpg" },
        { nombre: 'Black', hex: '#000000', imagen: "https://i.imgur.com/Kz7w8Xq.jpg" },
        { nombre: 'Grey', hex: '#6b7280', imagen: "https://i.imgur.com/Kz7w8Xq.jpg" },
        { nombre: 'Olive', hex: '#3f6212', imagen: "https://i.imgur.com/Kz7w8Xq.jpg" },
      ]
    },
    {
      id: 2,
      nombre: "SUÉTER DE LANA MERINO",
      precio: 95.00,
      categoria: "MUJER",
      rating: 5,
      variantes: [
        { nombre: 'Beige', hex: '#d4c5b9', imagen: "https://i.imgur.com/B4nR7tY.jpg" },
        { nombre: 'Brown', hex: '#8b7355', imagen: "https://i.imgur.com/B4nR7tY.jpg" },
        { nombre: 'Pink', hex: '#f9a8d4', imagen: "https://i.imgur.com/B4nR7tY.jpg" },
        { nombre: 'Purple', hex: '#7c3aed', imagen: "https://i.imgur.com/B4nR7tY.jpg" },
      ]
    },
  ];

  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const categorias = ['TODOS', 'HOMBRE', 'MUJER', 'TECH', 'NOVEDADES', 'OFERTAS'];

  const producto = productos[productoSeleccionado];
  const variante = producto.variantes[colorSeleccionado];
  const coloresDisponibles = producto.variantes;

  const productosFiltrados = categoriaActiva === 'TODOS' || categoriaActiva === 'NOVEDADES' || categoriaActiva === 'OFERTAS'
  ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  const comprarWhatsApp = () => {
    const mensaje = `Hola! Quiero comprar: ${producto.nombre} - Color: ${variante.nombre} - Talla: ${tallaSeleccionada} - S/${producto.precio}`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#000', color: 'white', padding: '12px 4%', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
            <img src={logoUrl} alt="MEGA-STORE" style={{ height: '32px' }} />
            <nav style={{ display: 'flex', gap: '35px', fontSize: '13px', fontWeight: '600' }}>
              {categorias.map(cat => (
                <span key={cat} onClick={() => {setCategoriaActiva(cat); setProductoSeleccionado(0); setColorSeleccionado(0);}} style={{cursor: 'pointer', color: categoriaActiva === cat? '#4a9eff' : 'white', textTransform: 'uppercase', borderBottom: categoriaActiva === cat? '2px solid #4a9eff' : 'none', paddingBottom: '3px'}}>{cat}</span>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <input type="text" placeholder="Buscar producto..." style={{ padding: '8px 15px', borderRadius: '20px', border: 'none', width: '220px' }} />
            <span style={{ fontSize: '13px', cursor: 'pointer' }}>🛒 Carrito</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1600px', margin: '0 auto', padding: '30px 4%', gap: '30px' }}>
        <aside style={{ width: '260px' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', position: 'sticky', top: '80px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '15px', color: '#333' }}>CATEGORÍAS</h3>
            <div style={{ fontSize: '13px', lineHeight: '2', color: '#555', marginBottom: '25px' }}>
              {categorias.map(cat => (<div key={cat} onClick={() => {setCategoriaActiva(cat); setProductoSeleccionado(0); setColorSeleccionado(0);}} style={{cursor: 'pointer', color: categoriaActiva === cat? '#4a9eff' : '#555', fontWeight: categoriaActiva === cat? '700' : '400'}}>{cat}</div>))}
            </div>
            <h3 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '15px', color: '#333' }}>TALLA</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '25px' }}>
              {tallas.map(talla => (<button key={talla} onClick={() => setTallaSeleccionada(talla)} style={{padding: '8px', border: tallaSeleccionada === talla? '2px solid #000' : '1px solid #ddd', backgroundColor: tallaSeleccionada === talla? '#000' : 'white', color: tallaSeleccionada === talla? 'white' : '#333', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600'}}>{talla}</button>))}
            </div>
            <h3 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '15px', color: '#333' }}>COLOR - {coloresDisponibles.length} opciones</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {coloresDisponibles.map((color, idx) => (<div key={idx} onClick={() => setColorSeleccionado(idx)} title={color.nombre} style={{width: '100%', aspectRatio: '1', borderRadius: '8px', backgroundColor: color.hex, border: colorSeleccionado === idx? '3px solid #4a9eff' : '2px solid #ddd', cursor: 'pointer', boxShadow: colorSeleccionado === idx? '0 0 0 2px white, 0 0 0 5px #4a9eff' : '0 2px 4px rgba(0,0,0,0.1)'}} />))}
            </div>
          </div>
        </aside>

        <main style={{ flex: 1 }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', marginBottom: '30px', display: 'flex', gap: '50px' }}>
            <div style={{ flex: '0 0 45%' }}><img src={variante.imagen} alt={producto.nombre} style={{width: '100%', borderRadius: '8px', boxShadow: `0 0 40px ${variante.hex}40`}} /></div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '15px', lineHeight: '1.2' }}>{producto.nombre}</h1>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>S/{producto.precio}</div>
              <div style={{ marginBottom: '25px', fontSize: '18px' }}>{'★'.repeat(producto.rating).split('').map((star, i) => (<span key={i} style={{ color: '#fbbf24' }}>{star}</span>))}</div>
              <div style={{ marginBottom: '25px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', color: '#666' }}>COLOR: {variante.nombre.toUpperCase()}</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>{coloresDisponibles.map((color, idx) => (<div key={idx} onClick={() => setColorSeleccionado(idx)} title={color.nombre} style={{width: '45px', height: '45px', borderRadius: '8px', backgroundColor: color.hex, border: colorSeleccionado === idx? '3px solid #000' : '2px solid #ddd', cursor: 'pointer', boxShadow: colorSeleccionado === idx? '0 0 0 2px white, 0 0 0 5px #000' : '0 2px 4px rgba(0,0,0,0.1)'}} />))}</div>
              </div>
              <button onClick={comprarWhatsApp} style={{width: '100%', backgroundColor: variante.hex, color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', marginBottom: '20px', textTransform: 'uppercase'}}>AÑADIR AL CARRITO</button>
              <div style={{ display: 'flex', gap: '30px', fontSize: '13px', color: '#666' }}><div>🚚 ENVÍO GRATIS</div><div>↩️ DEVOLUCIÓN FÁCIL</div></div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '25px' }}>{categoriaActiva === 'TODOS'? 'TODOS LOS PRODUCTOS' : categoriaActiva}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {productosFiltrados.map((prod, idx) => (<div key={prod.id} onClick={() => {setProductoSeleccionado(productos.indexOf(prod)); setColorSeleccionado(0); window.scrollTo({ top: 0, behavior: 'smooth' });}} style={{border: productoSeleccionado === productos.indexOf(prod)? '2px solid #4a9eff' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer'}}><img src={prod.variantes[0].imagen} alt={prod.nombre} style={{ width: '100%', height: '250px', objectFit: 'cover' }} /><div style={{ padding: '15px' }}><div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{prod.nombre}</div><div style={{ fontSize: '18px', fontWeight: '700' }}>S/{prod.precio}</div><div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>{prod.variantes.length} colores disponibles</div></div></div>))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
