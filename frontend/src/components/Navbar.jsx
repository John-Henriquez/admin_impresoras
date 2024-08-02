import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service.js';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.data?.rolName;

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <img
                        src="/ubb-white.png"
                        alt="UBB"
                    />
                </li>
                <li className={location.pathname === "/home" ? "active" : ""}>
                    <NavLink to="/home">Inicio</NavLink>
                </li>
                {userRole === 'administrador' && (
                    <>
                        <li className={location.pathname === "/users" ? "active" : ""}>
                            <NavLink to="/users">Usuarios</NavLink>
                        </li>
                        <li className={location.pathname === "/devices" ? "active" : ""}>
                            <NavLink to="/devices">Dispositivos</NavLink>
                        </li>
                        <li className={location.pathname === "/prints" ? "active" : ""}>
                            <NavLink to="/prints">Prints</NavLink>
                        </li>
                        <li className={location.pathname === "/supplies" ? "active" : ""}>
                            <NavLink to="/supplies">Suministros</NavLink>
                        </li>
                    </>
                )}
                <li className={location.pathname === "/profile" ? "active" : ""}>
                    <NavLink to="/profile">Perfil</NavLink>
                </li>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
