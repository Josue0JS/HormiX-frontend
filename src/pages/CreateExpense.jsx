import { Link } from "react-router-dom";

const CreateExpense = () => {
  return (
    <div className="create-expense-wrapper">
      <header className="create-expense-header">
        <div className="create-expense-header-content">
          <div className="create-expense-header-left">
            <div className="create-expense-logo">
              <span>
                <i class="fi fi-tr-expense"></i>
              </span>
            </div>

            <div className="create-expense-header-info">
              <span>Crear gasto</span>

              <span>Registro de un nuevo expense</span>
            </div>
          </div>

          <Link to="/expenses" className="create-expense-back-btn">
            Volver
          </Link>
        </div>
      </header>

      <main className="create-expense-main">
        <section className="create-expense-title">
          <h1>Registrar Expense</h1>

          <p>Completa los campos del modelo (sin el id).</p>
        </section>

        <section className="create-expense-card">
          <div className="create-expense-card-header">
            <h2>Formulario</h2>
          </div>

          <div className="create-expense-form">
            <div className="create-expense-grid">
              <div className="create-expense-group create-expense-full">
                <label>Descripción</label>

                <input placeholder="Ej: Reserva AWS EC2" type="text" />
              </div>

              <div className="create-expense-group">
                <label>Fecha</label>

                <input type="date" />
              </div>

              <div className="create-expense-group">
                <label>Valor</label>

                <input placeholder="Ej: 1580000" type="number" />
              </div>

              <div className="create-expense-group create-expense-full">
                <label>Imagen</label>

                <input placeholder="Ej: ic-server" type="text" />

                <p>Puedes guardar el nombre de un ícono o recurso.</p>
              </div>

              <div className="create-expense-group">
                <label>Usuario ID</label>

                <input placeholder="Ej: 1" type="number" />
              </div>

              <div className="create-expense-group">
                <label>Medio pago ID</label>

                <input placeholder="Ej: 104" type="number" />
              </div>

              <div className="create-expense-group">
                <label>Comercio ID</label>

                <input placeholder="Ej: 201" type="number" />
              </div>

              <div className="create-expense-group">
                <label>Categoría ID</label>

                <input placeholder="Ej: 303" type="number" />
              </div>
            </div>

            <div className="create-expense-actions">
              <Link to="/expenses" className="create-expense-cancel-btn">
                Cancelar
              </Link>

              <button type="button" className="create-expense-save-btn">
                Guardar
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateExpense;
