import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import Swal from "sweetalert2";
import { getLocalStorage } from "../helpers/local-storage";
import { Link } from "react-router-dom";

const Expenses = () => {
  const [getExpenses, setExpenses] = useState([]);

  // Sesión del usuario
  const [user, setUser] = useState(getLocalStorage("user"));

  // Filtros
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");

  function fetchExpenses() {
    fetch(end_points.expenses)
      .then((response) => response.json())
      .then((data) => {
        
        const expensesArray = Array.isArray(data) ? data : [];
        setExpenses(expensesArray);
      })
      .catch((error) => {
        console.error("Error al obtener gastos:", error);
        setExpenses([]);
      });
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  function deleteExpense(id) {
    Swal.fire({
      title: "¿Está seguro/a?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff7a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(end_points.expenses + "/" + id, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            Swal.fire({
              title: "Eliminado",
              text: "El gasto se eliminó correctamente",
              icon: "success",
            });

            fetchExpenses();
          });
      }
    });
  }

  // Filtros
  const filteredExpenses = getExpenses.filter((item) => {
    const matchesSearch =
      item.descripcion?.toLowerCase().includes(search.toLowerCase()) ||
      item.comercioId?.toString().includes(search);

    const matchesCategory =
      category === "" || item.categoriaId?.toString() === category;

    const matchesMonth = month === "" || item.fecha?.startsWith(month);

    return matchesSearch && matchesCategory && matchesMonth;
  });

  return (
    <div className="expense-wrapper">
      <header className="expense-header">
        <div className="expense-header-content">
          <div className="expense-header-left">
            <div className="expense-logo">
              <span>
                <i className="fi fi-rr-usd-circle"></i>
              </span>
            </div>

            <div className="expense-header-info">
              <span>Gastos</span>

              <span>Listado y control de tus ingresos</span>
            </div>
          </div>

          <div className="expense-header-buttons">
            <Link to="/dashboard" className="expense-back-btn">
              Volver
            </Link>

            <Link to="/CreateExpense" className="expense-create-btn">
              Nuevo gasto
            </Link>
          </div>
        </div>
      </header>

      <main className="expense-main">
        <section className="expense-title-section">
          <div>
            <h1>Expenses</h1>

            <p>Vista general de gastos registrados.</p>
          </div>

          <div className="expense-user">
            Usuario:
            <span>{user?.nombre || "Usuario"}</span>
          </div>
        </section>

        <section className="expense-filter-card">
          <div className="expense-filter-grid">
            <div className="expense-group">
              <label>Buscar</label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Descripción, comercio..."
                type="text"
              />
            </div>

            <div className="expense-group">
              <label>Categoría</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Todas</option>

                <option value="303">Servicios</option>

                <option value="304">Transporte</option>

                <option value="305">Alimentación</option>
              </select>
            </div>

            <div className="expense-group">
              <label>Mes</label>

              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>

            <div className="expense-filter-button">
              <button type="button">Filtrar</button>
            </div>
          </div>
        </section>

        <section className="expense-table-card">
          <div className="expense-table-header">
            <div className="expense-table-info">
              <h2>Listado</h2>

              <p>Ejemplo de registros con el modelo Expense.</p>
            </div>

            <div className="expense-table-count">
              <span>{filteredExpenses.length} items</span>
            </div>
          </div>

          <div className="expense-table-wrapper">
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Valor</th>
                  <th>Medio pago</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
  {filteredExpenses.map((item) => (
    <tr key={item.id} className="expense-row">
      <td>
        <div className="expense-id">
          <span>{item.id}</span>
        </div>
      </td>

      <td>
        <div className="expense-description-info">
          <p>{item.nombre}</p>
          <p>ID: {item.id}</p>
        </div>
      </td>

      <td>{item.descripcion}</td>
      <td>{item.fecha}</td>
      <td><span className="expense-value">$ {item.valor}</span></td>
      <td>{item.metodoPago}</td>
      <td>{item.categoria}</td>
      <td>
        <div className="expense-actions">
          <Link to={"/edit-expense/" + item.id} className="expense-edit-btn">Editar</Link>
          <button onClick={() => deleteExpense(item.id)} type="button" className="expense-delete-btn">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          <div className="expense-pagination">
            <p>Mostrando {filteredExpenses.length} registros</p>

            <div className="expense-pagination-buttons">
              <button type="button">Anterior</button>

              <button type="button">Siguiente</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Expenses;
