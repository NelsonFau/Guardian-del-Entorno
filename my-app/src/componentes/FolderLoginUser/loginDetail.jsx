import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";


const DetailsUser = () => {
    const user = useSelector((state) => state.user)
    const [areas, setAreas] = useState([]);
    const [species, setSpecies] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const pageSize = 10;
    const [page, setPage] = useState(1);


    const fetchAreas = async () => {
        setLoading(true)
        console.log(user)
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/byUser?userId=${user?.id}&page=1&pageSize=100`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': "application/json",
                        "ngrok-skip-browser-warning": "true",
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }

            const data = await response.json();

            if (data.items) {
                
                setAreas((prevAreas) => {
                    const updatedAreas = [...prevAreas, ...data.items];
                    const uniqueAreas = Array.from(new Map(updatedAreas.map(area => [area.id, area])).values());
                    return uniqueAreas;
                });
        
            } else {
                setError("No se encontraron áreas naturales.");
            }
        } catch (error) {
            console.error("Error al obtener áreas naturales:", error);
            setError("Error al obtener las áreas naturales. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }
        
    const fetchSpecies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/byUser?userId=${user?.id}&page=1&pageSize=100`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': "application/json",
                        "ngrok-skip-browser-warning": "true",
                    }
                }
            )
             
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            const data = await response.json();

            console.log(data);

            if (data.items) {
                setSpecies((prevSpecies) => {
                    const updateSpecies = [...prevSpecies, ...data.items];
                    const uniqueSpecies = Array.from(new Map(updateSpecies.map(species => [species.id, species])).values());
                    return uniqueSpecies;
                });
            } else {
                setError('No se encontraron especies');
            }
        } catch (error) {
            console.error(`Error al encontrar especies ${error}`);
        } finally {
            setLoading(false)
        };
        
    }

    const fetchActividades = async () => {
        setLoading(true);
        try {
            const respuesta = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/byUser?userId=${user?.id}&page=1&pageSize=100`,

               {
                    method: 'GET',
                    headers: {
                        'Content-type': "application/json",
                        "ngrok-skip-browser-warning": "true",
                    }
                }
            )
            
            const data = await respuesta.json();

            console.log(data);

            if (data.items) {
                setActividades((prevActividades) => {
                    const updateActividades = [...prevActividades, ...data.items];
                    const uniqueActividades = Array.from(new Map(updateActividades.map(actividades => [actividades.id, actividades])).values());
                    return uniqueActividades;
                });
            } else {
                setError('No se encontraron actividades de conserva');
            }
        } catch (error) {
            console.error(`Error al encontrar actividades de conserva ${error}`);
        } finally {
            setLoading(false)
        };
    }
    useEffect(() => {
        if (user?.id) {
            fetchAreas();
            fetchSpecies();
            fetchActividades();
        }
    }, [user, page]); 
    

    return (
        <section className="user-details">
            <h2>Datos del Usuario</h2>
            {loading && <p>Cargando...</p>}
            {error && <p className="error">{error}</p>}

            <div className="user-data-section">
                <h3>🌿 Áreas Naturales</h3>
                <ul>
                    {areas.length > 0 ? areas.map(area => (
                        <li key={area.id}>{area.name}</li>
                    )) : <p>No hay áreas registradas.</p>}
                </ul>
            </div>

            <div className="user-data-section">
                <h3>🦎 Especies</h3>
                <ul>
                    {species.length > 0 ? species.map(specie => (
                        <li key={specie.id}>{specie.commonName}</li>
                    )) : <p>No hay especies registradas.</p>}
                </ul>
            </div>

            <div className="user-data-section">
                <h3>⚡ Actividades de Conservación</h3>
                <ul>
                    {actividades.length > 0 ? actividades.map(actividad => (
                        <li key={actividad.id}>{actividad.description}</li>
                    )) : <p>No hay actividades registradas.</p>}
                </ul>
            </div>
        </section>
    );
    }

    export default DetailsUser;