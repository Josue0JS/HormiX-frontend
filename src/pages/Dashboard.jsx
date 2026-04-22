import { useEffect, useState } from "react";
import { end_points } from "../services/api";
import { redirectAlert } from "../helpers/alert";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userStorage);
    getExpenses();
  }, []);

  const getExpenses = async () => {
    const res = await fetch(end_points.expenses);
    const data = await res.json();
    setExpenses(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addExpense = async () => {
    if (!form.name || !form.category || !form.amount) {
      redirectAlert("Campos incompletos", "Llena todos los campos", "error");
      return;
    }

    await fetch(end_points.expenses, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        amount: Number(form.amount),
      }),
    });

    setForm({ name: "", category: "", amount: "" });
    getExpenses();
  };

  const logout = () => {
    localStorage.removeItem("user");
    redirectAlert("Sesión cerrada", "Volviendo al login", "success", "/");
  };

  //funcion para eliminar un gasto
  const deleteExpense = (id) => {
    fetch(end_points.expenses + id, {
      method: "DELETE",
    });
    getExpenses();
  };

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-header">
        <h2>Bienvenido,  {user?.nombres} </h2>
        <button onClick={logout}>Cerrar sesión</button>
      </div>

      <div className="dashboard-card">

        <h3>Gestión de Gastos</h3>

        <div className="form-expense">
          <input
            type="text"
            name="name"
            placeholder="Nombre del gasto"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Precio"
            value={form.amount}
            onChange={handleChange}
          />

          <button onClick={addExpense}>Agregar</button>
        </div>

        <div className="expense-list">
          {expenses.length === 0 ? (
            <p>No hay gastos aún</p>
          ) : (
            expenses.map((item) => (
              <div className="expense-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.category}</p>
                </div>
                <span>${item.amount}</span>
                <button className="delete-btn" onClick={() => deleteExpense(item.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;