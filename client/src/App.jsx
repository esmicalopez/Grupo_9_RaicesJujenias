import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
import { CategoryTable } from './components/CategoryTable'

import { useEffect, useState } from 'react'

function App() {
  const [productData, setProductData] = useState()
  const [userData, setUserData] = useState()


  useEffect(() => {
    fetch(`http://localhost:3000/api/products`)
    .then(res => res.json())
    .then(data => setProductData(data.data))
    .catch(error => {
        console.error('Error al obtener datos de la API:', error);
  })

  }, [])

  useEffect(() => {
    fetch(`http://localhost:3000/api/users`)
    .then(res => res.json())
    .then(data => setUserData(data))
    .catch(error => {
        console.error('Error al obtener datos de la API:', error);
  })
  }, [])

  return (
    <>
      <Header></Header>

      { productData && userData && <Main productData={productData} userData={userData}></Main> }

      <aside className='aside container'>
        <CategoryTable></CategoryTable>
      </aside>

      <Footer></Footer>

    </>
  )
}

export default App
