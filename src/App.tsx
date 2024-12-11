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
import CreateAccount from "./components/CreateAccount";
import LoginPage from "./components/LoginPage";
import UploadItem from "./components/UploadItem";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoMarketDashboard />}>
          <Route index element={<Home />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="bags" element={<Bags />} />
          <Route path="carteins" element={<Carteins />} />
          <Route path="computers" element={<Computers />} />
          <Route path="phones" element={<Phones />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="sell-your-item" element={<SellYourItem />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="upload-item" element={<UploadItem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


