function App(){
const productos=[
{id:1,nombre:"Polo Perú 🇵🇪",precio:49.90,foto:"https://placehold.co/300x300/0066cc/white?text=POLO"},
{id:2,nombre:"Zapatillas",precio:199.90,foto:"https://placehold.co/300x300/ff0000/white?text=ZAPAS"},
{id:3,nombre:"Gorra",precio:29.90,foto:"https://placehold.co/300x300/000000/white?text=GORRA"}
]
return(<div style={{padding:'20px',fontFamily:'Arial'}}>
<h1 style={{color:'#0066cc',textAlign:'center'}}>MEGA STORE</h1>
<p style={{textAlign:'center'}}>Tu tienda online en Perú 🇵🇪</p>
<h2 style={{textAlign:'center',marginTop:'40px'}}>Productos</h2>
<div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginTop:'30px'}}>
{productos.map(p=>(
<div key={p.id} style={{border:'1px solid #ddd',padding:'15px',borderRadius:'10px',textAlign:'center',width:'200px'}}>
<img src={p.foto} alt={p.nombre} style={{width:'100%',borderRadius:'8px'}}/>
<h3>{p.nombre}</h3>
<p style={{fontSize:'20px',fontWeight:'bold',color:'green'}}>S/ {p.precio}</p>
<button style={{background:'#0066cc',color:'white',border:'none',padding:'10px 20px',borderRadius:'5px'}}>Comprar</button>
</div>
))}
</div>
<p style={{textAlign:'center',marginTop:'50px',color:'green',fontWeight:'bold'}}>V5.0 - AHORA SÍ SOMOS TIENDA 💪</p>
</div>)
}
export default App
