//react-router
import { Link } from "react-router-dom"

//images
import arrow from "../imgs/icon-arrow-right.svg"
import speakersCat from "../imgs/speakers-img.png"
import earphonesCat from "../imgs/earphones-img.png"
import headphonesCat from "../imgs/headphones-img.png"

export default function NavLinks(props){
    const {isText} = props
    return(
        <div className="navlinks">
            { 
                isText 
                ?
                <div className="navlinks-text">
                    <Link to="audiophile">HOME</Link>
                    <Link to="audiophile/headphones" >HEADPHONES</Link>
                    <Link to="audiophile/speakers" >SPEAKERS</Link>
                    <Link to="audiophile/earphones" >EARPHONES</Link>
                </div>
                :
                <div className="navlinks-img">
                    <div className="category">
                        <img className="category-img" src={headphonesCat} alt="headphones-cat" />
                        <p>HEADPHONES</p>
                        <Link to="audiophile/headphones" style={{textDecoration: "none",}}>
                            <div className="shop">
                                <p>SHOP</p>
                                <img src={arrow} alt="shop-arrow" />
                            </div>
                        </Link>
                    </div>
                    <div className="category">
                        <img className="category-img" src={speakersCat} alt="speakers-cat" />
                        <p>SPEAKERS</p>
                        <Link to="audiophile/speakers" style={{textDecoration: "none",}}>
                            <div className="shop">
                                <p>SHOP</p>
                                <img src={arrow} alt="shop-arrow" />
                            </div>
                        </Link>
                    </div>
                    <div className="category">
                        <img className="category-img" src={earphonesCat} alt="earphones-cat" />
                        <p>EARPHONES</p>
                        <Link to="audiophile/earphones" style={{textDecoration: "none",}}>
                            <div className="shop">
                                <p>SHOP</p>
                                <img src={arrow} alt="shop-arrow" />
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}