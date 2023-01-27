//redux
import { useSelector,useDispatch } from "react-redux"

//reducers
import { removeAll ,modifyByOne} from "../features/cartSlice"

//cart-imgs
import zx9 from "../imgs/image-zx9-speaker.jpg"
import zx7 from "../imgs/image-zx7-speaker.jpg"
import yx1 from "../imgs/image-yx1-earphones.jpg"
import xx99_1 from "../imgs/image-xx99-mark-one-headphones.jpg"
import xx99_2 from "../imgs/image-xx99-mark-two-headphones.jpg"
import xx59 from "../imgs/image-xx59-headphones.jpg"

const cartImgs = {
    "zx9-speaker":zx9,
    "zx7-speaker":zx7,
    "yx1-earphones":yx1,
    "xx99-mark-one-headphones":xx99_1,
    "xx99-mark-two-headphones":xx99_2,
    "xx59-headphones":xx59,
}

export default function Cart(){
    const dispatch = useDispatch()
    const {isCartCliked} = useSelector(store=>store.nav)
    const {items} = useSelector(store=>store.cart)
    const cartItemsEls = items.map((item,index)=>
        <div className="cart-item" key={index} >
            <img src={cartImgs[item.itemslug]} alt="product-img" />
            <div className="name-price">
                <p>{item.itemName}</p>
                <p>$ {item.itemPrice.toLocaleString()}</p>
            </div>
            <div className="product-nums-cart">
                            <button
                                onClick={()=>{
                                    dispatch(modifyByOne({isAdding:false,slug:item.itemslug}))
                                }}
                            >
                                -
                            </button>
                            <p>{item.itemQuantity}</p>
                            <button
                                onClick={()=>{
                                    dispatch(modifyByOne({isAdding:true,slug:item.itemslug}))
                                }}
                            >
                                +
                            </button>
            </div>
        </div>
    )
    return(
        <section className="cart" >
            <div className={`cart-content ${isCartCliked?"cart-content-down":""}`}>
                <div className="cart-top">
                    <p className="cart-count">CART ({items.length})</p>
                    <p className="remove-all" onClick={()=>dispatch(removeAll())} >Remove all</p>
                </div>
                <div className="cart-items">
                    {cartItemsEls}
                </div>
                <div className="total">
                    <p className="total-word">TOTAL</p>
                    <p className="total-number">$ {items.reduce((total,item)=>total+item.itemPrice*item.itemQuantity,0).toLocaleString()}</p>
                </div>
                <button className="to-checkout button">CHECKOUT</button>
            </div>
        </section>
    )
}