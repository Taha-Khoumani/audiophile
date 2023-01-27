//redux
import { useSelector } from "react-redux"

export default function Cart(){
    const {isCartCliked} = useSelector(store=>store.nav)
    const {items} = useSelector(store=>store.cart)
    console.log(items)
    const cartItemsEls = items.map((item,index)=>
        <div className="cart-item" key={index} >
            <img src={item.itemImg} alt="product-img" />
            <div className="name-price">
                <p>{item.itemName}</p>
                <p>$ {item.itemPrice}</p>
            </div>
            <div className="product-nums-cart">
                            <button
                                // onClick={()=>{
                                //     if(currentQuantity > 1){
                                //         setCurrentQuantity(prevQ=>prevQ-1)
                                //     }
                                // }}
                            >
                                -
                            </button>
                            <p>{item.itemQuantity}</p>
                            <button
                                // onClick={()=>setCurrentQuantity(prevQ=>prevQ+1)}
                            >
                                +
                            </button>
            </div>
        </div>
    )
    return(
        <section className="cart" >
            <div className={`cart-content ${isCartCliked?"cart-content-down":""}`}>
                <div className="cart-items">
                    {cartItemsEls}
                </div>
            </div>
        </section>
    )
}