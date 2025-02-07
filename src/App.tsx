// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './components/Container';
import { AuthProvider } from './AuthContext';

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route 
      path="/*"
      element={<Container/>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
