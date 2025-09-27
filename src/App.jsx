import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./App.css";
import LoginAdmin from "./Components/LoginAdmin";
import Register from "./Components/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin/*" element={<AdminLayout />} />

          <Route path="*" element={<LoginAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
