import FormRegistration from './components/FormRegistration'
import FormSignIn from './components/FormSignIn'
import './App.css'
import { BrowserRouter, Routes, Route, Link, Outlet} from 'react-router-dom'
import HomePage from './components/HomePage'
import FormCreateSplit from './components/FormCreateSplit'
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
        <nav>
          <ul>
            <li>
              <Link to="/login">Log in!</Link>
            </li>
            <li>
              <Link to="/register">Register!</Link>
            </li>
          </ul>
        </nav>
      </div>
    </BrowserRouter>
  )
}

export default App
