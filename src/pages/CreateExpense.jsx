import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { end_points } from "../services/api";
import { getLocalStorage } from "../helpers/local-storage";
import GestionCategorias from "../components/GestionCategorias";
import GestionMetodosPago from "../components/GestionMetodosPago";

const CreateExpense = () => {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    valor: "",
    icono: "",
    metodoPago: "",
    categoria: "",
    recurrente: false,
    estado: "ACTIVO",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Callbacks de los componentes de gestión
  const handleCategoriaSelect = (valor) => {
    setFormData((prev) => ({ ...prev, categoria: valor }));
  };

  const handleMetodoPagoSelect = (valor) => {
    setFormData((prev) => ({ ...prev, metodoPago: valor }));
  };

  const handleSave = async () => {
    if (
      !formData.nombre ||
      !formData.descripcion ||
      !formData.fecha ||
      !formData.valor ||
      !formData.metodoPago ||
      !formData.categoria
    ) {
      Swal.fire({ title: "Error", text: "Por favor completa todos los campos", icon: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(end_points.expenses, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          fecha: formData.fecha,
          valor: parseFloat(formData.valor),
          icono: formData.icono || "default-icon",
          idUsuario: user?.id,
          metodoPago: formData.metodoPago,
          categoria: formData.categoria,
          recurrente: formData.recurrente,
          estado: formData.estado,
        }),
      });

      if (!response.ok) throw new Error("Error al guardar el gasto");

      await response.json();

      Swal.fire({ title: "Éxito", text: "Gasto guardado correctamente", icon: "success" })
        .then(() => navigate("/expenses"));

    } catch (error) {
      console.error("Error:", error);
      Swal.fire({ title: "Error", text: "No se pudo guardar el gasto. Intenta de nuevo.", icon: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-expense-wrapper">

      <header className="create-expense-header">
        <div className="create-expense-header-content">
          <div className="create-expense-header-left">
            <div className="create-expense-logo">
              <span><i className="fi fi-tr-expense"></i></span>
            </div>
            <div className="create-expense-header-info">
              <span>Crear gasto</span>
              <span>Registro de un nuevo expense</span>
            </div>
          </div>
          <Link to="/expenses" className="create-expense-back-btn">Volver</Link>
        </div>
      </header>

      <main className="create-expense-main">

        <section className="create-expense-title">
          <h1>Registrar Expense</h1>
          <p>Completa todos los campos.</p>
        </section>

        <section className="create-expense-card">
          <div className="create-expense-card-header">
            <h2>Formulario</h2>
          </div>

          <div className="create-expense-form">
            <div className="create-expense-grid">

              <div className="create-expense-group">
                <label>Nombre</label>
                <input
                  placeholder="Ej: Suscripción AWS"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="create-expense-group create-expense-full">
                <label>Descripción</label>
                <input
                  placeholder="Ej: Reserva AWS EC2"
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="create-expense-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </div>

              <div className="create-expense-group">
                <label>Valor</label>
                <input
                  placeholder="Ej: 1580000"
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="create-expense-group create-expense-full">
                <label>Ícono</label>
                <input
                  placeholder="Ej: ic-server"
                  type="text"
                  name="icono"
                  value={formData.icono}
                  onChange={handleInputChange}
                />
                <p>Puedes guardar el nombre de un ícono o recurso.</p>
              </div>

              {/* ── Método de Pago con gestión dinámica ── */}
              <div className="create-expense-group">
                <label>Método de Pago</label>
                <GestionMetodosPago
                  valorActual={formData.metodoPago}
                  onSelect={handleMetodoPagoSelect}
                />
              </div>

              {/* ── Categoría con gestión dinámica ── */}
              <div className="create-expense-group">
                <label>Categoría</label>
                <GestionCategorias
                  valorActual={formData.categoria}
                  onSelect={handleCategoriaSelect}
                />
              </div>

            </div>

            <div className="create-expense-actions">
              <Link to="/expenses" className="create-expense-cancel-btn">
                Cancelar
              </Link>
              <button
                type="button"
                className="create-expense-save-btn"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default CreateExpense;