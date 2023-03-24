import React from 'react'
import LoginPage from './pages/login/LoginPage'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/register/RegisterPage';


const App = () => {
  return (
    <div className="App">
      <RegisterPage/>
    </div>
  )
}

export default App