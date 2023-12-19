import { useState } from 'react'
import { LastData } from './LastData'
import { Card } from './Card'

export function Main () {
    const [data, setData] = useState([{ name: "products", total: 51 }, { name: "genres", total: 7 }, { name: "users", total: 12 }]) 
    return (
        <main className='container main'>

            <section className='data-info-list'>
                {
                    data.map( ({name, total}) => <Card key={name} name={name} total={total}></Card>)
                }
            </section>

            <section className='last-data'>
                <LastData name="products"></LastData>
                <LastData name="users"></LastData>
            </section>
        </main>
    )
}