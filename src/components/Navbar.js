//components
import NavLinks from "./NavLinks"

//react
import { useEffect } from "react"

//redux
import { useSelector, useDispatch} from "react-redux"

//reducers
import { toggleMenu,setMenuColl } from "../features/nav/navSlice"

//images
import audiophile from "../imgs/logo.svg"
import cart from "../imgs/icon-cart.svg"

export default function Navbar(){
    const dispatch = useDispatch()
    const {isMenuOpen,isMenuCollapsed} = useSelector(store=>store.nav)
    useEffect(()=>{
        window.addEventListener("resize",()=>{
            dispatch(setMenuColl(window.innerWidth <= 767))
            if(window.innerWidth > 767) dispatch(toggleMenu(false))  
        })
    // eslint-disable-next-line
    },[])
    return(
        <div id="navbar-container">
            <nav id="navbar">
                {   isMenuCollapsed && 
                    <i  id="menu" 
                        className="fa-sharp fa-solid fa-bars"
                        onClick={()=> dispatch(toggleMenu(!isMenuOpen))}
                    >
                    </i>
                }
                <img id="logo" src={audiophile} alt="audiophile-logo" /> 
                {  !isMenuCollapsed && <NavLinks isText={true} />}
                <img id="cart-icon" src={cart} alt="cart-icon" />
            </nav> 
            { isMenuCollapsed && isMenuOpen && <NavLinks isText={false} />}
        </div>
    )
}