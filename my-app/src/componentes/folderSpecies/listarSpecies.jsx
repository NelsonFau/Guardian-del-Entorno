import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Species = () => {
    const user = useSelector((state)=> state.user)
    const [species, setSpecies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSize = 10;
    const [selectedSpecies, setSelectedSpecies] = useState(null); 
    const [editForm, setEditForm] = useState({
        id:"",
        commonName: "",
        scientificName: "",
        category: "",
        conservationStatus: "",
        naturalAreaId: "", 
    });

    const fetchSpecies = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/list?secret=TallerReact2025!&userId=${user?.id}&page=${pageNumber}&pageSize=${pageSize}`,
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
                setTotalRecords(data.totalRecords || 0);
            } else {
                setError('No se encontraron especies');
            }
        } catch (error) {
            console.error(`Error al encontrar especies ${error}`);
        } finally {
            setLoading(false)
        };
        
    }

    const DeleteCard = async (speciesId) => {
        
        if (!user?.id || !speciesId) {
            console.error("Error: user.id o speciesId están indefinidos.");
            alert("No se puede eliminar la especie porque falta información.");
            return;
        }
    
        const consulta =
        {
            userId: user?.id,
            speciesId: speciesId,
        }
        
    
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/species/delete?secret=TallerReact2025!`, 
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(consulta),
                }
            );
    
            console.log("Respuesta del servidor:", response);
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
            console.log("Respuesta JSON:", data);
    
            if (data.result === true) {
                setSpecies((prevSpecies) => prevSpecies.filter(specie => specie.id !== speciesId));
                alert("Especie eliminada correctamente");
            } else {
                alert("Error al eliminar la especie: La API no devolvió un resultado exitoso.");
            }
        } catch (error) {
            console.error("Error en la solicitud DELETE:", error);
            alert("Ocurrió un error al eliminar la especie.");
        }
    };
    

    useEffect(() => {
        fetchSpecies(page);
    }, []);
    
    const handleLoadMore = () => {
        if (species.length >= totalRecords) return;

        const nextPage = page + 1;
        setPage(nextPage);
        fetchSpecies(nextPage);
    };

    const handleUpdate = async () => {
        const url = "https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!";
    
        const requestBody = {
            userId: user?.id, 
            Species: { 
                ...editForm  
            }
        };
        
    
        console.log("Enviando datos para actualizar:", requestBody);
    
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Respuesta de la API:", data); 
    
            if (data.result === true) {
                alert("Área actualizada correctamente");
    
                setSpecies((prevAreas) =>
                    prevAreas.map(species =>
                        species.id === editForm.id ? { ...editForm } : species
                    )
                );
    
                setSelectedSpecies(null);
            } else {
                alert("Error al actualizar el área. La API devolvió un resultado inesperado.");
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
            alert("Ocurrió un error al actualizar el área.");
        }
    };

    const handleEdit = (species) => {
        setSelectedSpecies(species);
        setEditForm({
            id: species.id,
            commonName: species.commonName,
            scientificName: species.scientificName,
            category: species.category,
            conservationStatus: species.conservationStatus,
            naturalAreaId: species.naturalAreaId, 
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Especies </h2>
    
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {loading && <p className="text-center">Cargando...</p>}
    
                    <div className="row">
                        {species.map((species) => (
                            <div key={species.id} className="col-12 col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="mb-1">{species.commonName}</h5>
                                        <p className="text-muted">{species.scientificName}</p>
                                        <p><strong>id:</strong> {species.id}</p>
                                        <p><strong>Categoría:</strong> {species.category}</p>
                                        <p><strong>Estado de conservación:</strong> {species.conservationStatus}</p>
                                        <p><strong>Area Natural:</strong> {species.naturalAreaId}</p>
                                        <button 
                                            className="btn btn-primary btn-sm mt-2"
                                            onClick={() => handleEdit(species)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="btn btn-danger mt-3 w-100"
                                            onClick={() => DeleteCard(species.id)}
                                            >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        ))}

                    </div>

                    {selectedSpecies && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Editar Área Natural</h5>
                                        <button type="button" className="close" onClick={() => setSelectedSpecies(null)}>×</button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mb-2" placeholder="Nombre" value={editForm.commonName} onChange={(e) => setEditForm({ ...editForm, commonName: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Nombre Cientifico" value={editForm.scientificName} onChange={(e) => setEditForm({ ...editForm, scientificName: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Categoria" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Estado de Conservación" value={editForm.conservationStatus} onChange={(e) => setEditForm({ ...editForm, conservationStatus: e.target.value })} />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setSelectedSpecies(null)}>Cancelar</button>
                                        <button className="btn btn-success" onClick={handleUpdate}>Guardar cambios</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                        



                    {species.length < totalRecords && (
                        <button 
                            onClick={handleLoadMore} 
                            className="btn btn-secondary w-100 mt-3"
                            disabled={loading}
                        >
                            {loading ? "Cargando más..." : "Ver más"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Species;