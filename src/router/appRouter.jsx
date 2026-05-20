import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Expenses from '../pages/Expenses';
import CreateExpense from '../pages/CreateExpense';
import EditExpense from '../pages/EditExpense';

export const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/expenses",
    element: <Expenses />,
  },
  {
    path: "/createExpense",
    element: <CreateExpense />,
  },
  {
    path: "/edit-expense",
    element: <EditExpense />,
  },
]);


