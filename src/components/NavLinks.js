//react-router
import { Link,NavLink,useLocation } from "react-router-dom"

//redux
import {useDispatch,useSelector} from "react-redux"

//reducers
import { toggleMenu} from "../features/navSlice"

//images
import arrow from "../imgs/icon-arrow-right.svg"
import speakersCat from "../imgs/speakers-img.png"
import earphonesCat from "../imgs/earphones-img.png"
import headphonesCat from "../imgs/headphones-img.png"

export default function NavLinks(props){
    const location = useLocation()

    const {isText,isNav} = props

    const dispatch = useDispatch()

    const {isMenuOpen,winWidth} = useSelector(store=>store.nav)


    function closeMenu(){
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

    const LinkImgs =    (<div 
                            className={`${props.class ? props.class : null}${!isNav ?" notNav": " navlinks-img"}`}
                            onClick={(e)=>{e.stopPropagation()}}
                        >
                            <Link 
                                className="category"
                                to="/audiophile/headphones"
                                style={{textDecoration: "none",}}
                                onClick={()=>{
                                    if(isNav){
                                        closeMenu()
                                    }
                                }
                            }
                            >
                                <img className="category-img" src={headphonesCat} alt="headphones-cat" />
                                <p style={{}}>HEADPHONES</p>
                                <div className="shop">
                                    <p>SHOP</p>
                                    <img src={arrow} alt="shop-arrow" />
                                </div>
                            </Link>
                            <Link 
                                className="category"
                                to="/audiophile/speakers" 
                                style={{textDecoration: "none",}}
                                onClick={()=>{
                                    if(isNav){
                                        closeMenu()
                                    }
                                }}
                            >
                                <img className="category-img" src={speakersCat} alt="speakers-cat" />
                                <p>SPEAKERS</p>
                                    <div className="shop">
                                    <p>SHOP</p>
                                    <img src={arrow} alt="shop-arrow" />
                                    </div>
                            </Link>
                            <Link
                                className="category" 
                                to="/audiophile/earphones" 
                                style={{textDecoration: "none",}}
                                onClick={()=>{
                                    if(isNav){
                                        closeMenu()
                                    }
                                }}
                            >
                                <img className="category-img" src={earphonesCat} alt="earphones-cat" />
                                <p>EARPHONES</p>
                                <div className="shop">
                                    <p>SHOP</p>
                                    <img src={arrow} alt="shop-arrow" />
                                </div>
                            </Link>
                        </div>)

    return(
        <div className="navlinks" id={props.id ? props.id : ""}>
            {   isText 
                ?
                <div className="navlinks-text">
                    <Link style={location.pathname === "/audiophile/" ? {color:"#D87D4A"}:{}} to="/audiophile/">HOME</Link>
                    <NavLink to="audiophile/headphones" >HEADPHONES</NavLink>
                    <NavLink to="audiophile/speakers" >SPEAKERS</NavLink>
                    <NavLink to="audiophile/earphones" >EARPHONES</NavLink>
                </div>
                :
                    isNav
                    ?
                        <div 
                            id="navlink-img-container"
                            onClick={()=>closeMenu()}
                        >
                            {LinkImgs}
                        </div> 
                    :
                    <div>
                        {LinkImgs}
                    </div>
                
            }
        </div>
    )
}