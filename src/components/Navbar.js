//react-router
import NavLinks from "./NavLinks"

export default function Navbar(){

    return(
        <div id="navbar-container">
            <nav id="navbar">
                <img id="logo" src="./assets/shared/desktop/logo.svg" alt="audiophile-logo" /> 
                <NavLinks/>
                <img id="cart-icon" src="./assets/shared/desktop/icon-cart.svg" alt="cart-icon" />
            </nav>
        </div>
    )
}