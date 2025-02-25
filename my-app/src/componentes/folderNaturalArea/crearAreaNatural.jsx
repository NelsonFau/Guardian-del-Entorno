import { useState } from "react";
import { useSelector } from "react-redux";


const CreateNaturalArea = () => {
  const user = useSelector((state)=> state.user)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    areaType: "",
    region: "",
    conservationStatus: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const apiUrl =
      "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!";

    const dataToSend = {
      userId: user?.id,  
      naturalArea: formData,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.result) {
        setMessage("✅ ¡Área natural creada con éxito!");
        setFormData({
          name: "",
          location: "",
          areaType: "",
          region: "",
          conservationStatus: "",
          description: "",
          imageUrl: "",
        });
      } else {
        setMessage("❌ Error al crear el área.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("❌ Hubo un problema con la API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Crear Área Natural</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Ubicación" value={formData.location} onChange={handleChange} required />
        <input type="text" name="areaType" placeholder="Tipo de Área" value={formData.areaType} onChange={handleChange} required />
        <input type="text" name="region" placeholder="Región" value={formData.region} onChange={handleChange} required />
        <input type="text" name="conservationStatus" placeholder="Estado de Conservación" value={formData.conservationStatus} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required></textarea>
        <input type="text" name="imageUrl" placeholder="URL de Imagen" value={formData.imageUrl} onChange={handleChange} required />
        
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Crear Área Natural"}
        </button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateNaturalArea;
