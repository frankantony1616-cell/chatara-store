function App(){
  const numeroWhatsApp = "51934799890";
  
  const productos=[
    {id:1, nombre:"Polo Perú 🇵🇪", precio:49.90, foto:"https://i.imgur.com/8QZq3mT.jpg", stock: 10},
    {id:2, nombre:"Zapatillas Urban", precio:199.90, foto:"https://i.imgur.com/9Y8v2nP.jpg", stock: 5},
    {id:3, nombre:"Gorra MEGA", precio:29.90, foto:"https://i.imgur.com/5X6w3kL.jpg", stock: 15}
  ]

  const comprar = (producto) => {
    const mensaje = `Hola! Quiero comprar: ${producto.nombre} de MEGASTORE 🔥 ¿Hay stock?`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
  }

  return(
    <div style={{padding:'20px', fontFamily:'Arial'}}>
      <h1 style={{color:'#0066FF', textAlign:'center', fontWeight:900}}>
        <span style={{
          background: 'linear-gradient(135deg, #0066FF 0%, #7B2FFF 50%, #FF0044 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          MEGASTORE
        </span>
      </h1>
      <p style={{textAlign:'center', color:'#666'}}>Tu tienda de Ropa y Tecnología en Ica 🇵🇪</p>
      
      <h2 style={{textAlign:'center', marginTop:'30px'}}>PRODUCTOS DESTACADOS</h2>
      
      <div style={{display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center', marginTop:'20px'}}>
        {productos.map(p=>(
          <div key={p.id} style={{
            border:'1px solid #e0e0e0', 
            borderRadius:'15px', 
            padding:'15px', 
            width:'280px',
            boxShadow:'0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <img src={p.foto} alt={p.nombre} style={{
              width:'100%', 
              height:'200px', 
              objectFit:'cover', 
              borderRadius:'10px'
            }}/>
            <h3 style={{margin:'15px 0 5px 0'}}>{p.nombre}</h3>
            <p style={{
              fontSize:'24px',
              fontWeight:900,
              background: 'linear-gradient(135deg, #0066FF 0%, #7B2FFF 50%, #FF0044 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin:'10px 0'
            }}>
              S/ {p.precio}
            </p>
            <div style={{
              background:'#FFF3E0', 
              padding:'8px', 
              borderRadius:'6px', 
              fontSize:'12px',
              marginBottom:'10px'
            }}>
              🔥 Solo quedan {p.stock} unidades
            </div>
            <button 
              style={{
                background:'linear-gradient(135deg, #0066FF 0%, #7B2FFF 50%, #FF0044 100%)',
                color:'white',
                border:'none',
                padding:'12px',
                width:'100%',
                borderRadius:'8px',
                fontWeight:800,
                cursor:'pointer'
              }}
              onClick={() => comprar(p)}
            >
              COMPRAR POR WHATSAPP 📱
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
