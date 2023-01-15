import { Link } from "react-router-dom"

export default function NavLinks(props){
    const {isText} = props
    return(
        <div className="navlinks">
            {
                isText 
                ?
                <div className="navlinks-text">
                    <Link to="/">HOME</Link>
                    <Link to="headphones" >HEADPHONES</Link>
                    <Link to="speakers" >SPEAKERS</Link>
                    <Link to="earphones" >EARPHONES</Link>
                </div>
                :
                <div className="navlinks-img">
                    <div className="category">
                        <img className="category-img" src="assets/nav-imgs/headphones-img.png" alt="headphones-cat" />
                        <p>HEADPHONES</p>
                        <Link to="headphones" style={{textDecoration: "none",}}>
                            <div className="shop">
                                <p>SHOP</p>
                                <img src="assets/shared/desktop/icon-arrow-right.svg" alt="shop-arrow" />
                            </div>
                        </Link>
                    </div>
                    <div className="category">
                        <img className="category-img" src="assets/nav-imgs/speakers-img.png" alt="speakers-cat" />
                        <p>SPEAKERS</p>
                        <Link to="speakers" style={{textDecoration: "none",}}>
                            <div className="shop">
                                <p>SHOP</p>
                                <img src="assets/shared/desktop/icon-arrow-right.svg" alt="shop-arrow" />
                            </div>
                        </Link>
                    </div>
                    <div className="category">
                        <img className="category-img" src="assets/nav-imgs/earphones-img.png" alt="earphones-cat" />
                        <p>EARPHONES</p>
                        <Link to="earphones" style={{textDecoration: "none",}}>
                            <div className="shop">
                                <p>SHOP</p>
                                <img src="assets/shared/desktop/icon-arrow-right.svg" alt="shop-arrow" />
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}