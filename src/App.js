//react
import React from 'react';

//react-router
import { Routes,Route } from 'react-router-dom';

//css
import "./css/style.css"

//components
import Navbar from "./components/Navbar"
import Footer from './components/Footer';

//pages
import Home from "./pages/home/Home"
import Headphones from "./pages/headphones/Headphones"
import Earphones from "./pages/earphones/Earphones"
import Speakers from "./pages/speakers/Speakers"
import Checkout from "./pages/checkout/Checkout"

function App() {
  return (
    <>
    <Navbar />        
    <Routes>
      <Route path="/audiophile" element={<Home/>} />
      <Route path='/audiophile/headphones' element={<Headphones/>} />
      <Route path='/audiophile/speakers' element={<Speakers/>} />
      <Route path='/audiophile/earphones' element={<Earphones/>} />
      <Route path='/audiophile/checkout' element={<Checkout/>} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
