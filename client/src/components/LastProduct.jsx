// import { useEffect, useState } from "react";

export function LastProduct ({name}) {
    // const [product, setProduct] = useState()
    // useEffect(() => {

    //     fetch("http://localhost:3000/api/products")
    //     .then(res => res.json)
    //     .then(data => {
    //         console.log(data.products[data.products.length - 1])
    //         setProduct((data.products[data.products.length - 1]))
    //     })
    //     .catch(error => {
    //         console.error('Error al obtener datos de la API:', error);
    //     })
    
    // }, [])

    return (
        <div>
            <h1>ultimo {name}</h1>
            <img width="200px" height="250px" src="https://live.staticflickr.com/3066/2514014660_84d192ba77_b.jpg" alt="" />
        </div>
    )


}