import { useEffect, useState } from "react";

export function LastDataCard ({cardName, image, name, info, email, price, offer}) {
    const [actualPrice, setActualPrice] = useState(price)

    useEffect(() => {
        if(offer) {
            const priceWithDiscount = price - (price * (offer / 100))
            setActualPrice(priceWithDiscount)
        }
    }, [])

    return (
        <div>
            <span>Ultimo {cardName}</span>
                <figure>
                    <img src={`http://localhost:3000${image}`} alt={name} />
                </figure>
                <span>{name}</span>

                <div className="email-and-price-container">
                    {
                        email && <span>{email}</span>
                    }

                    {
                        offer && <del className="old-price">${price}</del>
                    }

                    {
                        price && <span className="price">${actualPrice}</span>
                    }
                </div>
        </div>
    )
}