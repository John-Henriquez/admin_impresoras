import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='main-container' style={{ height: 'auto', marginTop: '5rem' }}>
        <h1 style={{marginBottom: '-1rem'}}>Bienvenido</h1>
        <h2>Centro de fotocopiado - UBB</h2>
        <p>Seleccione una opción de las disponibles en el menú de navegación situado en la parte superior.</p>
        <img src='https://dgce.ubiobio.cl/img/logo-ubb.svg' alt='Logo UBB' style={{width: '50%'}} />
      </div>
    </>
  )
}

export default Home
