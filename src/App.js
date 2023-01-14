import React from 'react';
//react-router
import { Routes,Route } from 'react-router-dom';
//css
import "./css/style.css"
//components
import Navbar from "./components/Navbar"
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<h1>home</h1>} />
      <Route path='/headphones' element={<h1>headphones</h1>} />
      <Route path='/speakers' element={<h1>speakers</h1>} />
      <Route path='/earphones' element={<h1>earphones</h1>} />
      <Route path='/checkout' element={<h1>checkout</h1>} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
