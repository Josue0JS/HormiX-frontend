import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { end_points } from "../services/api";

/**
 * GestionCategorias
 * Props:
 *  - onSelect(nombre): callback cuando el usuario elige una categoría para el gasto
 *  - valorActual: string con la categoría actualmente seleccionada
 */
const GestionCategorias = ({ onSelect, valorActual }) => {
  const [categorias, setCategorias] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(null); // null | objeto categoria
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [loading, setLoading] = useState(false);

  // ── Cargar categorías desde la API ──
  async function cargarCategorias() {
    try {
      const res = await fetch(end_points.category);
      const data = await res.json();
      setCategorias(data);
    } catch (e) {
      console.error("Error cargando categorías:", e);
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  // ── Abrir modal para crear ──
  function abrirCrear() {
    setModoEdicion(null);
    setForm({ nombre: "", descripcion: "" });
    setModalAbierto(true);
  }

  // ── Abrir modal para editar ──
  function abrirEditar(cat) {
    setModoEdicion(cat);
    setForm({ nombre: cat.nombre, descripcion: cat.descripcion || "" });
    setModalAbierto(true);
  }

  // ── Guardar (crear o editar) ──
  async function guardar() {
    if (!form.nombre.trim()) {
      return Swal.fire("Error", "El nombre es obligatorio", "error");
    }
    if (form.descripcion.trim().length < 7) {
      return Swal.fire(
        "Error",
        "La descripción debe tener al menos 7 caracteres",
        "error",
      );
    }

    setLoading(true);
    try {
      const url = modoEdicion
        ? `${end_points.category}/${modoEdicion.id}`
        : end_points.category;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: modoEdicion?.id,
          nombre: form.nombre.trim(),
          descripcion: form.descripcion.trim(),
          estado: "ACTIVO",
        }),
      });

      if (!res.ok) throw new Error();

      await cargarCategorias();
      setModalAbierto(false);
      Swal.fire(
        "Éxito",
        modoEdicion ? "Categoría actualizada" : "Categoría creada",
        "success",
      );
    } catch {
      Swal.fire("Error", "No se pudo guardar la categoría", "error");
    } finally {
      setLoading(false);
    }
  }

  // ── Eliminar ──
  async function eliminar(cat) {
    const confirm = await Swal.fire({
      title: `¿Eliminar "${cat.nombre}"?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#EF476F",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${end_points.category}/${cat.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await cargarCategorias();
      // Si la categoría eliminada era la seleccionada, limpiar selección
      if (valorActual === cat.nombre) onSelect("");
      Swal.fire("Eliminada", "La categoría fue eliminada", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar la categoría", "error");
    }
  }

  return (
    <div className="gestion-select-wrapper">
      {/* SELECT principal */}
      <div className="gestion-select-row">
        <select
          name="categoria"
          value={valorActual}
          onChange={(e) => onSelect(e.target.value)}
          className="gestion-select"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="gestion-manage-btn"
          onClick={() => setModalAbierto(true)}
          title="Gestionar categorías"
        >
          <i class="fi fi-rc-settings"></i> Gestionar
        </button>
      </div>

      {/* MODAL */}
      {modalAbierto && (
        <div
          className="gestion-modal-overlay"
          onClick={() => setModalAbierto(false)}
        >
          <div className="gestion-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gestion-modal-header">
              <h3>Gestionar Categorías</h3>
              <button
                className="gestion-modal-close"
                onClick={() => setModalAbierto(false)}
              >
                ✕
              </button>
            </div>

            {/* Formulario crear/editar */}
            <div className="gestion-form">
              <h4>{modoEdicion ? "Editar categoría" : "Nueva categoría"}</h4>
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="gestion-input"
              />
              <input
                type="text"
                placeholder="Descripción (mín. 7 caracteres)"
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
                      setForm({ nombre: "", descripcion: "" });
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

            {/* Lista de categorías */}
            <div className="gestion-list">
              <h4>Categorías existentes</h4>
              {categorias.length === 0 && (
                <p className="gestion-empty">
                  No hay categorías aún. ¡Crea una!
                </p>
              )}
              {categorias.map((cat) => (
                <div key={cat.id} className="gestion-item">
                  <div className="gestion-item-info">
                    <span className="gestion-item-nombre">{cat.nombre}</span>
                    {cat.descripcion && (
                      <span className="gestion-item-desc">
                        {cat.descripcion}
                      </span>
                    )}
                  </div>
                  <div className="gestion-item-actions">
                    <button
                      type="button"
                      className="gestion-edit-btn"
                      onClick={() => abrirEditar(cat)}
                      title="Editar"
                    >
                      <i class="fi fi-rr-edit"></i>
                    </button>
                    <button
                      type="button"
                      className="gestion-delete-btn"
                      onClick={() => eliminar(cat)}
                      title="Eliminar"
                    >
                      <i class="fi fi-tc-settings"></i>
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

export default GestionCategorias;
