import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";

const Settings: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  return(
  <div>
    <div className="topbar d-flex align-items-center p-3">
    <h1 className="headers-2">Settings Page</h1>
    </div>
    <div>
    <form>
              <Form.Check
                type="switch"
                onChange={toggleTheme}
                className="custom-switch"
              />
            </form>
    </div>
    </div>
  );
};

export default Settings;
