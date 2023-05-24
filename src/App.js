import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DashboardContent from "./pages/dashboard";
import Home from "./pages/Home";
import Login from "./pages/users/login";
import Register from "./pages/users/register";
import AddExpense from "./pages/expense/addExpense";
import AddIncome from "./pages/income/addIncome";
import ProtectedRoute from "./components/Navigation/protectedRoute";
import ExpenseStats from "./pages/expense/expenseDeposit";
// import ExpenseTable from "./pages/expense/expenseTable";
// import ExpenseChart from "./pages/expense/expenseCharts";
import EditExpense from "./pages/expense/editExpense";
import EditIncome from "./pages/income/editIncome";
import ExpenseDash from "./pages/expense/expenseDash";
import IncomeDash from "./pages/income/incomeDash";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/expenseDashboard" element={<ProtectedRoute />}>
          <Route exact path="/expenseDashboard" element={<ExpenseDash />} />
          <Route
            exact
            path="/expenseDashboard/editExpense"
            element={<EditExpense />}
          />
        </Route>

        <Route exact path="/addExpense" element={<ProtectedRoute />}>
          <Route exact path="/addExpense" element={<AddExpense />} />
        </Route>

        <Route exact path="/incomeDashboard" element={<ProtectedRoute />}>
          <Route exact path="/incomeDashboard" element={<IncomeDash />} />
          <Route
            exact
            path="/incomeDashboard/editIncome"
            element={<EditIncome />}
          />
        </Route>

        <Route exact path="/addIncome" element={<ProtectedRoute />}>
          <Route exact path="/addIncome" element={<AddIncome />} />
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
