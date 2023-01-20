//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"

//redux
import { useSelector } from "react-redux"

export default function Speakers(){
    const {productsList} = useSelector(store=>store.products)
    
    return(
        <div id="speakers">
            <h1 className="cat-h">SPEAKERS</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni officiis, accusantium iste repudiandae itaque eaque voluptatem eos necessitatibus! Dolores velit iusto consequuntur reiciendis quasi, placeat ducimus. Magni consequatur ullam accusamus!</p>
            <NavLinks isText={false} isNav={false} />
            <About/>
        </div>
    )
}