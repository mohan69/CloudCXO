import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CxoProfilePage from "./pages/CxoProfilePage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* Generic Route for CXO Profiles */}
          <Route path="/cxos/:role" element={<CxoProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;