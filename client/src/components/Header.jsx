export function Header () {

    return (
       <header className="header-container">
            <nav className="container">
                <ul className="nav-list">
                    <li className="nav-item"><a href="#">LOGO</a></li>
                    <ul>
                        <li className="nav-item">Inicio</li>
                        <li className="nav-item">Productos</li>
                        <li className="nav-item">Usuarios</li>
                    </ul>

                    <li className="nav-item">Analytics Dashboard</li>
                </ul>
            </nav>
       </header>
    )
}

