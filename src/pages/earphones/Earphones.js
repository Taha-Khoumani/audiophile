//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"

//redux
import { useSelector } from "react-redux"

export default function Earphones(){
    const {productsList} = useSelector(store=>store.products)
    
    return(
        <div id="earphones">
            <h1 className="cat-h">EARPHONES</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur saepe, illo, necessitatibus explicabo voluptatibus odit, quidem incidunt facere magnam veniam dolorum iusto libero laboriosam nam beatae sint doloribus eos temporibus.</p>
            <NavLinks isText={false} isNav={false}/>
            <About/>
        </div>
    )
}