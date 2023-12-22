import { Link, useLocation } from "react-router-dom";
import bugLogo from '../assets/bug-logo.svg'


export function Header ({ page }) {
    const location = useLocation();



    return (
       <header className="header-container">
            <nav className="container">
                <ul className="nav-list">
                    <li className="nav-item"><Link to={"/"}> <img width="45" height="45" src={bugLogo} alt="Logo" /> </Link></li>
                    <ul>
                        <li className="nav-item">
                            <Link to={"/"} className={location.pathname === '/' ? 'selected' : '' }>Inicio</Link>
                        </li>
                        <li className="nav-item selected">
                            <Link to={"/products"} className={location.pathname === '/products' ? 'selected' : '' }>Productos</Link>
                        </li>
                        <li className="nav-item" >
                            <Link to={"/users"} className={location.pathname === '/users' ? 'selected' : '' }>Usuarios</Link>
                            
                        </li>
                    </ul>

                    <li className="nav-item">Analytics Dashboard</li>
                </ul>
            </nav>
       </header>
    )
}

