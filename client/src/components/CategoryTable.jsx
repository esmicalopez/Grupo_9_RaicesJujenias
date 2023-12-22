import { useEffect, useState } from "react";

export function CategoryTable () {
    const[categories, setCategories] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => setCategories(data.data.countByCategory))
    }, [])

    
    return (
        <>
            <h1 className='table-title'>Tabla de Categorias:</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th >Categorias</th>
                        <th >Cantidad de productos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    categories && (
                            categories.map(categorie => <tr key={categorie.name}>
                                    <td>{categorie.name}</td>
                                    <td>{categorie.totalProducts}</td>

                                </tr>)
                    )
                    }

                </tbody>
            </table>
        </>
    );
}