import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { getLocalStorage, removeLocalStorage } from "../helpers/local-storage";

import { redirectAlert } from "../helpers/alert";

const Dashboard = () => {
  const user = getLocalStorage("user");

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/hormixapi/v1/dashboard/stats/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // CATEGORÍAS
        const categoriesFormatted = data.categories.map((item) => ({
          name: item[0],
          value: item[1],
        }));

        // MESES
        const months = [
          "",
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ];

        const monthlyFormatted = data.monthlyExpenses.map((item) => ({
          month: months[item[0]],
          total: item[1],
        }));

        // PROMEDIO
        const average =
          data.totalExpenses / (data.recentTransactions.length || 1);

        setStats({
          ...data,
          categoriesFormatted,
          monthlyFormatted,
          average,
        });
      })
      .catch((error) => {
        console.error("Error dashboard:", error);
      });
  }, []);

  function logout() {
    const COLORS = ["#ff7a00", "#ff9333", "#ffad66", "#ffc799", "#ffe0cc"];
    removeLocalStorage("user");

    redirectAlert(
      "Sesión cerrada",
      "Has cerrado la sesión correctamente",
      "success",
      "/login",
    );
  }

  const COLORS = ["#ff7a00", "#ff9333", "#ffad66", "#ffc799", "#ffe0cc"];

  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}

      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-user">
            <div className="dashboard-user-logo">
              <span>
                <i className="fi fi-rr-user"></i>
              </span>
            </div>

            <div className="dashboard-user-info">
              <span>{user?.nombre || "Usuario"}</span>

              <span>{user?.documento || "Documento"}</span>
            </div>
          </div>

          <div className="dashboard-header-buttons">
            <Link to="/expenses" className="dashboard-primary-btn">
              Ver gastos
            </Link>

            <button
              type="button"
              className="dashboard-secondary-btn"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h1>Hola, {user?.nombre}</h1>

          <p>Este es el resumen de tus finanzas.</p>
        </section>

        {/* CARDS */}

        <section className="dashboard-cards">
          {/* TOTAL */}

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-info">
                <p>Total gastos</p>

                <h2>${stats?.totalExpenses?.toLocaleString("es-CO") || 0}</h2>
              </div>

              <div className="dashboard-card-icon">
                <i className="fi fi-rr-wallet"></i>
              </div>
            </div>

            <p className="dashboard-card-text">Gastos acumulados registrados</p>
          </div>

          {/* CATEGORIA */}

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-info">
                <p>Categoría top</p>

                <h2>{stats?.categoriesFormatted?.[0]?.name || "Sin datos"}</h2>
              </div>

              <div className="dashboard-card-icon">
                <i className="fi fi-rr-chart-pie"></i>
              </div>
            </div>

            <p className="dashboard-card-text">Categoría con mayor consumo</p>
          </div>

          {/* MOVIMIENTOS */}

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-info">
                <p>Movimientos</p>

                <h2>{stats?.recentTransactions?.length || 0}</h2>
              </div>

              <div className="dashboard-card-danger-icon">
                <i className="fi fi-rr-exchange"></i>
              </div>
            </div>

            <p className="dashboard-card-text">
              Últimos movimientos registrados
            </p>
          </div>
        </section>

        {/* CHARTS */}

        <section className="dashboard-content">
          {/* LINE CHART */}

          <div className="dashboard-transactions">
            <div className="dashboard-section-header">
              <div className="dashboard-section-info">
                <h2>Gastos mensuales</h2>

                <p>Comportamiento mensual de gastos</p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "320px",
                marginTop: "20px",
              }}
            >
              <ResponsiveContainer>
                <LineChart data={stats?.monthlyFormatted || []}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#ff7a00"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART */}

          <div className="dashboard-actions-card">
            <div className="dashboard-section-info">
              <h2>Categorías</h2>

              <p>Distribución de gastos</p>
            </div>

            <div
              style={{
                width: "100%",
                height: "300px",
                marginTop: "20px",
              }}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stats?.categoriesFormatted || []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {stats?.categoriesFormatted?.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* TRANSACCIONES */}

        <section className="dashboard-content">
          <div className="dashboard-transactions">
            <div className="dashboard-section-header">
              <div className="dashboard-section-info">
                <h2>Transacciones recientes</h2>

                <p>Últimos movimientos en tu cuenta</p>
              </div>
            </div>

            <div className="dashboard-transaction-list">
              {stats?.recentTransactions?.map((item) => (
                <div className="dashboard-transaction-item" key={item.id}>
                  <div className="dashboard-transaction-left">
                    <div className="dashboard-transaction-icon">
                      <span>{item.categoria?.charAt(0)}</span>
                    </div>

                    <div className="dashboard-transaction-info">
                      <p>{item.nombre}</p>

                      <span>
                        {item.fecha} • {item.metodoPago}
                      </span>
                    </div>
                  </div>

                  <p className="dashboard-expense">
                    - ${item.valor?.toLocaleString("es-CO")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="dashboard-actions-card">
            <div className="dashboard-section-info">
              <h2>Acciones rápidas</h2>

              <p>Acciones rápidas para tus transacciones</p>
            </div>

            <div className="dashboard-actions">
              <Link to="/CreateExpense" className="dashboard-primary-btn">
                Add transaction
              </Link>

              <Link to="/expenses" className="dashboard-secondary-btn">
                Ver listado
              </Link>
            </div>

            <div className="dashboard-tip">
              <p>Tip</p>

              <span>
                Reduce gastos en categorías repetitivas para mejorar tu ahorro.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
