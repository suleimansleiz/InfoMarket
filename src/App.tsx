// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoMarketDashboard from "./components/InfoMarketDashboard";
import Home from "./components/Home";
import Accessories from "./components/Accessories";
import Bags from "./components/Bags";
import Carteins from "./components/Carteins";
import Computers from "./components/Computers";
import Phones from "./components/Phones";
import Settings from "./components/Settings";
import Help from "./components/Help";
import SellYourItem from "./components/SellYourItem";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoMarketDashboard />}>
          {/* Default route for the container */}
          <Route index element={<Home />} />
          {/* Other routes for dynamic content */}
          <Route path="accessories" element={<Accessories />} />
          <Route path="bags" element={<Bags />} />
          <Route path="carteins" element={<Carteins />} />
          <Route path="computers" element={<Computers />} />
          <Route path="phones" element={<Phones />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="sell-your-item" element={<SellYourItem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


