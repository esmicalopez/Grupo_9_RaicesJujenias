import { useEffect, useState } from "react";

export function CategoryTable () {
    const[categories, setCategories] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => setCategories(data.data.countByCategory))
    }, [])

    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th >Categorías</th>
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
    );
}