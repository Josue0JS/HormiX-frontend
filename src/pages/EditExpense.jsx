import { Link, useParams } from "react-router-dom";
import { end_points } from "../services/api";
import { useState, useEffect } from "react";
import { redirectAlert } from "../helpers/alert";

const EditExpense = () => {
  const [getExpense, setExpense] = useState({});
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [valor, setValor] = useState(0);
  const [imagen, setImagen] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [medioPagoId, setMedioPagoId] = useState("");
  const [comercioId, setComercioId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  let { id } = useParams();
  function fetchExpenses() {
    fetch(end_points.expenses + id)
      .then((reponse) => reponse.json())
      .then((data) => {
        setExpense(data);
        setDescripcion(data.descripcion);
        setFecha(data.fecha);
        setValor(data.valor);
        setImagen(data.imagen);
        setUsuarioId(data.usuarioId);
        setMedioPagoId(data.medioPagoId);
        setComercioId(data.comercioId);
        setCategoriaId(data.categoriaId);
      });
  }
  useEffect(() => {
    fetchExpenses();
  }, []);

  function updateExpense() {
    let expense = {
      descripcion,
      fecha,
      valor,
      imagen,
      usuarioId,
      medioPagoId,
      comercioId,
      categoriaId,
    };
    fetch(end_points.expenses + id, {
      method: "PATCH",
      body: JSON.stringify(expense),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        redirectAlert(
          "Cambios realizados",
          "Será redireccionado en un momento",
          "success",
          "/expenses",
        );
      });
  }

  return (
    <div className="edit-expense-wrapper">
      <header className="edit-expense-header">
        <div className="edit-expense-header-content">
          <div className="edit-expense-header-left">
            <div className="edit-expense-logo">
              <i class="fi fi-rr-edit"></i>
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

          <p>
            Campos según el modelo (sin el id). Valores precargados como
            referencia visual.
          </p>
        </section>

        <section className="edit-expense-card">
          <div className="edit-expense-card-header">
            <div className="edit-expense-card-info">
              <h2>Formulario</h2>
              <p>ID ejemplo: 5002</p>
            </div>

            <span className="edit-expense-status">Estado: Borrador</span>
          </div>

          <div className="edit-expense-form">
            <div className="edit-expense-grid">
              <div className="edit-expense-group edit-expense-full">
                <label>Descripción</label>

                <input
                  defaultValue="Reserva AWS EC2 - Proyecto Final"
                  placeholder="Descripción"
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="edit-expense-group">
                <label>Fecha</label>

                <input
                  defaultValue="2026-03-02"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div className="edit-expense-group">
                <label>Valor</label>

                <input
                  value={valor}
                  placeholder="Valor"
                  type="number"
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>

              <div className="edit-expense-group edit-expense-full">
                <label>Imagen (texto)</label>

                <input
                  value={imagen}
                  placeholder="ic-server"
                  type="text"
                  onChange={(e) => setImagen(e.target.value)}
                />

                <div className="edit-expense-preview">
                  <p>Preview</p>

                  <span>
                    Icono:
                    <strong> ic-server</strong>
                  </span>
                </div>
              </div>

              <div className="edit-expense-group">
                <label>Usuario ID</label>

                <input
                  value={usuarioId}
                  placeholder="1"
                  type="number"
                  onChange={(e) => setUsuarioId(e.target.value)}
                />
              </div>

              <div className="edit-expense-group">
                <label>Medio de pago ID</label>

                <input
                  value={medioPagoId}
                  placeholder="104"
                  type="number"
                  onChange={(e) => setMedioPagoId(e.target.value)}
                />
              </div>

              <div className="edit-expense-group">
                <label>Comercio ID</label>

                <input
                  value={comercioId}
                  placeholder="201"
                  type="number"
                  onChange={(e) => setComercioId(e.target.value)}
                />
              </div>

              <div className="edit-expense-group">
                <label>Categoría ID</label>

                <input
                  value={categoriaId}
                  placeholder="303"
                  type="number"
                  onChange={(e) => setCategoriaId(e.target.value)}
                />
              </div>
            </div>

            <div className="edit-expense-actions">
              <Link to="/expenses" className="edit-expense-cancel-btn">
                Cancelar
              </Link>

              <button
                type="button"
                onClick={updateExpense}
                className="edit-expense-save-btn"
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
