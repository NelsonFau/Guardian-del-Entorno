import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Para usar dispatch
import { setUser } from '../../estadoUser';
import './styleLoginUser.css'


const LoginUser = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            console.log('Por favor, complete todos los campos.');
            return;
        }
        
        const datos = {
            'email': email,
            'password' : password
        }

        try {
            const sendApi = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
    
            const data = await sendApi.json(); // Si el servidor responde con JSON
            if (data.isValid && data.user) {
                console.log("Login exitoso!!");
                dispatch(setUser(data.user));
            } else {
                console.log("Credenciales incorrectas");
            }

        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }
    

    return (
        <div className="containerLogin d-flex justify-content-center align-items-center vh-100">
            <form className='formularioLogin' onSubmit={handleLogin}>
            <h2 className="titleLogin text-center mb-3">Iniciar Sesión</h2>
                <div className="mb-3">
                    <label className="formularioLogin-label">Usuario</label>
                    <input
                        type="email"
                        className="formularioLogin-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="formularioLogin-label">Contraseña</label>
                    <input
                        type="password"
                        className="formularioLogin-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="formularioLogin-btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
    );
}

export default LoginUser;
