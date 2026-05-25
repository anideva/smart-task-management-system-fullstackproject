import { useState } from "react";
import Login from "./components/Login";
import Tasks from "./components/tasks";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Smart Task Management System</h2>

      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <Tasks/>
      )}
    </div>
  );
}

export default App;
