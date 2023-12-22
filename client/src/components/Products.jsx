import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function Products () {
    const [products, setProducts] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => setProducts(data.data.products))
    }, [])

    return (
        <>
            <Header page="selected"></Header>
            <main className='container main'>
                <h1 className='table-title'>Tabla de Productos:</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.map((product, i) => 
                                <tr key={product.product.name + i}>
                                    <td>{product.product.id}</td>
                                    <td>{product.product.name}</td>
                                    <td><img src={"http://localhost:3000/images/products/" + product.product["product_detail"][0].images[0].name} alt="" /></td>
                                    <td>${product.product["product_detail"][0].price}</td>
                                    <td>{product.product.category.name}</td>
                                    <td>{product.product.description}</td>

                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </main>
            <Footer></Footer>
        </>
    )
}