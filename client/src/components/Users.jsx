import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function Users () {
    const [users, setUsers] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(data => setUsers(data.data))
    }, [])
    console.log(users)

    return (
        <>
            <Header></Header>
            <main className='container main'>
                <h1 className='table-title'>Tabla de usuarios:</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Imagen de Perfil</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user, i) => 
                                <tr key={user.name + i}>
                                    <td>{user.id}</td>
                                    <td>{user.name} {user.lastName}</td>
                                    <td>{user.rol}</td>
                                    <td><img src={"http://localhost:3000" + user.avatar.url} alt="" /></td>
                                    <td>{user.email}</td>


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