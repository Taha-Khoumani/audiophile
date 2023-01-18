//imgs
import human from "../imgs/human.jpg"

export default function About(){

    return(
        <div className="about">
            <div className="about-text"></div>
            <img className="about-picture" src={human} alt="human-wearing-headphones" ></img>
            <About/>
        </div>
    )
}