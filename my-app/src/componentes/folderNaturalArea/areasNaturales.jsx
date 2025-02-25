import { useState, useEffect } from "react";

const AreasNaturales = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSize = 10;
    const userId = 1; 

    const fetchAreas = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&userId=${userId}&keyword=&areaType=&region=&conservationStatus=&page=${pageNumber}&pageSize=${pageSize}`,
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

    useEffect(() => {
        fetchAreas(page);
    }, []);

    const handleLoadMore = () => {
        if (areas.length >= totalRecords) return;

        const nextPage = page + 1;
        setPage(nextPage);
        fetchAreas(nextPage);
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Áreas Naturales</h2>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    {loading && <p className="text-center">Cargando...</p>}

                    <ul className="list-group">
                        {areas.map((area) => (
                            <li key={area.id} className="list-group-item">
                                <h5 className="mb-1">{area.name}</h5>
                                <p className="text-muted">{area.description}</p>
                            </li>
                        ))}
                    </ul>

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
