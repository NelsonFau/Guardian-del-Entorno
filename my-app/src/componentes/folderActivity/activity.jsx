import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ListarActividades =()=>{
    useEffect(() => {
        fetchActividades(page);
    }, []);
    const user = useSelector((state)=> state.user)
    const [actividades, setActividades] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSize = 10;
    const [actividadesSeleccionadas, setActividadesSeleccioandas] = useState(null); 
    const [editarForm, setEditarForm] = useState({
        userId:"",
        naturalAreaId: "",
        description: "",
        date: "",
    });
    
    const fetchActividades = async (pageNumber)=>{
        setLoading(true);
        try{
            const respuesta = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/byUser?secret=TallerReact2025!&userId=${user?.id}&page=${pageNumber}&pageSize=${pageSize}',
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
                setTotalRecords(data.totalRecords || 0);
            } else {
                setError('No se encontraron actividades de conserva');
            }
        } catch (error) {
            console.error(Error `al encontrar actividades de conserva ${error}`);
        } finally {
            setLoading(false)
        };
        
    }
    return(
        <div>
        <h2>Actividades de Conservación</h2>
        {actividades.length > 0 ? (
            <ul>
            {actividades.map((actividad) => (
                <li key={actividad.id}>
                <strong>Descripción:</strong> {actividad.description} <br />
                <strong>Fecha:</strong> {new Date(actividad.date).toLocaleDateString()} <br />
                </li>
            ))}
            </ul>
        ) : (
            <p>No hay actividades registradas para este usuario.</p>
        )}
        </div>
    )
}
export default ListarActividades;