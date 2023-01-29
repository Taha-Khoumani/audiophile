//react
import React from "react";
import { useEffect } from "react";

//redux
import { useSelector } from "react-redux";

//react-router
import { Routes, Route } from "react-router-dom";

//css
import "./css/style.css";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import Headphones from "./pages/Headphones";
import Earphones from "./pages/Earphones";
import Speakers from "./pages/Speakers";
import Checkout from "./pages/Checkout";
import Product from "./components/Product";

function App() {
  const { items } = useSelector((store) => store.cart);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/audiophile" element={<Home />} />
        <Route path="/audiophile/headphones" element={<Headphones />} />
        <Route
          path="/audiophile/headphones/:productSlug"
          element={<Product />}
        />

        <Route path="/audiophile/speakers" element={<Speakers />} />
        <Route path="/audiophile/speakers/:productSlug" element={<Product />} />

        <Route path="/audiophile/earphones" element={<Earphones />} />
        <Route
          path="/audiophile/earphones/:productSlug"
          element={<Product />}
        />

        <Route path="/audiophile/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
