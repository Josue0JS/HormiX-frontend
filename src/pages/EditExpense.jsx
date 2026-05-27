import { Link, useParams } from "react-router-dom";
import { end_points } from "../services/api";
import { useState, useEffect } from "react";
import { redirectAlert } from "../helpers/alert";
import { getLocalStorage } from "../helpers/local-storage";

const EditExpense = () => {
  const user = getLocalStorage("user");
  console.log(user);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    valor: "",
    icono: "",
    metodoPago: "",
    categoria: "",
    recurrente: false,
    estado: "Activo",
  });

  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  function fetchExpenses() {
    fetch(`${end_points.expenses}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar el gasto");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Gasto cargado:", data);
        setFormData({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          fecha: data.fecha ? data.fecha.split("/").reverse().join("-") : "",
          valor: data.valor || "",
          icono: data.icono || "",
          idUsuario: user?.id,
          metodoPago: data.metodoPago || "",
          categoria: data.categoria || "",
          recurrente: data.recurrente || false,
          estado: data.estado || "Activo",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchExpenses();
  }, [id]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function updateExpense() {
    let expense = {
      id: parseInt(id),
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
    };

    fetch(`${end_points.expenses}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar");
        }

        return response.json();
      })
      .then(() => {
        redirectAlert(
          "Cambios realizados",
          "Será redireccionado en un momento",
          "success",
          "/expenses",
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="edit-expense-wrapper">
      <header className="edit-expense-header">
        <div className="edit-expense-header-content">
          <div className="edit-expense-header-left">
            <div className="edit-expense-logo">
              <i className="fi fi-rr-edit"></i>
            </div>

            <div className="edit-expense-header-info">
              <span>Editar gasto</span>
              <span>Mismo formulario con valores de ejemplo</span>
            </div>
          </div>

          <Link to="/expenses" className="edit-expense-back-btn">
            Volver
          </Link>
        </div>
      </header>

      <main className="edit-expense-main">
        <section className="edit-expense-title-section">
          <h1>Editar Expense</h1>
        </section>

        <section className="edit-expense-card">
          <div className="edit-expense-card-header">
            <h2>Formulario</h2>
          </div>

          <div className="edit-expense-form">
            <div className="edit-expense-grid">
              <div className="edit-expense-group">
                <label>Nombre</label>

                <input
                  placeholder="Ej: Suscripción AWS"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-expense-group edit-expense-full">
                <label>Descripción</label>

                <input
                  placeholder="Ej: Reserva AWS EC2"
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-expense-group">
                <label>Fecha</label>

                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-expense-group">
                <label>Valor</label>

                <input
                  placeholder="Ej: 1580000"
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-expense-group edit-expense-full">
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

              <div className="edit-expense-group">
                <label>Método de Pago</label>

                <select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un método</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Tarjeta Débito">Tarjeta Débito</option>
                  <option value="Tarjeta Crédito">Tarjeta Crédito</option>
                  <option value="PSE">PSE</option>
                  <option value="Efectivo">Efectivo</option>
                </select>
              </div>

              <div className="edit-expense-group">
                <label>Categoría</label>

                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una categoría</option>

                  <option value="Servicios">Servicios</option>

                  <option value="Comida">Comida</option>

                  <option value="Transporte">Transporte</option>

                  <option value="Entretenimiento">Entretenimiento</option>

                  <option value="Salud">Salud</option>

                  <option value="Educación">Educación</option>

                  <option value="Tecnología">Tecnología</option>

                  <option value="Hogar">Hogar</option>

                  <option value="Mascotas">Mascotas</option>

                  <option value="Viajes">Viajes</option>

                  <option value="Ropa">Ropa</option>

                  <option value="Impuestos">Impuestos</option>

                  <option value="Suscripciones">Suscripciones</option>

                  <option value="Ahorro">Ahorro</option>

                  <option value="Otros">Otros</option>
                </select>
              </div>
            </div>

            <div className="edit-expense-actions">
              <Link to="/expenses" className="edit-expense-cancel-btn">
                Cancelar
              </Link>

              <button
                type="button"
                className="edit-expense-save-btn"
                onClick={updateExpense}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditExpense;
