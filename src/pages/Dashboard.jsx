import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage";
import { redirectAlert } from "../helpers/alert";
import { Link } from "react-router-dom";

const Dashboard = () => {
  let user = getLocalStorage("user");

  function logout() {
    removeLocalStorage("user");
    redirectAlert(
      "Sesión cerrada",
      "Has cerrado la sesión correctamente",
      "success",
      "/login"
    );
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-user">
            <div className="dashboard-user-logo">
              <span>
                <i className="fi fi-rr-user"></i>
              </span>
            </div>

            <div className="dashboard-user-info">
               <span>{user.nombre || "Usuario"}</span>
              <span>{user.documento || "Documento"}</span> 
            </div>
          </div>

          <div className="dashboard-header-buttons">
            <Link to="/expenses" className="dashboard-primary-btn">
              Ver Gastos
            </Link>

            <button type="button" className="dashboard-secondary-btn" onClick={logout}>
              cerrar sesión
              <i className="fi fi-rr-logout"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h1>Overview</h1>

          <p>A quick snapshot of your finances.</p>
        </section>

        <section className="dashboard-cards">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-info">
                <p>Balance</p>

                <h2>$ 2,450.00</h2>
              </div>

              <div className="dashboard-card-icon">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6v12m6-6H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
            </div>

            <p className="dashboard-card-text">Updated just now</p>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-info">
                <p>Income (month)</p>

                <h2>$ 3,200.00</h2>
              </div>

              <div className="dashboard-card-icon">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17l10-10M10 7h7v7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>

            <p className="dashboard-card-text">Compared to last month</p>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-info">
                <p>Expenses (month)</p>

                <h2>$ 750.00</h2>
              </div>

              <div className="dashboard-card-danger-icon">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 7L7 17M7 7h10v10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>

            <p className="dashboard-card-text">Keep an eye on subscriptions</p>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-transactions">
            <div className="dashboard-section-header">
              <div className="dashboard-section-info">
                <h2>Transacciones recientes</h2>

                <p>Ultimos movimientos en tu cuenta</p>
              </div>

              <button type="button" className="dashboard-secondary-btn">
                Ver todos
              </button>
            </div>

            <div className="dashboard-transaction-list">
              <div className="dashboard-transaction-item">
                <div className="dashboard-transaction-left">
                  <div className="dashboard-transaction-icon">
                    <span>F</span>
                  </div>

                  <div className="dashboard-transaction-info">
                    <p>Food</p>
                    <span>Apr 08 • Card</span>
                  </div>
                </div>

                <p className="dashboard-expense">- $ 24.50</p>
              </div>

              <div className="dashboard-transaction-item">
                <div className="dashboard-transaction-left">
                  <div className="dashboard-transaction-icon">
                    <span>T</span>
                  </div>

                  <div className="dashboard-transaction-info">
                    <p>Transport</p>
                    <span>Apr 07 • Cash</span>
                  </div>
                </div>

                <p className="dashboard-expense">- $ 12.00</p>
              </div>

              <div className="dashboard-transaction-item">
                <div className="dashboard-transaction-left">
                  <div className="dashboard-income-icon">
                    <span>S</span>
                  </div>

                  <div className="dashboard-transaction-info">
                    <p>Salary</p>
                    <span>Apr 05 • Bank</span>
                  </div>
                </div>

                <p className="dashboard-income">+ $ 3,200.00</p>
              </div>
            </div>
          </div>

          <div className="dashboard-actions-card">
            <div className="dashboard-section-info">
              <h2>Quick Actions</h2>

              <p>Shortcuts for common tasks</p>
            </div>

            <div className="dashboard-actions">
              <button type="button" className="dashboard-secondary-btn">
                Create category
              </button>

              <button type="button" className="dashboard-secondary-btn">
                Export report
              </button>

              <button type="button" className="dashboard-primary-btn">
                Add transaction
              </button>
            </div>

            <div className="dashboard-tip">
              <p>Tip</p>

              <span>Set a monthly budget to keep expenses under control.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
