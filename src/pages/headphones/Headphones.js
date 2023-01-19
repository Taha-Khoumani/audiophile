//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"


export default function Headphones(){

    return(
        <div id="headphones">
            <h1>headphones</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dolores, delectus omnis rem harum nisi ipsum assumenda nesciunt consequuntur nulla aspernatur maxime ducimus eos voluptatum autem sequi rerum, porro excepturi.</p>
            <NavLinks isText={false}/>
            <About/>
        </div>
    )
}