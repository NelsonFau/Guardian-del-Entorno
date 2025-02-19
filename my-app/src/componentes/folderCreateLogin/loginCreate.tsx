import React, { useState } from 'react';

function LoginCreate() {
    const [nombre, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenia, setConstrasenia] = useState('');
    const [error, setError] = useState('');

    const ButtonSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !contrasenia) {
            setError('Por favor, completa todos los campos.');
            return;
        }


        const loginData = {
            "user": {
              "Name": nombre,
              "Email": email,
              "Password": contrasenia
            },
        };
          

        try {
            const datosServer = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            
            const response = await datosServer.json(); // Si el servidor responde con JSON
            console.log('Respuesta del servidor:', response);


            console.log('Respuesta del servidor:', datosServer); // Para ver la respuesta completa
            if (datosServer.ok) {
                console.log('Registro exitoso');
            } else {
                console.log('Hubo un error al registrarse. Intenta nuevamente.');
            }
        } catch (error) {
            setError('Hubo un error con la conexión. Intenta nuevamente.');
            console.log('hubo un error', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={ButtonSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                        value={contrasenia}
                        onChange={(e) => setConstrasenia(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default LoginCreate;
