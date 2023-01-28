//redux
import { useSelector,useDispatch } from "react-redux"

//react
import { useEffect } from "react"

//reducers
import { removeAll ,modifyByOne,setPreviousCart} from "../features/cartSlice"

//cart-imgs
import zx9 from "../imgs/image-zx9-speaker.jpg"
import zx7 from "../imgs/image-zx7-speaker.jpg"
import yx1 from "../imgs/image-yx1-earphones.jpg"
import xx99_1 from "../imgs/image-xx99-mark-one-headphones.jpg"
import xx99_2 from "../imgs/image-xx99-mark-two-headphones.jpg"
import xx59 from "../imgs/image-xx59-headphones.jpg"

//reducers
import {clickCart} from "../features/navSlice"

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

    const {isCartCliked,winWidth} = useSelector(store=>store.nav)

    const {items} = useSelector(store=>store.cart)
    items = items.reverse()
    const cartItemsEls = items.map((item,index)=>
        <div className="cart-item" key={index} >
            <img src={cartImgs[item.itemslug]} alt="product-img" />
            <div className="name-price">
                <p>{item.itemName}</p>
                <p>$ {item.itemPrice.toLocaleString()}</p>
            </div>
            <div className="product-nums-cart-1">
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
        </div>
    )

    function closeCart(){
        const padding =()=>{
            if(winWidth > 1195){
                return 165
            }else if(winWidth>980){
                return 120
            }else if(winWidth>870){
                return 90
            }else if(winWidth>767){
                return 60
            }else if(winWidth<767){
                return 40
            }
        }
        if(isCartCliked){
            document.querySelector("#navbar").style.paddingRight = ``
            document.querySelector(".cart-container-1").style.right = `${padding()}px`
            document.querySelector("#root").style.position = "static"
            document.querySelector(".cart").style.backgroundColor = "transparent"
            document.querySelector(".cart-content").classList.remove("cart-content-down")
            document.querySelector(".cart-content").classList.add("cart-content-up")
            setTimeout(()=>dispatch(clickCart(!isCartCliked)),500)
        }else{
            dispatch(clickCart(!isCartCliked))
        }
    
    }

    return(
        <section 
            className="cart" 
            onClick={()=>closeCart()}    
        >
            <div 
                className={`cart-content ${isCartCliked?"cart-content-down":""}`}
                onClick={(e)=>{e.stopPropagation()}}
            >
                <div className="cart-top">
                    <p className="cart-count">CART ({items.length})</p>
                    {items.length !== 0 && <p className="remove-all" onClick={()=>dispatch(removeAll())} >Remove all</p>}
                </div>
                {
                    items.length
                    ?
                    <>
                        <div className="cart-items">
                            {cartItemsEls}
                        </div>
                        <div className="cart-bottom">
                            <div className="total">
                                <p className="total-word">TOTAL</p>
                                <p className="total-number">$ {items.reduce((total,item)=>total+item.itemPrice*item.itemQuantity,0).toLocaleString()}</p>
                            </div>
                            <button className="to-checkout button">CHECKOUT</button>
                        </div> 
                    </>
                    :
                    <p id="zero-items">You cart is empty</p>
                }
            </div>
        </section>
    )
}