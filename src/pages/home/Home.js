//react-router
import { Link } from "react-router-dom"

//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"
import { useSelector } from "react-redux"
import { wichImg } from "../../components/ProductView"

//imgs
import heroD from "../../imgs/image-hero-d.jpg"
import heroT from "../../imgs/image-hero-t.jpg"
import heroM from "../../imgs/image-hero-m.jpg"

export default function Home(){
    const {winWidth} = useSelector(store=>store.nav)
    let landingItemImgs = {
        desktop:heroD,
        tablet:heroT,
        mobile:heroM,
    }
    return(
        <div id="home">
            <div className="hr-container-2"><hr className="hr" /></div>        
                <section className="landing-item">
                    <img src={wichImg(winWidth,landingItemImgs)} alt="landing-item-bg" className="landing-item-bg" />
                    <div className="category-product-text">
                        <p className={"category-product-text-new"}> NEW PRODUCT</p>
                        <p className={"category-product-text-name"}>XX99 Mark II HEADPHONES</p>
                        <p className={"category-product-text-description"}>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast</p>
                        <Link to={"headphones/xx99-mark-two-headphones"} ><button className="button">SEE PRODUCT</button></Link>
                    </div>
                </section>
            <NavLinks isText={false} isNav={false}/>
            <About />
        </div>   
    )
}