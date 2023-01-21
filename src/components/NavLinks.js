//react-router
import { Link,NavLink,useLocation } from "react-router-dom"

//redux
import {useDispatch} from "react-redux"

//reducers
import { toggleMenu} from "../features/nav/navSlice"

//images
import arrow from "../imgs/icon-arrow-right.svg"
import speakersCat from "../imgs/speakers-img.png"
import earphonesCat from "../imgs/earphones-img.png"
import headphonesCat from "../imgs/headphones-img.png"

export default function NavLinks(props){
    const location = useLocation()
    const {isText,isNav} = props
    const dispatch = useDispatch()

  
    const LinkImgs =    (<div 
                            className={`${props.class ? props.class : null}${!isNav ?" notNav": " navlinks-img"}`}
                            onClick={(e)=>{
                                e.stopPropagation()
                            }}
                        >
                        <div className="category">
                            <img className="category-img" src={headphonesCat} alt="headphones-cat" />
                            <p>HEADPHONES</p>
                            <Link 
                                to="/audiophile/headphones"
                                style={{textDecoration: "none",}}
                                onClick={()=>{
                                    document.body.style.position = "static"
                                    dispatch(toggleMenu(false))
                                }}
                            >
                                <div className="shop">
                                    <p>SHOP</p>
                                    <img src={arrow} alt="shop-arrow" />
                                </div>
                            </Link>
                        </div>
                        <div className="category">
                            <img className="category-img" src={speakersCat} alt="speakers-cat" />
                            <p>SPEAKERS</p>
                            <Link 
                                to="/audiophile/speakers" 
                                style={{textDecoration: "none",}}
                                onClick={()=>{
                                    document.body.style.position = "static"
                                    dispatch(toggleMenu(false))
                                }}
                            >
                                <div className="shop">
                                    <p>SHOP</p>
                                    <img src={arrow} alt="shop-arrow" />
                                </div>
                            </Link>
                        </div>
                        <div className="category">
                            <img className="category-img" src={earphonesCat} alt="earphones-cat" />
                            <p>EARPHONES</p>
                            <Link 
                                to="/audiophile/earphones" 
                                style={{textDecoration: "none",}}
                                onClick={()=>{
                                    document.body.style.position = "static"
                                    dispatch(toggleMenu(false))
                                }}
                            >
                                <div className="shop">
                                    <p>SHOP</p>
                                    <img src={arrow} alt="shop-arrow" />
                                </div>
                            </Link>
                        </div>
                        </div>)

    return(
        <div className="navlinks" id={props.id ? props.id : ""}>
            {   isText 
                ?
                <div className="navlinks-text">
                    <Link style={location.pathname === "/audiophile" ? {color:"#D87D4A"}:{}} to="audiophile">HOME</Link>
                    <NavLink to="audiophile/headphones" >HEADPHONES</NavLink>
                    <NavLink to="audiophile/speakers" >SPEAKERS</NavLink>
                    <NavLink to="audiophile/earphones" >EARPHONES</NavLink>
                </div>
                :
                    isNav
                    ?
                        <div 
                            id="navlink-img-container"
                            onClick={()=>{
                                dispatch(toggleMenu(false))
                            }}
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