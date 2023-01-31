//redux
import { useSelector,useDispatch } from "react-redux";

//imgs
import { cartImgs } from "../components/Cart";

//components
import CheckoutModal from "../components/CheckoutModal"

//reducers
import { toggleModal } from "../features/cartSlice";

export default function Checkout() {

  const {winWidth} = useSelector(store=>store.nav)

  let { items,isModalOpen } = useSelector((store) => store.cart);
  items = [...items].reverse();
  const cartItemsEls = items.map((item, index) => (
    <div className="cart-item" key={index}>
      <img src={cartImgs[item.itemslug]} alt="product-img" />
      <div className="name-price">
        <p>{item.itemName}</p>
        <p>$ {item.itemPrice.toLocaleString()}</p>
      </div>
      <p className="checkout-item-quantity">
        <span>x {item.itemQuantity}</span>
      </p>
    </div>
  ));

  let total = items.reduce(
    (total, item) => total + item.itemPrice * item.itemQuantity,
    0
  );

  const dispatch = useDispatch()

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
    if (isModalOpen) {
      document.querySelector("#navbar").style.paddingRight = ``;
      document.querySelector(
        ".cart-container-1"
      ).style.right = `${padding()}px`;
      document.querySelector("#root").style.position = "static";
      // document.querySelector(".cart").style.backgroundColor = "transparent";
      // document.querySelector(".cart-content").classList.remove("cart-content-down");
      // document.querySelector(".cart-content").classList.add("cart-content-up");
      setTimeout(() => dispatch(toggleModal(false)), 500);
    } else {
      dispatch(toggleModal(true));
    }
}

  return (
    <div id="checkout-page">
      <section id="checkout">
        <p className="checkout-header">CHECKOUT</p>
        <form action="" className="form">
          <div className="sub-form">
            <p className="sub-form-title">BILLING DETAILS</p>
            <div className="input-group-1">
              <div className="input-container">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Taha.K" />
              </div>

              <div className="input-container">
                <label htmlFor="email-address">Email Address</label>
                <input
                  type="text"
                  id="email-address"
                  placeholder="khoumanitaha23@gmail.com"
                />
              </div>

              <div className="input-container">
                <label htmlFor="phone-number">Phone Number</label>
                <input
                  type="text"
                  id="phone-number"
                  placeholder="+1 111-111-111"
                />
              </div>
            </div>
          </div>
          <div className="sub-form">
            <p className="sub-form-title">SHIPPING INFO</p>
            <div className="input-group-2">
              <div className="input-container" id="address-container">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="2023 Silicon-Valey Avenu"
                />
              </div>

              <div className="input-container">
                <label htmlFor="zip-code">ZIP Code</label>
                <input type="text" id="zip-code" placeholder="X1Z K6N" />
              </div>

              <div className="input-container">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Montreal" />
              </div>

              <div className="input-container">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" placeholder="Canada" />
              </div>
            </div>
          </div>
          <div className="sub-form">
            <p className="sub-form-title">PAYMENT DETAILS</p>
            <div className="input-grou-3">
              <div className="input-container-radio">
                <p id="payment-method">Payment Method</p>
                <label htmlFor="e-money">
                  <input
                    type="radio"
                    name="payment-method"
                    value="e-money"
                    id="e-money"
                  />
                  e-Money
                </label>
                <label htmlFor="cash-on-delivery">
                  <input
                    type="radio"
                    name="payment-method"
                    value="cash-on-delivery"
                    id="cash-on-delivery"
                  />
                  Cash on Delivery
                </label>
              </div>
              <div className="input-container"></div>
            </div>
            <div className="input-group-4">
              <div className="input-container">
                <label htmlFor="e-money-number">e-Money Number</label>
                <input type="text" id="e-money-number" placeholder="01010101" />
              </div>

              <div className="input-container">
                <label htmlFor="e-money-pin">e-Money PIN</label>
                <input type="text" id="e-money-pin" placeholder="0000" />
              </div>
            </div>
          </div>
        </form>
      </section>
      <section id="summary">
        <p>SUMMARY</p>
        <div className="cart-items">{cartItemsEls}</div>
        <div id="total-review">
          <p id="total">
            TOTAL
            <span>{` $ ${total.toLocaleString()}`}</span>
          </p>
          <p id="shipping">
            SHIPPING
            <span> $ 50</span>
          </p>
          <p id="vat">
            VAT (INCLUDED)
            <span> $ {((total * 20) / 100).toLocaleString()}</span>
          </p>
          <p id="grand-total">
            GRAND TOTAL
            <span> $ {(total + 50).toLocaleString()}</span>
          </p>
        </div>
        <button 
          className="button"
          onClick={()=>{
            animateModal()
          }}
        >
          CONTINUE & PAY
        </button>
      </section>
      {
        isModalOpen 
          &&
        <CheckoutModal
          grandTotal={(total+50).toLocaleString()}
          firstItem={cartItemsEls[0]}
          xOthers={items.length-1}
        />
      }
    </div>
  );
}
