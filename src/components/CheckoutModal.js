//react-router
import { Link } from "react-router-dom"

//reducers
import { removeAll ,toggleModal} from "../features/cartSlice"

//redux
import { useDispatch } from "react-redux"

export default function CheckoutModal(props) {
    const {grandTotal,firstItem,xOthers} = props

    const dispatch = useDispatch()

    return(
        <div id="checkout-modal">
            <div>
                <img src="assets/checkout/icon-order-confirmation.svg" alt="orange-checkMark" />
                <p id="tnx">THANK YOU<br></br> FOR YOUR ORDER</p>
                <p id="confirmation">You will receive an email confirmation shortly.</p>
                <div id="recap">
                    <div id="recap-items">
                        {firstItem}
                        {
                            xOthers !== 0 &&
                            <>
                            <hr />
                            <p id="others">and {xOthers} other item{xOthers === 1 ? "" : "s"}</p>
                            </>
                        }
                    </div>
                    <div id="grand-total-container">
                        <p>GRAND TOTAL</p>
                        <p>$ {grandTotal}</p>
                    </div>
                </div>
                <Link to="/audiophile">
                    <button 
                        className="button"
                        onClick={()=>{
                            dispatch(removeAll())
                            dispatch(toggleModal(false))
                        }}
                    >
                        BACK TO HOME
                    </button>
                </Link>
            </div>
        </div>
    )
}