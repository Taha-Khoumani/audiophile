//react-router
import { Link } from "react-router-dom"

//components
import About from "../components/About"
import NavLinks from "../components/NavLinks"
import { useSelector } from "react-redux"

//imgs
import heroD from "../imgs/image-hero-d.png"
import heroT from "../imgs/image-hero-t.png"
import heroM from "../imgs/image-hero-m.png"
import circle from "../imgs/pattern-circles.svg"
import speakerD from "../imgs/image-speaker-d.png"
import speakerT from "../imgs/image-speaker-t.png"
import speakerM from "../imgs/image-speaker-m.png"
import zx7D from "../imgs/zx7D.jpg"
import zx7T from "../imgs/zx7T.jpg"
import zx7M from "../imgs/zx7M.jpg"
import yx1D from "../imgs/yx1D.png"
import yx1T from "../imgs/yx1T.jpg"
import yx1M from "../imgs/yx1M.jpg"
export default function Home(){

    const {winWidth} = useSelector(store=>store.nav)

    function wichImg(width, img) {
        if (width > 767) {
          return `${img.desktop}`;
        } else if (width > 480) {
          return `${img.tablet}`;
        } else {
          return `${img.mobile}`;
        }
    }

    let landingItemImgs = {
        desktop:heroD,
        tablet:heroT,
        mobile:heroM,
    }
    let speakerImgs ={
        desktop:speakerD,
        tablet:speakerT,
        mobile:speakerM,
    }
    let zx7Imgs ={
        desktop:zx7D,
        tablet:zx7T,
        mobile:zx7M
    }
    let yx1Imgs ={
        desktop:yx1D,
        tablet:yx1T,
        mobile:yx1M,
    }
    return(
        <div id="home">
                <div className="hr-container-2"><hr className="hr" /></div>        
                <section className="landing-item-0" style={{backgroundImage:`url("${wichImg(winWidth,landingItemImgs)}")`}}>
                    <div className="category-product-text-con">
                        <div className="category-product-text">
                            <p className={"category-product-text-new"}> NEW PRODUCT</p>
                            <p className={"category-product-text-name"}>XX99 Mark II HEADPHONES</p>
                            <p className={"category-product-text-description"}>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast</p>
                            <Link to={"headphones/xx99-mark-two-headphones"} ><button className="button">SEE PRODUCT</button></Link>
                        </div>
                    </div>
                </section> 
                <NavLinks isText={false} isNav={false}/>
                <section className="landing-products">
                    <section className="landing-item-1" style={{backgroundImage:`url("${circle}")`}}>
                        <img src={wichImg(winWidth,speakerImgs)} alt="speaker-img" />
                        <div className="category-product-text-1">
                            <p className={"category-product-text-name"}>ZX9 SPEAKER</p>
                            <p className={"category-product-text-description"}>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
                            <Link to={"headphones/xx99-mark-two-headphones"} ><button className="button">SEE PRODUCT</button></Link>
                        </div>
                    </section>
                    <section className="landing-item-2">
                        <img src={wichImg(winWidth,zx7Imgs)} alt="zx7-img" />
                        <div className="item-2-text">
                            <p>ZX7 SPEAKER</p>
                            <Link to={"/audiophile/speakers/zx7-speaker"}>
                                <button>SEE PRODUCT</button>
                            </Link>
                        </div>
                    </section>
                    <section className="landing-item-3">
                        <img src={wichImg(winWidth,yx1Imgs)} alt="yx1-img" />
                        <div className="item-3-text">
                            <p>YX1 EARPHONES</p>
                            <Link to={"/audiophile/earphones/yx1-earphones"}>
                                <button>SEE PRODUCT</button>
                            </Link>
                        </div>
                    </section>
                </section>
            <About />
        </div>   
    )
}