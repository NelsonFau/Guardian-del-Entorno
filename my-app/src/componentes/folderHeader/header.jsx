import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../estadoUser';



const Header = () => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Guardianes del Entorno</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {user ? (
                    < >    
                        <li className="row nav-item">
                        <span className="nav-link text-white">Hola, {user.name}</span>
                        </li>
                        <li className="nav-item">
                        <button className="btn btn-danger" onClick={() => dispatch(logout())}>Cerrar sesión</button>
                        </li>
                    </>
                    ) : (
                    <li className="nav-item">
                        <span className="nav-link text-white">Inicia sesión</span>
                    </li>
                )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
