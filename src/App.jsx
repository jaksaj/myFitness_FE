import FormRegistration from "./components/FormRegistration";
import FormSignIn from "./components/FormSignIn";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import HomePage from "./components/HomePage";
import FormCreateSplit from "./components/FormCreateSplit";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" Component={FormSignIn} />
          <Route path="/register" Component={FormRegistration} />
          <Route path="/home" Component={HomePage} />
          <Route path="/create" Component={FormCreateSplit} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
