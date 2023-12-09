import { useState } from 'react'
import FormaUnosReg from './components/FormaUnosReg'
import './App.css'
import FormaUnosSig from './components/FormaUnosSig'
import { BrowserRouter, Routes, Route, Link, Outlet} from 'react-router-dom'
function App() {
  
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
            <Route path="/login" Component={FormaUnosSig} />
            <Route path="/register/*" Component={FormaUnosReg} />
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/login">Prijavi se</Link>
            </li>
            <li>
              <Link to="/register">Registriraj se</Link>
            </li>
          </ul>
        </nav>
      </div>
    </BrowserRouter>
  )
}
//triba vidit kako da kad stisnemo na route zapravo preusmjeri na tu komponentu, sada je samo doda
export default App
