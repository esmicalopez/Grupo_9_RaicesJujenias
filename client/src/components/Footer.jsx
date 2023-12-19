import logo from '../assets/logo.svg'
import githubLogo from '../assets/github-logo.svg'


export function Footer () {
    const programmers = [
        {
            github: "https://github.com/Luc4sRamos",
            name: "Lucas Ramos",
            username: "Luc4sRamos"
        },
        {
            github: "https://github.com/zrCristian",
            name: "Cristian Zamora",
            username: "zrCristian"
        }
    ]
    
    return (
        <footer className="footer-container">
            <div className="container footer-wrapper">
                <div className="footer-logo">
                    <a href="http://localhost:3000/" className="logo">
                        <span>Nuestra Proyecto: </span>
                        <img src={logo} width="160" height="40" alt="Raices Jujeñas Logo"/>
                    </a>
                </div>

                <div className="members">
                    <span>Intregrantes: </span>
                    <ul className="member-list">
                        {
                            programmers.map(({github, name}) => 
                                <li key={github} className='member-item'> 
                                    <img src={githubLogo} alt="github-logo" />
                                    <a href={github} target="_blank" rel="noreferrer">{name}</a> 
                                </li>)
                        }
                    </ul>
                </div>
            </div>  
        </footer>
    )
}

