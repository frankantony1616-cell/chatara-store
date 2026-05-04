import { useState, useEffect } from 'react'

function App() {
  const numeroWhatsApp = "51934799890";
  const logoUrl = "https://i.imgur.com/eHpe6iN.png";
  const [isMobile, setIsMobile] = useState(false);

  const [categoriaActiva, setCategoriaActiva] = useState('HOMBRE');
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);
  const [colorSeleccionado, setColorSeleccionado] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('M');
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const productos = [
    {
      id: 1,
      nombre: "NEXUS INSULATED TECHNICAL PARKA",
      precio: 189.99,
      categoria: "HOMBRE",
      rating: 5,
      variantes: [
        { nombre: 'Navy', hex: '#1e3a5f', imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
        { nombre: 'Black', hex: '#000000', imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
        { nombre: 'Grey', hex: '#6b7280', imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
        { nombre: 'Olive', hex: '#3f6212', imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
      ]
    },
    {
      id: 2,
      nombre: "SUÉTER DE LANA MERINO",
      precio: 95.00,
      categoria: "MUJER",
      rating: 5,
      variantes: [
        { nombre: 'Beige', hex: '#d4c5b9', imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" },
        { nombre: 'Brown', hex: '#8b7355', imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" },
        { nombre: 'Pink', hex: '#f9a8d4', imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" },
        { nombre: 'Purple', hex: '#7c3aed', imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" },
      ]
    },
    {
      id: 3,
      nombre: "MOCHILA TÉCNICA",
      precio: 120.00,
      categoria: "TECH",
      rating: 4,
      variantes: [
        { nombre: 'Black', hex: '#000000', imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
        { nombre: 'Grey', hex: '#6b7280', imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
        { nombre: 'Navy', hex: '#1e3a5f', imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
      ]
    },
  ];

  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const categorias = ['TODOS', 'HOMBRE', 'MUJER', 'TECH'];

  const producto = productos[productoSeleccionado];
  const variante = producto.variantes[colorSeleccionado];
  const coloresDisponibles = producto.variantes;

  const productosFiltrados = categoriaActiva === 'TODOS'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={logoUrl} alt="MEGA-STORE" style={{ height: '28px' }} />
            <nav style={{ display: isMobile? 'none' : 'flex', gap: '25px', fontSize: '13px', fontWeight: '600' }}>
              {categorias.map(cat => (
                <span key={cat} onClick={() => {setCategoriaActiva(cat); setProductoSeleccionado(0); setColorSeleccionado(0);}} style={{cursor: 'pointer', color: categoriaActiva === cat? '#4a9eff' : 'white', textTransform: 'uppercase'}}>{cat}</span>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => setMenuAbierto(!menuAbierto)} style={{ display: isMobile? 'block' : 'none', backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>☰</button>
            <span style={{ fontSize: '13px', cursor: 'pointer' }}>🛒</span>
          </div>
        </div>

        {menuAbierto && isMobile && (
          <div style={{ paddingTop: '15px', borderTop: '1px solid #333', marginTop: '12px' }}>
            {categorias.map(cat => (
              <div key={cat} onClick={() => {setCategoriaActiva(cat); setProductoSeleccionado(0); setColorSeleccionado(0); setMenuAbierto(false);}} style={{padding: '10px 0', cursor: 'pointer', color: categoriaActiva === cat? '#4a9eff' : 'white', fontWeight: '600', fontSize: '14px'}}>{cat}</div>
            ))}
          </div>
        )}
      </header>

      <div style={{ display: 'flex', flexDirection: isMobile? 'column' : 'row', maxWidth: '1600px', margin: '0 auto', padding: isMobile? '15px 3%' : '30px 4%', gap: '20px' }}>

        {!isMobile && (
          <aside style={{ width: '260px' }}>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '15px' }}>TALLA</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '25px' }}>
                {tallas.map(talla => (<button key={talla} onClick={() => setTallaSeleccionada(talla)} style={{padding: '8px', border: tallaSeleccionada === talla? '2px solid #000' : '1px solid #ddd', backgroundColor: tallaSeleccionada === talla? '#000' : 'white', color: tallaSeleccionada === talla? 'white' : '#333', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600'}}>{talla}</button>))}
              </div>
              <h3 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '15px' }}>COLOR - {coloresDisponibles.length} opciones</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {coloresDisponibles.map((color, idx) => (<div key={idx} onClick={() => setColorSeleccionado(idx)} title={color.nombre} style={{width: '100%', aspectRatio: '1', borderRadius: '8px', backgroundColor: color.hex, border: colorSeleccionado === idx? '3px solid #4a9eff' : '2px solid #ddd', cursor: 'pointer'}} />))}
              </div>
            </div>
          </aside>
        )}

        <main style={{ flex: 1, width: '100%' }}>
          <div style={{ backgroundColor: 'white', padding: isMobile? '20px' : '40px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: isMobile? 'column' : 'row', gap: isMobile? '25px' : '50px' }}>
            <div style={{ flex: isMobile? '1' : '0 0 45%' }}>
              <img src={variante.imagen} alt={producto.nombre} style={{width: '100%', borderRadius: '8px', boxShadow: `0 0 40px ${variante.hex}40`}} />
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: isMobile? '22px' : '28px', fontWeight: '700', marginBottom: '15px', lineHeight: '1.2' }}>{producto.nombre}</h1>
              <div style={{ fontSize: isMobile? '26px' : '32px', fontWeight: '700', marginBottom: '15px' }}>S/{producto.precio}</div>
              <div style={{ marginBottom: '20px', fontSize: '18px' }}>{'★'.repeat(producto.rating).split('').map((star, i) => (<span key={i} style={{ color: '#fbbf24' }}>{star}</span>))}</div>

              {isMobile && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '10px', color: '#666' }}>TALLA</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {tallas.map(talla => (<button key={talla} onClick={() => setTallaSeleccionada(talla)} style={{padding: '8px 14px', border: tallaSeleccionada === talla? '2px solid #000' : '1px solid #ddd', backgroundColor: tallaSeleccionada === talla? '#000' : 'white', color: tallaSeleccionada === talla? 'white' : '#333', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600'}}>{talla}</button>))}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', color: '#666' }}>COLOR: {variante.nombre.toUpperCase()}</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {coloresDisponibles.map((color, idx) => (<div key={idx} onClick={() => setColorSeleccionado(idx)} title={color.nombre} style={{width: '45px', height: '45px', borderRadius: '8px', backgroundColor: color.hex, border: colorSeleccionado === idx? '3px solid #000' : '2px solid #ddd', cursor: 'pointer'}} />))}
                </div>
              </div>

              <button onClick={comprarWhatsApp} style={{width: '100%', backgroundColor: variante.hex, color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', marginBottom: '15px', textTransform: 'uppercase'}}>AÑADIR AL CARRITO</button>

              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#666' }}>
                <div>🚚 ENVÍO GRATIS</div>
                <div>↩️ DEVOLUCIÓN FÁCIL</div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: isMobile? '20px' : '30px', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>{categoriaActiva === 'TODOS'? 'TODOS LOS PRODUCTOS' : categoriaActiva}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
              {productosFiltrados.map((prod, idx) => (<div key={prod.id} onClick={() => {setProductoSeleccionado(productos.indexOf(prod)); setColorSeleccionado(0); window.scrollTo({ top: 0, behavior: 'smooth' });}} style={{border: productoSeleccionado === productos.indexOf(prod)? '2px solid #4a9eff' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer'}}><img src={prod.variantes[0].imagen} alt={prod.nombre} style={{ width: '100%', height: isMobile? '180px' : '250px', objectFit: 'cover' }} /><div style={{ padding: '12px' }}><div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>{prod.nombre}</div><div style={{ fontSize: '16px', fontWeight: '700' }}>S/{prod.precio}</div><div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>{prod.variantes.length} colores</div></div></div>))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
