//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"
import { useSelector } from "react-redux"
import { wichImg } from "../../components/ProductView"

export default function Home(){
    const {winWidth} = useSelector(store=>store.nav)
    return(
        <div id="home">
            <NavLinks isText={false} isNav={false}/>
            <section className="landing-item">
            </section>
            <About />
        </div>   
    )
}