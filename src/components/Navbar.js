//components
import NavLinks from "./NavLinks"

//react
import { useEffect } from "react"

//redux
import { useSelector, useDispatch} from "react-redux"

//reducers
import { toggleMenu,setMenuColl,setWinWidth} from "../features/nav/navSlice"

//images
import audiophile from "../imgs/logo.svg"
import cart from "../imgs/icon-cart.svg"

export default function Navbar(){
    const dispatch = useDispatch()

    const {isMenuOpen,isMenuCollapsed,winWidth} = useSelector(store=>store.nav)

    useEffect(()=>{
        window.addEventListener("resize",()=>{
            dispatch(setWinWidth(window.innerWidth))
            dispatch(setMenuColl(window.innerWidth <= 767))
            if(window.innerWidth > 767) dispatch(toggleMenu(false))  
        })
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if (isMenuOpen) {
            document.body.style.position = "fixed"
        } else{
            document.body.style.position = "static"
        }

    },[isMenuOpen])

    return(
        <div id="navbar-container">
            <nav id="navbar">
                {   isMenuCollapsed && 
                    <i  id="menu" 
                        className="fa-sharp fa-solid fa-bars"
                        onClick={()=>{
                            if(isMenuOpen){
                                //remove-black-opace-background
                                document.querySelector("#navlink-img-container").style.backgroundColor = "transparent"

                                document.querySelector(".sliding-menu").classList.remove("sliding-menu-open")
                                document.querySelector(".sliding-menu").classList.add("sliding-menu-close")
                                setTimeout(()=>dispatch(toggleMenu(!isMenuOpen)),
                                    winWidth > 480 ?
                                    500:
                                    500
                                )
                            }
                            else{
                                dispatch(toggleMenu(!isMenuOpen))
                            }
                        }}
                    >
                    </i>
                }
                <img id="logo" src={audiophile} alt="audiophile-logo" /> 
                {  !isMenuCollapsed && <NavLinks isText={true} />}
                {/* {  !isMenuCollapsed && <NavLinks style={{position:"relative",zIndex: 5}} isText={true} />} */}
                <img id="cart-icon" src={cart} alt="cart-icon" />
            </nav> 
            { isMenuCollapsed && isMenuOpen && <NavLinks id="navbar-links" isText={false} class={"sliding-menu-open sliding-menu"}/>}
        </div>
    )
}