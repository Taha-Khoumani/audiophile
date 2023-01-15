//components
import NavLinks from "./NavLinks";

//images
import audiophile from "../imgs/logo.svg"

export default function Footer(){

    return(
        <footer>
            <hr id="footer-orange-top" />
            <div id="footer-nav">
                <img src={audiophile} alt="audiophile" />
                <NavLinks isText={true} />
            </div>
            <div id="footer-about">
                <div id="footer-about-main">
                    <p id="about-text">Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
                    <p id="about-copywrite">Copyright 2021. All Rights Reserved</p>
                </div>
                <div id="footer-about-contacts">
                    <i className="fa-brands fa-square-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                </div>
            </div>
        </footer>
    )
}