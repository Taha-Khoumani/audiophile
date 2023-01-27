//components
import NavLinks from "./NavLinks"
import Cart from "./Cart"

//react
import { useEffect ,useState} from "react"

//redux
import { useSelector, useDispatch} from "react-redux"

//reducers
import { toggleMenu,setMenuColl,setWinWidth,clickCart} from "../features/navSlice"

//images
import audiophile from "../imgs/logo.svg"
import cart from "../imgs/icon-cart.svg"

//react-router
import { Link ,useLocation} from "react-router-dom"

export default function Navbar(){
    const dispatch = useDispatch()
    const location = useLocation()
    const {isMenuOpen,isMenuCollapsed,winWidth,isCartCliked} = useSelector(store=>store.nav)
    const {items} = useSelector(store=>store.cart)
    const [scrollWidth,setScrollWidth] = useState(0)

    useEffect(()=>{
        let scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px';
        setScrollWidth(scrollbarWidth)
        console.log(scrollbarWidth)
    },[])

    useEffect(()=>{
        window.addEventListener("resize",()=>{
            dispatch(setWinWidth(window.innerWidth))
            dispatch(setMenuColl(window.innerWidth <= 767))
            if(window.innerWidth > 767) dispatch(toggleMenu(false))  
        })
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if (isMenuOpen || isCartCliked) {
            document.querySelector("#root").style.marginRight = scrollWidth
            document.querySelector("#root").style.position = "fixed"
        }
    },[isMenuOpen,isCartCliked])
    return(
        <div id="navbar-container" style={location.pathname === "/audiophile" ? {backgroundColor:"#191919"} : {}}>
            <nav id="navbar" style={location.pathname === "/audiophile" ? {backgroundColor:"#191919"} : {}}>
                {   isMenuCollapsed && 
                    <i  id="menu" 
                        className="fa-sharp fa-solid fa-bars"
                        onClick={()=>{
                            if(isMenuOpen){
                                document.querySelector("#root").style.marginRight = "0px"
                                document.querySelector("#root").style.position = "static"
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
                <Link to="/audiophile"><img id="logo" src={audiophile} alt="audiophile-logo" /></Link>
                {  !isMenuCollapsed && <NavLinks isText={true} />}
                <div className="cart-container">
                    <img 
                        id="cart-icon"
                        src={cart} 
                        alt="cart-icon"
                        onClick={()=>{
                            if(isCartCliked){
                                document.querySelector("#root").style.marginRight = "0px"
                                document.querySelector("#root").style.position = "static"
                                document.querySelector(".cart").style.backgroundColor = "transparent"
                                document.querySelector(".cart-content").classList.remove("cart-content-down")
                                document.querySelector(".cart-content").classList.add("cart-content-up")
                                setTimeout(()=>dispatch(clickCart(!isCartCliked)),500)
                            }else{
                                dispatch(clickCart(!isCartCliked))
                            }
                        }}
                    />
                    { items.length && <p>{items.length}</p>}
                </div>
            </nav> 
            { isCartCliked && <Cart/>}
            { isMenuCollapsed && isMenuOpen && <NavLinks id="navbar-links" isText={false} class={"sliding-menu-open sliding-menu"} isNav={true}/>}
        </div>
    )
}