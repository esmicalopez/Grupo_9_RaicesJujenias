import { useEffect, useState } from 'react'
import { LastDataCard } from './LastDataCard'
import { Card } from './Card'

export function Main ( {productData, userData }) {
    const [lastUserData, setLastUserData] = useState()
    const [lastProductData, setLastProductData] = useState()


    useEffect(() => {
        fetch(`http://localhost:3000/api/users/${userData.count}`)
        .then(res => res.json())
        .then(data => setLastUserData(data.data))

    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/api/products`)
        .then(res => res.json())
        .then(data => {
            const count = data.data.count
            setLastProductData(data.data.products[count - 1])
        })

    }, [])

    return (
        <main className='container main'>

            <section className="">
                <h1 className='table-title'>Cantidad de Registros:</h1>
                <div className="data-info-list">
                    <Card name="Productos" total={productData.count}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 640 512"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"/></svg></Card>
                    <Card name="Categorias" total={productData.countByCategory.length}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg></Card>
                    <Card name="Usuarios" total={userData.count}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></Card>
                </div>
            </section>

            <section className='last-data-container'>
                <h1 className='table-title'>Ultimos Registros:</h1>
                <div className="last-data">
                    { 
                        lastUserData && <LastDataCard cardName="Usuario" name={`${lastUserData.name} ${lastUserData.lastName}`} email={lastUserData.email} image={lastUserData.avatar.url}></LastDataCard> 
                    }
                
                    {
                        lastProductData && <LastDataCard cardName="Producto" name={lastProductData.product.name} price={lastProductData.product["product_detail"][0].price} offer={lastProductData.product["product_detail"][0].offer} image={"/images/products/" + lastProductData.product["product_detail"][0].images[0].name}></LastDataCard>
                    }
                </div>
            </section>
        </main>
    )
}