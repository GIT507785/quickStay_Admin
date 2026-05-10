import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ListRoom from "./pages/ListRoom";
import AddRoom from "./pages/AddRoom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;