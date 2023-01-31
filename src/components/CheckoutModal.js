//react-router
import { Link } from "react-router-dom"

//reducers
import { removeAll ,toggleModal} from "../features/cartSlice"

//redux
import { useDispatch ,useSelector} from "react-redux"

export default function CheckoutModal(props) {
    const {grandTotal,firstItem,xOthers} = props

    const dispatch = useDispatch()

    const {winWidth} = useSelector(store=>store.nav)

    const padding = () => {
        if (winWidth > 1195) {
          return 165;
        } else if (winWidth > 980) {
          return 120;
        } else if (winWidth > 870) {
          return 90;
        } else if (winWidth > 767) {
          return 60;
        } else if (winWidth < 767) {
          return 40;
        }
    };

    function animateModal() {
        document.querySelector("#navbar").style.paddingRight = ``;
        document.querySelector(
        ".cart-container-1"
        ).style.right = `${padding()}px`;
        document.querySelector("#root").style.position = "static";
        dispatch(toggleModal(false))
    }

    return(
        <div id="checkout-modal">
            <div id="checkout-modal-content-container" className="modalup">
            <div id="checkout-modal-content">
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
                            animateModal()
                        }}
                    >
                        BACK TO HOME
                    </button>
                </Link>
            </div>
            </div>
        </div>
    )
}