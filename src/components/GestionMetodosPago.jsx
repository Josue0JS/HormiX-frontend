import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { end_points } from "../services/api";

/**
 * GestionMetodosPago
 * Props:
 *  - onSelect(nombre): callback cuando el usuario elige un método
 *  - valorActual: string con el método actualmente seleccionado
 */
const GestionMetodosPago = ({ onSelect, valorActual }) => {
  const [metodos, setMetodos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    franquicia: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si valorActual tiene un método, agregarlo a la lista localmente
    // Así aparece en el select aunque no esté cargado desde el servidor
    if (valorActual && !metodos.find(m => m.nombre === valorActual)) {
      setMetodos(prev => [...prev, { 
        id: Math.random(), 
        nombre: valorActual, 
        franquicia: "", 
        descripcion: "" 
      }]);
    }
  }, [valorActual]);

  async function cargarMetodos() {
    // Sin endpoint GET/listado disponible, mantener métodos locales
    // Los métodos se agregan cuando se crean/editan exitosamente
  }

  function abrirCrear() {
    setModoEdicion(null);
    setForm({ nombre: "", franquicia: "", descripcion: "" });
    setModalAbierto(true);
  }

  function abrirEditar(metodo) {
    setModoEdicion(metodo);
    setForm({
      nombre: metodo.nombre,
      franquicia: metodo.franquicia || "",
      descripcion: metodo.descripcion || "",
    });
    setModalAbierto(true);
  }

  async function guardar() {
    if (!form.nombre.trim()) {
      return Swal.fire("Error", "El nombre es obligatorio", "error");
    }

    setLoading(true);
    try {
      const url = modoEdicion
        ? `${end_points.payment_methods}/${modoEdicion.id}`
        : end_points.payment_methods;

      const res = await fetch(url, {
        method: modoEdicion ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(modoEdicion ? { id: modoEdicion.id } : {}),
          nombre: form.nombre.trim(),
          franquicia: form.franquicia.trim(),
          descripcion: form.descripcion.trim(),
          estado: "Activo",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error guardando método de pago:", res.status, errorText);
        throw new Error(errorText || "Error en el servidor");
      }

      const nuevoMetodo = await res.json();
      
      if (modoEdicion) {
        // Actualizar método existente
        setMetodos(metodos.map(m => m.id === modoEdicion.id ? nuevoMetodo : m));
      } else {
        // Agregar nuevo método a la lista
        setMetodos([...metodos, nuevoMetodo]);
      }

      setModalAbierto(false);
      Swal.fire(
        "Éxito",
        modoEdicion ? "Método actualizado" : "Método creado",
        "success",
      );
    } catch {
      Swal.fire("Error", "No se pudo guardar el método de pago", "error");
    } finally {
      setLoading(false);
    }
  }

  async function eliminar(metodo) {
    const confirm = await Swal.fire({
      title: `¿Eliminar "${metodo.nombre}"?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#EF476F",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${end_points.payment_methods}/${metodo.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      
      setMetodos(metodos.filter(m => m.id !== metodo.id));
      
      if (valorActual === metodo.nombre) onSelect("");
      Swal.fire("Eliminado", "El método fue eliminado", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar el método de pago", "error");
    }
  }

  return (
    <div className="gestion-select-wrapper">
      <div className="gestion-select-row">
        <select
          name="metodoPago"
          value={valorActual}
          onChange={(e) => onSelect(e.target.value)}
          className="gestion-select"
        >
          <option value="">Selecciona un método</option>
          {metodos.map((m) => (
            <option key={m.id} value={m.nombre}>
              {m.nombre}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="gestion-manage-btn"
          onClick={abrirCrear}
          title="Gestionar métodos de pago"
        >
          <i className="fi fi-rc-settings"></i> Gestionar
        </button>
      </div>

      {modalAbierto && (
        <div
          className="gestion-modal-overlay"
          onClick={() => setModalAbierto(false)}
        >
          <div className="gestion-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gestion-modal-header">
              <h3>Gestionar Métodos de Pago</h3>
              <button
                className="gestion-modal-close"
                onClick={() => setModalAbierto(false)}
              >
                ✕
              </button>
            </div>

            <div className="gestion-form">
              <h4>{modoEdicion ? "Editar método" : "Nuevo método"}</h4>
              <input
                type="text"
                placeholder="Nombre (ej: Nequi)"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="gestion-input"
              />
              <input
                type="text"
                placeholder="Franquicia (opcional, ej: Visa)"
                value={form.franquicia}
                onChange={(e) =>
                  setForm({ ...form, franquicia: e.target.value })
                }
                className="gestion-input"
              />
              <input
                type="text"
                placeholder="Descripción (opcional)"
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                className="gestion-input"
              />
              <div className="gestion-form-actions">
                {modoEdicion && (
                  <button
                    type="button"
                    className="gestion-cancel-btn"
                    onClick={() => {
                      setModoEdicion(null);
                      setForm({ nombre: "", franquicia: "", descripcion: "" });
                    }}
                  >
                    Cancelar edición
                  </button>
                )}
                <button
                  type="button"
                  className="gestion-save-btn"
                  onClick={guardar}
                  disabled={loading}
                >
                  {loading
                    ? "Guardando..."
                    : modoEdicion
                      ? "Actualizar"
                      : "Crear"}
                </button>
              </div>
            </div>

            <div className="gestion-list">
              <h4>Métodos existentes</h4>
              {metodos.length === 0 && (
                <p className="gestion-empty">No hay métodos aún. ¡Crea uno!</p>
              )}
              {metodos.map((m) => (
                <div key={m.id} className="gestion-item">
                  <div className="gestion-item-info">
                    <span className="gestion-item-nombre">{m.nombre}</span>
                    {m.franquicia && (
                      <span className="gestion-item-desc">{m.franquicia}</span>
                    )}
                  </div>
                  <div className="gestion-item-actions">
                    <button
                      type="button"
                      className="gestion-edit-btn"
                      onClick={() => abrirEditar(m)}
                    >
                      <i className="fi fi-rr-edit"></i>
                    </button>
                    <button
                      type="button"
                      className="gestion-delete-btn"
                      onClick={() => eliminar(m)}
                    >
                      <i className="fi fi-tc-settings"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionMetodosPago;
