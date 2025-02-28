import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const AreasNaturales = () => {
    const user = useSelector((state)=> state.user)
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSize = 10;
    const [selectedArea, setSelectedArea] = useState(null); 
    const [editForm, setEditForm] = useState({
        id: "",
        name: "",
        location: "",
        areaType: "",
        region: "",
        conservationStatus: "",
        description: "",
        imageUrl: ""
    });
    const [showSpeciesModal, setShowSpeciesModal] = useState(false);
    const [speciesForm, setSpeciesForm] = useState({
    commonName: "",
    scientificName: "",
    category: "",
    conservationStatus: "",
    naturalAreaId: "", // Esto será el área natural seleccionada para la especie
    });


    


    const fetchAreas = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&userId=${user?.id}&keyword=&areaType=&region=&conservationStatus=&page=${pageNumber}&pageSize=${pageSize}`,
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
                setTotalRecords(data.totalRecords || 0);
            } else {
                setError("No se encontraron áreas naturales.");
            }
        } catch (error) {
            console.error("Error al obtener áreas naturales:", error);
            setError("Error al obtener las áreas naturales. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdate = async () => {
        const url = "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/update?secret=TallerReact2025!";
    
        const requestBody = {
            userId: user?.id,  // Asegúrate de que este campo sea el ID correcto del usuario
            naturalArea: { 
                ...editForm  // Asegúrate de que todos los campos del formulario estén presentes
            }
        };
        
    
        console.log("Enviando datos para actualizar:", requestBody); // Verifica los datos enviados
    
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
    
            if (data.result === true && data.naturalArea) {
                alert("Área actualizada correctamente");
    
                setAreas((prevAreas) =>
                    prevAreas.map(area =>
                        area.id === editForm.id ? { ...editForm } : area
                    )
                );
    
                setSelectedArea(null);
            } else {
                alert("Error al actualizar el área. La API devolvió un resultado inesperado.");
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
            alert("Ocurrió un error al actualizar el área.");
        }
    };
    
    
    const handleDelete = async (naturalAreaId) => {
        const url =
            "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/delete?secret=TallerReact2025!";
    
        const consulta = {
            user: user?.id, 
            naturalAreaId: naturalAreaId, 
        };
    
    
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(consulta),
            });
    
            console.log("Respuesta completa:", response);

    
            const data = await response.json();
            console.log("Respuesta JSON:", data);
    
            if (data.result === true) {
                setAreas((prevAreas) => prevAreas.filter(area => area.id !== naturalAreaId));
                alert("Área eliminada correctamente");
            } else {
                alert("Error al eliminar el área: La API no devolvió un resultado exitoso.");
            }
        } catch (error) {
            console.error("Error en la solicitud DELETE:", error);
            alert("Ocurrió un error al eliminar el área.");
        }
    };

    useEffect(() => {
        fetchAreas(page);
    }, []);

    const handleLoadMore = () => {
        if (areas.length >= totalRecords) return;

        const nextPage = page + 1;
        setPage(nextPage);
        fetchAreas(nextPage);
    };

    const handleEdit = (area) => {
        setSelectedArea(area);
        setEditForm({
            id: area.id,
            name: area.name,
            location: area.location,
            areaType: area.areaType,
            region: area.region,
            conservationStatus: area.conservationStatus,
            description: area.description,
            imageUrl: area.imageUrl
        });
    };
    

    const handleOpenAddSpeciesModal = (naturalAreaId) => {
        setSpeciesForm({ ...speciesForm, naturalAreaId: naturalAreaId });
        setShowSpeciesModal(true);
    };
    
    const handleAgregarEspecie = async (formData) => {
        setLoading(true);
    
        const dataToSend = {
            userId: user?.id,
            species: {
              commonName: formData.commonName,
              scientificName: formData.scientificName,
              category: formData.category,
              conservationStatus: formData.conservationStatus,
              naturalAreaId: formData.naturalAreaId, 
            },
        };
          
          console.log("Datos a enviar:", JSON.stringify(dataToSend));
          
          // Aquí va tu código para enviar los datos (por ejemplo, con fetch)
          
        
        console.log("Datos a enviar:",(formData.naturalAreaId));


        console.log("🚀 Enviando datos a la API:", dataToSend);
    
        try {
            const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/species/insert?secret=TallerReact2025!", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();  // Captura el cuerpo de la respuesta
                console.error("Error de la API:", errorDetails);  // Imprime detalles del error
                throw new Error(`Error en la API: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Resultado:", result);
    
            if (result.result) {
                setSpeciesForm({
                    commonName: "",
                    scientificName: "",
                    category: "",
                    conservationStatus: "",
                    naturalAreaId: "",
                });
                setShowSpeciesModal(false);  // Cierra la modal al agregar la especie
            } else {
                console.log("❌ Error al crear la especie.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        } finally {
            setLoading(false);
        }
    };
    
    



    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Áreas Naturales</h2>
    
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {loading && <p className="text-center">Cargando...</p>}
    
                    <div className="row">
                        {areas.map((area) => (
                            <div key={area.id} className="col-12 col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="mb-1">{area.name}</h5>
                                        <p className="text-muted">{area.description}</p>
                                        <p><strong>Ubicación:</strong> {area.location}</p>
                                        <p><strong>Tipo:</strong> {area.areaType}</p>
                                        <p><strong>Región:</strong> {area.region}</p>
                                        <p><strong>Estado de conservación:</strong> {area.conservationStatus}</p>
                                        {area.imageUrl && (
                                            <img 
                                                src={area.imageUrl} 
                                                alt={area.name} 
                                                className="img-fluid rounded mt-2" 
                                                style={{ maxWidth: "100%", height: "auto" }}
                                            />
                                        )}
                                        {/* Botón Eliminar */}
                                        <button 
                                            className="btn btn-danger mt-3 w-100"
                                            onClick={() => handleDelete(area.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                            className="btn btn-primary btn-sm mt-2"
                                            onClick={() => handleEdit(area)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="btn btn-primary btn-sm mt-2"
                                            onClick={() => handleOpenAddSpeciesModal(area.id)}
                                        >
                                            Agregar Especie
                                        </button>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            
                    {selectedArea && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Editar Área Natural</h5>
                                        <button type="button" className="close" onClick={() => setSelectedArea(null)}>×</button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mb-2" placeholder="Nombre" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Ubicación" value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Tipo" value={editForm.areaType} onChange={(e) => setEditForm({ ...editForm, areaType: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Región" value={editForm.region} onChange={(e) => setEditForm({ ...editForm, region: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="Estado de conservación" value={editForm.conservationStatus} onChange={(e) => setEditForm({ ...editForm, conservationStatus: e.target.value })} />
                                        <textarea className="form-control mb-2" placeholder="Descripción" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                                        <input type="text" className="form-control mb-2" placeholder="URL de imagen" value={editForm.imageUrl} onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })} />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setSelectedArea(null)}>Cancelar</button>
                                        <button className="btn btn-success" onClick={handleUpdate}>Guardar cambios</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showSpeciesModal && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Agregar Especie</h5>
                                        <button type="button" className="close" onClick={() => setShowSpeciesModal(false)}>×</button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Nombre Común"
                                            value={speciesForm.commonName}
                                            onChange={(e) => setSpeciesForm({ ...speciesForm, commonName: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Nombre Científico"
                                            value={speciesForm.scientificName}
                                            onChange={(e) => setSpeciesForm({ ...speciesForm, scientificName: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Categoría"
                                            value={speciesForm.category}
                                            onChange={(e) => setSpeciesForm({ ...speciesForm, category: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Estado de Conservación"
                                            value={speciesForm.conservationStatus}
                                            onChange={(e) => setSpeciesForm({ ...speciesForm, conservationStatus: e.target.value })}
                                        />
                                        <p>Área seleccionada: {areas.find(area => area.id === speciesForm.naturalAreaId)?.name}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowSpeciesModal(false)}>Cancelar</button>
                                        <button className="btn btn-success" onClick={() => handleAgregarEspecie(speciesForm)}>Agregar Especie</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {areas.length < totalRecords && (
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
};

export default AreasNaturales;
