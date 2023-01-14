import { Link } from "react-router-dom"

export default function NavLinks(){

    return(
        <div id="navlinks">
            <Link to="/">HOME</Link>
            <Link to="headphones" >HEADPHONES</Link>
            <Link to="speakers" >SPEAKERS</Link>
            <Link to="earphones" >EARPHONES</Link>
        </div>
    )
}