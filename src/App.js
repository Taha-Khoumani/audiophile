//react
import React from 'react';

//react-router
import { Routes,Route } from 'react-router-dom';

//css
import "./css/style.css"

//components
import Navbar from "./components/Navbar"
import Footer from './components/Footer';

//images
import bob from "./imgs/bob.jpg"

function App() {
  return (
    <>
    <Navbar />        
    <Routes>
      <Route path="/audiophile" element={<h1>taha</h1>} />
      <Route path='/audiophile/headphones' element={<h1>headphones</h1>} />
      <Route path='/audiophile/speakers' element={<h1>speakers</h1>} />
      <Route path='/audiophile/earphones' element={<h1>earphones</h1>} />
      <Route path='/audiophile/checkout' element={<h1>checkout</h1>} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
