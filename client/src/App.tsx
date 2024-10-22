import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Product } from "./Pages/Product";
import { Invoice } from "./Pages/Invoice";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addProducts" element={<Product />} />
          <Route path="/generatePdf" element={<Invoice />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
