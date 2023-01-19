//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"

export default function Home(){

    return(
        <div id="home">
            <NavLinks isText={false}/>
            <h1>home</h1>
            <p style={{marginBottom:100,}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, fuga omnis! Nisi libero porro placeat a minus in quibusdam adipisci. Vel autem rem ab, rerum inventore soluta id possimus voluptate!</p>
            <About />
        </div>   
    )
}