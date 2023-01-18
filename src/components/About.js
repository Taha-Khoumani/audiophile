//imgs
import human from "../imgs/human.jpg"

export default function About(props){
    const {style} = props
    return(
        <div className="about" style={style}>
            <div className="about-text">
                <p className="about-text-title">BRINGING YOU THE <span>BEST</span> AUDIO GEAR</p>
                <p className="about-text-text">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
            </div>
            <img className="about-picture" src={human} alt="human-wearing-headphones" ></img>
        </div>
    )
}