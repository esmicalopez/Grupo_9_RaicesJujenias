import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function Products () {
    const [products, setProducts] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])

    return (
        <>
            <Header></Header>
            <main>
                <table className="table">
                    <thead>
                        <tr>
                            <th >Categorías</th>
                            <th >Cantidad de productos</th>
                        </tr>
                    </thead>
                    <tbody>
             

                    </tbody>
                </table>
            </main>
            <Footer></Footer>
        </>
    )
}