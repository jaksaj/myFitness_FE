import FormRegistration from './components/FormRegistration'
import FormSignIn from './components/FormSignIn'
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/login" Component={FormSignIn} />
            <Route path="/register" Component={FormRegistration} />
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
