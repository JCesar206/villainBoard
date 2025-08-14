import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [villanos, setVillanos] = useState([]);
  const [villanoActual, setVillanoActual] = useState({ nombre: "", plan: "", imagen: "" });
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("villanos");
    if (datosGuardados) setVillanos(JSON.parse(datosGuardados));
  }, []);

  useEffect(() => {
    localStorage.setItem("villanos", JSON.stringify(villanos));
  }, [villanos]);

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setVillanoActual({ ...villanoActual, imagen: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const limpiarCampos = () => {
    setVillanoActual({ nombre: "", plan: "", imagen: "" });
    setEditandoIndex(null);
  };

  const guardarVillano = () => {
    if (!villanoActual.nombre || !villanoActual.plan) return;
    const nuevosVillanos = [...villanos];
    if (editandoIndex !== null) {
      nuevosVillanos[editandoIndex] = villanoActual;
    } else {
      nuevosVillanos.push(villanoActual);
    }
    setVillanos(nuevosVillanos);
    limpiarCampos();
  };

  const editarVillano = (index) => {
    setVillanoActual(villanos[index]);
    setEditandoIndex(index);
  };

  const eliminarVillano = (index) => {
    const nuevosVillanos = villanos.filter((_, i) => i !== index);
    setVillanos(nuevosVillanos);
    limpiarCampos();
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    villanos.forEach((v, i) => {
      doc.text(`Nombre: ${v.nombre}`, 10, 10 + i * 30);
      doc.text(`Plan: ${v.plan}`, 10, 20 + i * 30);
    });
    doc.save("villanos.pdf");
  };

  return (
    <div className="min-h-screen pb-28 bg-gray-950 text-white font-semibold flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🦹‍♂️ Dashboard para Villanos</h1>

      <div className="w-full max-w-md bg-gray-800 p-4 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Nombre del villano"
          className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
          value={villanoActual.nombre}
          onChange={(e) => setVillanoActual({ ...villanoActual, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Plan malévolo"
          className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
          value={villanoActual.plan}
          onChange={(e) => setVillanoActual({ ...villanoActual, plan: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full mb-2"
          onChange={manejarImagen}
        />
        <div className="flex justify-between mt-2">
          <button onClick={guardarVillano} className="bg-green-500 hover:bg-green-800 px-4 py-2 rounded">
            {editandoIndex !== null ? 'Actualizar' : 'Guardar'}
          </button>
          <button onClick={limpiarCampos} className="bg-yellow-500 hover:bg-yellow-800 px-4 py-2 rounded">
            Limpiar
          </button>
          <button onClick={exportarPDF} className="bg-red-500 hover:bg-red-800 px-4 py-2 rounded">
            PDF
          </button>
        </div>
      </div>

      <div className="mt-6 w-full max-w-3xl space-y-4">
        {villanos.map((v, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-xl flex items-center gap-4 shadow-md">
            {v.imagen && (
              <img src={v.imagen} alt="villano" className="w-16 h-16 object-cover rounded-full" />
            )}
            <div className="flex-1">
              <p className="font-bold">{v.nombre}</p>
              <p className="text-sm text-gray-300">{v.plan}</p>
            </div>
            <button onClick={() => editarVillano(i)} className="text-blue-400 hover:underline">Editar</button>
            <button onClick={() => eliminarVillano(i)} className="text-red-400 hover:underline">Eliminar</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
