import { useRef,useState,useEffect } from "react"
import { useSelector } from "react-redux"

export default function Cart(){
    const [height, setHeight] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })
    const {isCartCliked} = useSelector(store=>store.nav)
    
    //dynamic-styles
    let dynamicStyles = null;

function addAnimation(body) {
    if (!dynamicStyles) {
        dynamicStyles = document.createElement('style');
        dynamicStyles.type = 'text/css';
        document.head.appendChild(dynamicStyles);
    }

    dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }

    addAnimation(`@keyframes down {to{bottom:0;}}`);
    addAnimation(`@keyframes up{0%{top:0;}100%{top: calc(0px - ${height}px - 32px);}}`);

    return(
        <section className="cart" >
            <div
                className={`cart-content ${isCartCliked?"cart-content-down":""}`} 
                ref={ref}
                style={{bottom:`calc(${height}px + 32px)`,}}
            >
                {height}
            </div>
        </section>
    )
}