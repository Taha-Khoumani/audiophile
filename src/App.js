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
      <Route path="/" element={<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quam, illum fuga praesentium est enim cupiditate minus ratione fugit consequuntur! Perferendis itaque placeat illo quis id esse exercitationem praesentium iste?</h1>} />
      <Route path='/headphones' element={<h1>headphones</h1>} />
      <Route path='/speakers' element={<h1>speakers</h1>} />
      <Route path='/earphones' element={<h1>earphones</h1>} />
      <Route path='/checkout' element={<h1>checkout</h1>} />
    </Routes>
    {/* <Routes>
      <Route path="/audiophile" element={<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quam, illum fuga praesentium est enim cupiditate minus ratione fugit consequuntur! Perferendis itaque placeat illo quis id esse exercitationem praesentium iste?</h1>} />
      <Route path='/audiophile/headphones' element={<h1>headphones</h1>} />
      <Route path='/audiophile/speakers' element={<h1>speakers</h1>} />
      <Route path='/audiophile/earphones' element={<h1>earphones</h1>} />
      <Route path='/audiophile/checkout' element={<h1>checkout</h1>} />
    </Routes> */}
    <Footer />
    </>
  );
}

export default App;
