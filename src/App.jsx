import { useState, useEffect } from 'react'

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('tienda');
  const [categoriaActiva, setCategoriaActiva] = useState('TODOS');
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);
  const [colorSeleccionado, setColorSeleccionado] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('M');
  const [carrito, setCarrito] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "NEXUS INSULATED TECHNICAL PARKA",
      precio: 189.99,
      categoria: "HOMBRE",
      rating: 5,
      vendedor: "Tienda NEXUS",
      whatsappVendedor: "51934799890",
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
      vendedor: "María Store",
      whatsappVendedor: "51987654321",
      variantes: [
        { nombre: 'Beige', hex: '#d4c5b9', imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" },
        { nombre: 'Pink', hex: '#f9a8d4', imagen: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" },
      ]
    },
  ]);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    categoria: 'HOMBRE',
    whatsappVendedor: '',
    vendedor: '',
    imagen: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const userGuardado = localStorage.getItem('nexusUser');
    const carritoGuardado = localStorage.getItem('nexusCarrito');
    if (userGuardado) setUsuario(JSON.parse(userGuardado));
    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('nexusCarrito', JSON.stringify(carrito));
  }, [carrito]);

  const loginGoogle = () => {
    const userFake = { nombre: 'Frank Nexus', email: 'frank@gmail.com', foto: 'https://i.pravatar.cc/40' };
    setUsuario(userFake);
    localStorage.setItem('nexusUser', JSON.stringify(userFake));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('nexusUser');
    setVista('tienda');
  };

  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const categorias = ['TODOS', 'HOMBRE', 'MUJER', 'TECH'];

  const producto = productos[productoSeleccionado];
  const variante = producto?.variantes[colorSeleccionado];
  const coloresDisponibles = producto?.variantes || [];

  const productosFiltrados = categoriaActiva === 'TODOS'
  ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  const añadirCarrito = () => {
    if (!usuario) return alert('Inicia sesión primero');
    const item = {
      id: Date.now(),
      productoId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      talla: tallaSeleccionada,
      color: variante.nombre,
      imagen: variante.imagen,
      vendedor: producto.vendedor,
      whatsappVendedor: producto.whatsappVendedor
    };
    setCarrito([...carrito, item]);
    alert('Añadido al carrito');
  };

  const comprarWhatsApp = (item) => {
    const prod = item || { nombre: producto.nombre, precio: producto.precio, whatsappVendedor: producto.whatsappVendedor };
    const mensaje = `Hola ${prod.vendedor || 'vendedor'}! Quiero comprar: ${prod.nombre} - Color: ${item?.color || variante.nombre} - Talla: ${item?.talla || tallaSeleccionada} - S/${prod.precio}`;
    window.open(`https://wa.me/${prod.whatsappVendedor}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const subirProducto = () => {
    if (!nuevoProducto.nombre ||!nuevoProducto.precio ||!nuevoProducto.whatsappVendedor) {
      return alert('Completa nombre, precio y WhatsApp');
    }
    const productoNuevo = {
      id: Date.now(),
      nombre: nuevoProducto.nombre,
      precio: parseFloat(nuevoProducto.precio),
      categoria: nuevoProducto.categoria,
      rating: 5,
      vendedor: nuevoProducto.vendedor || usuario?.nombre || 'Vendedor',
      whatsappVendedor: nuevoProducto.whatsappVendedor,
      variantes: [
        { nombre: 'Default', hex: '#000000', imagen: nuevoProducto.imagen || "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" }
      ]
    };
    setProductos([...productos, productoNuevo]);
    setNuevoProducto({ nombre: '', precio: '', categoria: 'HOMBRE', whatsappVendedor: '', vendedor: '', imagen: '' });
    setVista('tienda');
    alert('Producto publicado');
  };

  const logoUrl = "https://i.imgur.com/eHpe6iN.png";

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#000', color: 'white', padding: '12px 4%', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={logoUrl} alt="NEXUS" style={{ height: '28px', cursor: 'pointer' }} onClick={() => setVista('tienda')} />
            <nav style={{ display: isMobile? 'none' : 'flex', gap: '25px', fontSize: '13px', fontWeight: '600' }}>
              {categorias.map(cat => (
                <span key={cat} onClick={() => {setCategoriaActiva(cat); setVista('tienda'); setProductoSeleccionado(0);}}
                  style={{cursor: 'pointer', color: categoriaActiva === cat && vista === 'tienda'? '#4a9eff' : 'white', textTransform: 'uppercase'}}>{cat}</span>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => setMenuAbierto(!menuAbierto)} style={{ display: isMobile? 'block' : 'none', backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>☰</button>
            <span onClick={() => setVista('carrito')} style={{ fontSize: '13px', cursor: 'pointer', position: 'relative' }}>🛒 {carrito.length > 0 && <span style={{position:'absolute',top:'-8px',right:'-8px',backgroundColor:'#ef4444',borderRadius:'50%',width:'16px',height:'16px',fontSize:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>{carrito.length}</span>}</span>
            {usuario? (
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <img src={usuario.foto} style={{width:'28px',height:'28px',borderRadius:'50%'}} />
                <span onClick={logout} style={{fontSize:'12px',cursor:'pointer'}}>Salir</span>
              </div>
            ) : (
              <button onClick={loginGoogle} style={{backgroundColor:'#4a9eff',border:'none',color:'white',padding:'6px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Entrar con Google</button>
            )}
          </div>
        </div>

        {menuAbierto && isMobile && (
          <div style={{ paddingTop: '15px', borderTop: '1px solid #333', marginTop: '12px' }}>
            {categorias.map(cat => (
              <div key={cat} onClick={() => {setCategoriaActiva(cat); setVista('tienda'); setMenuAbierto(false);}}
                style={{padding: '10px 0', cursor: 'pointer', color: categoriaActiva === cat? '#4a9eff' : 'white', fontWeight: '600', fontSize: '14px'}}>{cat}</div>
            ))}
            <div onClick={() => {setVista('vender'); setMenuAbierto(false);}} style={{padding: '10px 0', cursor: 'pointer', color: '#4a9eff', fontWeight: '600', fontSize: '14px'}}>VENDER PRODUCTO</div>
            {usuario && <div onClick={() => {setVista('carrito'); setMenuAbierto(false);}} style={{padding: '10px 0', cursor: 'pointer', fontSize: '14px'}}>MI CARRITO</div>}
          </div>
        )}
      </header>

      {vista === 'tienda' && producto && (
        <div style={{ display: 'flex', flexDirection: isMobile? 'column' : 'row', maxWidth: '1600px', margin: '0 auto', padding: isMobile? '15px 3%' : '30px 4%', gap: '20px' }}>
          {!isMobile && (
            <aside style={{ width: '260px' }}>
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '15px' }}>TALLA</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '25px' }}>
                  {tallas.map(talla => (<button key={talla} onClick={() => setTallaSeleccionada(talla)} style={{padding: '8px', border: tallaSeleccionada === talla? '2px solid #000' : '1px solid #ddd', backgroundColor: tallaSeleccionada === talla? '#000' : 'white', color: tallaSeleccionada === talla? 'white' : '#333', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600'}}>{talla}</button>))}
                </div>
                <button onClick={() => setVista('vender')} style={{width:'100%',backgroundColor:'#000',color:'white',border:'none',padding:'12px',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'12px',marginBottom:'10px'}}>VENDER PRODUCTO</button>
                {usuario && <button onClick={() => setVista('carrito')} style={{width:'100%',backgroundColor:'white',color:'#000',border:'2px solid #000',padding:'12px',borderRadius:'8px',fontWeight:'700',cursor:'pointer',fontSize:'12px'}}>MI CARRITO</button>}
              </div>
            </aside>
          )}

          <main style={{ flex: 1, width: '100%' }}>
            <div style={{ backgroundColor: 'white', padding: isMobile? '20px' : '40px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: isMobile? 'column' : 'row', gap: isMobile? '25px' : '50px' }}>
              <div style={{ flex: isMobile? '1' : '0 0 45%' }}>
                <img src={variante.imagen} alt={producto.nombre} style={{width: '100%', borderRadius: '8px', boxShadow: `0 0 40px ${variante.hex}40`}} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{fontSize:'11px',color:'#666',marginBottom:'8px'}}>Vendido por: {producto.vendedor}</div>
                <h1 style={{ fontSize: isMobile? '22px' : '28px', fontWeight: '700', marginBottom: '15px', lineHeight: '1.2' }}>{producto.nombre}</h1>
                <div style={{ fontSize: isMobile? '26px' : '32px', fontWeight: '700', marginBottom: '15px' }}>S/{producto.precio}</div>
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>{'★'.repeat(producto.rating).split('').map((star, i) => (<span key={i} style={{ color: '#fbbf24' }}>{star}</span>))}</div>

                {isMobile && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '10px', color: '#666' }}>TALLA</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {tallas.map(talla => (<button key={talla} onClick={() => setTallaSeleccionada(talla)} style={{padding: '8px 14px', border: tallaSeleccionada === talla? '2px solid #000' : '1px solid #ddd', backgroundColor: tallaSeleccionada === talla? '#000' : 'white', color: tallaSeleccionada === talla? 'white' : '#333', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600'}}>{talla}</button>))}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', color: '#666' }}>COLOR: {variante.nombre.toUpperCase()}</div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {coloresDisponibles.map((color, idx) => (<div key={idx} onClick={() => setColorSeleccionado(idx)} title={color.nombre} style={{width: '45px', height: '45px', borderRadius: '8px', backgroundColor: color.hex, border: colorSeleccionado === idx? '3px solid #000' : '2px solid #ddd', cursor: 'pointer'}} />))}
                  </div>
                </div>

                <button onClick={añadirCarrito} style={{width: '100%', backgroundColor: '#000', color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase'}}>AÑADIR AL CARRITO</button>
                <button onClick={() => comprarWhatsApp()} style={{width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', marginBottom: '15px', textTransform: 'uppercase'}}>COMPRAR POR WHATSAPP</button>

                <div style={{ fontSize: '11px', color: '#666', backgroundColor:'#f0fdf4', padding:'10px', borderRadius:'6px' }}>
                  📱 Vendedor: {producto.vendedor} - WhatsApp: {producto.whatsappVendedor}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: isMobile? '20px' : '30px', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>{categoriaActiva}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                {productosFiltrados.map((prod, idx) => (
                  <div key={prod.id} onClick={() => {setProductoSeleccionado(productos.indexOf(prod)); setColorSeleccionado(0); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                    style={{border: productoSeleccionado === productos.indexOf(prod)? '2px solid #4a9eff' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer'}}>
                    <img src={prod.variantes[0].imagen} alt={prod.nombre} style={{ width: '100%', height: isMobile? '180px' : '250px', objectFit: 'cover' }} />
                    <div style={{ padding: '12px' }}>
                      <div style={{fontSize:'10px',color:'#666'}}>Por: {prod.vendedor}</div>
                      <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', marginTop:'4px' }}>{prod.nombre}</div>
                      <div style={{ fontSize: '16px', fontWeight: '700' }}>S/{prod.precio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}

      {vista === 'vender' && (
        <div style={{maxWidth:'600px',margin:'30px auto',padding:'0 4%'}}>
          <div style={{backgroundColor:'white',padding:'30px',borderRadius:'12px'}}>
            <h2 style={{fontSize:'24px',fontWeight:'700',marginBottom:'20px'}}>Vender Producto</h2>
            {!usuario? (
              <div>
                <p style={{marginBottom:'15px'}}>Inicia sesión para vender</p>
                <button onClick={loginGoogle} style={{backgroundColor:'#4a9eff',border:'none',color:'white',padding:'12px 20px',borderRadius:'8px',fontWeight:'700',cursor:'pointer'}}>Entrar con Google</button>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'15px'}}>
                <input placeholder="Nombre del producto" value={nuevoProducto.nombre} onChange={e=>setNuevoProducto({...nuevoProducto,nombre:e.target.value})} style={{padding:'12px',border:'1px solid #ddd',borderRadius:'8px'}} />
                <input placeholder="Precio S/" type="number" value={nuevoProducto.precio} onChange={e=>setNuevoProducto({...nuevoProducto,precio:e.target.value})} style={{padding:'12px',border:'1px solid #ddd',borderRadius:'8px'}} />
                <select value={nuevoProducto.categoria} onChange={e=>setNuevoProducto({...nuevoProducto,categoria:e.target.value})} style={{padding:'12px',border:'1px solid #ddd',borderRadius:'8px'}}>
                  <option>HOMBRE</option><option>MUJER</option><option>TECH</option>
                </select>
                <input placeholder="URL de la imagen" value={nuevoProducto.imagen} onChange={e=>setNuevoProducto({...nuevoProducto,imagen:e.target.value})} style={{padding:'12px',border:'1px solid #ddd',borderRadius:'8px'}} />
                <input placeholder="Tu nombre de vendedor" value={nuevoProducto.vendedor} onChange={e=>setNuevoProducto({...nuevoProducto,vendedor:e.target.value})} style={{padding:'12px',border:'1px solid #ddd',borderRadius:'8px'}} />
                <input placeholder="Tu WhatsApp: 51999999999" value={nuevoProducto.whatsappVendedor} onChange={e=>setNuevoProducto({...nuevoProducto,whatsappVendedor:e.target.value})} style={{padding:'12px',border:'1px solid #ddd',borderRadius:'8px'}} />
                <button onClick={subirProducto} style={{backgroundColor:'#000',color:'white',border:'none',padding:'16px',borderRadius:'8px',fontWeight:'700',cursor:'pointer'}}>PUBLICAR PRODUCTO</button>
                <button onClick={()=>setVista('tienda')} style={{backgroundColor:'white',color:'#000',border:'1px solid #ddd',padding:'12px',borderRadius:'8px',cursor:'pointer'}}>Volver</button>
              </div>
            )}
          </div>
        </div>
      )}

      {vista === 'carrito' && (
        <div style={{maxWidth:'800px',margin:'30px auto',padding:'0 4%'}}>
          <div style={{backgroundColor:'white',padding:'30px',borderRadius:'12px'}}>
            <h2 style={{fontSize:'24px',fontWeight:'700',marginBottom:'20px'}}>Mi Carrito</h2>
            {carrito.length === 0? <p>Carrito vacío</p> : (
              <div style={{display:'flex',flexDirection:'column',gap:'15px'}}>
                {carrito.map(item => (
                  <div key={item.id} style={{display:'flex',gap:'15px',border:'1px solid #eee',padding:'15px',borderRadius:'8px'}}>
                    <img src={item.imagen} style={{width:'80px',height:'80px',objectFit:'cover',borderRadius:'6px'}} />
                    <div style={{flex:1}}>
                      <div style={{fontWeight:'600'}}>{item.nombre}</div>
                      <div style={{fontSize:'12px',color:'#666'}}>Talla: {item.talla} | Color: {item.color}</div>
                      <div style={{fontSize:'12px',color:'#666'}}>Vendedor: {item.vendedor}</div>
                      <div style={{fontWeight:'700',marginTop:'5px'}}>S/{item.precio}</div>
                    </div>
                    <button onClick={()=>comprarWhatsApp(item)} style={{backgroundColor:'#25D366',color:'white',border:'none',padding:'10px 15px',borderRadius:'6px',cursor:'pointer',height:'fit-content'}}>WhatsApp</button>
                  </div>
                ))}
                <button onClick={()=>setCarrito([])} style={{backgroundColor:'#ef4444',color:'white',border:'none',padding:'12px',borderRadius:'8px',cursor:'pointer'}}>Vaciar Carrito</button>
              </div>
            )}
            <button onClick={()=>setVista('tienda')} style={{backgroundColor:'white',color:'#000',border:'1px solid #ddd',padding:'12px',borderRadius:'8px',cursor:'pointer',marginTop:'15px',width:'100%'}}>Seguir Comprando</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
