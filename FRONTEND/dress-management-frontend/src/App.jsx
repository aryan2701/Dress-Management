import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Supplier from "./pages/Supplier";
import School from "./pages/School";
import Headoffice from "./pages/Headoffice";
import Layout from "./components/Layout"; // Import the new layout component
//import NotFound from "./pages/NotFound"; // A fallback 404 page

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all the main routes */}

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default Route */}
          <Route path="supplier" element={<Supplier />} />
          <Route path="school" element={<School />} />
          <Route path="headoffice" element={<Headoffice />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
