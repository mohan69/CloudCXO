import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import BusinessRequest from "./pages/BusinessRequest";
import CXOList from "./pages/CXOList";
import CXORegister from "./pages/CXORegister";
import CxoProfilePage from "./pages/CxoProfilePage";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/leadership" element={<HomePage />} />
        <Route path="/leadership/:role" element={<CxoProfilePage />} />
        <Route path="/cxos/:role" element={<CXOList />} />
        <Route path="/register" element={<CXORegister />} />
        <Route path="/request-cxo" element={<BusinessRequest />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Routes without the main layout */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;