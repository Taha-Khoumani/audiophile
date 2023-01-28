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

    const padding =()=>{
        if(winWidth > 1195){
            return 165
        }else if(winWidth>980){
            return 120
        }else if(winWidth>870){
            return 90
        }else if(winWidth>767){
            return 60
        }else if(winWidth<767){
            return 40
        }
    }

    useEffect(()=>{
        let scrollbarWidth = (window.innerWidth - document.body.clientWidth);
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
            document.querySelector("#navbar").style.paddingRight = `${padding()+scrollWidth}px`
            document.querySelector(".cart-container-1").style.right = `${padding()+scrollWidth}px`
            document.querySelector("#root").style.position = "fixed"
        }
    },[isMenuOpen,isCartCliked,winWidth])

    function closeCart(){
        if(isCartCliked){
            document.querySelector("#navbar").style.paddingRight = ``
            document.querySelector(".cart-container-1").style.right = `${padding()}px`
            document.querySelector("#root").style.position = "static"
            document.querySelector(".cart").style.backgroundColor = "transparent"
            document.querySelector(".cart-content").classList.remove("cart-content-down")
            document.querySelector(".cart-content").classList.add("cart-content-up")
            setTimeout(()=>dispatch(clickCart(!isCartCliked)),500)
        }else{
            dispatch(clickCart(!isCartCliked))
        }
    
    }
    

    function closeMenu(){
        if(isMenuOpen){
            document.querySelector("#navbar").style.paddingRight = ``
            document.querySelector(".cart-container-1").style.right = `${padding()}px`
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
    }

    return(
        <div id="navbar-container" style={location.pathname === "/audiophile" ? {backgroundColor:"#191919"} : {}}>
            <nav 
                id="navbar" 
                style={location.pathname === "/audiophile" ? {backgroundColor:"#191919"} : {}}  
                onClick={()=>{
                    if(isMenuOpen){
                        document.querySelector("#navbar-links").style.zIndex="4"
                        closeMenu()
                    } else if(isCartCliked){
                        document.querySelector(".cart").style.zIndex="4"
                        closeCart()
                    }
                }}
            >
                {   isMenuCollapsed && 
                    <i  id="menu" 
                        className="fa-sharp fa-solid fa-bars"
                        onClick={()=>closeMenu()}
                    >
                    </i>
                }
                <Link to="/audiophile"><img id="logo" src={audiophile} alt="audiophile-logo" /></Link>
                {  !isMenuCollapsed && <NavLinks isText={true} />}
                <div className="cart-container-1">
                    <div 
                        className="cart-container-0"
                        onClick={()=>closeCart()}
                    >
                        <img 
                            id="cart-icon"
                            src={cart} 
                            alt="cart-icon"
                        />
                        { items.length && <p>{items.length}</p>}
                    </div>
                </div>
            </nav> 
            { isCartCliked && <Cart/>}
            { isMenuCollapsed && isMenuOpen && <NavLinks id="navbar-links" isText={false} class={"sliding-menu-open sliding-menu"} isNav={true}/>}
        </div>
    )
}