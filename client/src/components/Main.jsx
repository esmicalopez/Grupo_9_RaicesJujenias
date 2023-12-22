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
        fetch(`http://localhost:3000/api/products/${productData.count}`)
        .then(res => res.json())
        .then(data => setLastProductData(data.data))

    }, [])

    console.log(lastProductData)
    console.log(lastUserData)


    return (
        <main className='container main'>



            <section className="data-info-list">
                <Card name="Productos" total={productData.count}></Card>
                <Card name="Categorias" total={productData.countByCategory.length}></Card>
                <Card name="Usuarios" total={userData.count}></Card>
            </section>

            <section className='last-data'>
                { 
                    lastUserData && <LastDataCard cardName="Usuario" name={`${lastUserData.name} ${lastUserData.lastName}`} email={lastUserData.email} image={lastUserData.avatar.url}></LastDataCard> 
                }
               
                {
                    lastProductData && <LastDataCard cardName="Producto" name={lastProductData.product.name} price={lastProductData.productDetail[0].price} offer={lastProductData.productDetail[0].offer} image={lastProductData.productDetail[0].images[0].url}></LastDataCard>
                }
            </section>
        </main>
    )
}