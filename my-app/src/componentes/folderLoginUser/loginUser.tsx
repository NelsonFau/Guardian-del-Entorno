import React, { useState } from 'react'

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const buttonSend = async (e) => {
        e.preventDefault();

        const datos = {
                'email': email,
                'password': password
        }

        const sendApi = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        
        const response = await sendApi.json(); // Si el servidor responde con JSON
        console.log('Respuesta del servidor:', response);
        console.log('Respuesta del servidor:', sendApi); // Para ver la respuesta completa

        if (sendApi.ok) {
            console.log('Registro exitoso');
        } else {
            console.log('Hubo un error al registrarse. Intenta nuevamente.');
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={buttonSend}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );


};

export default LoginUser;