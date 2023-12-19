import { useEffect, useState } from "react";

export function LastData ({name}) {
    const [data, setData] = useState()
    const [dataImage, setdataImage] = useState()

    console.log(data)
    useEffect(() => {
        fetch(`http://localhost:3000/api/products`)
        .then(res => res.json())
        .then(data => {
            setData(data.data.products[data.data.products.length - 1].product);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        })
    
    }, [])

    return (
        <div>
            <span>ultimo {name} </span>
            <h2>{data.name}</h2>
            <img width="200px" height="250px"  alt="" />
        </div>
    )


}