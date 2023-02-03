//redux
import { useSelector,useDispatch } from "react-redux";

//imgs
import { cartImgs } from "../components/Cart";

//components
import CheckoutModal from "../components/CheckoutModal"
import GoBack from "../components/GoBack";

//reducers
import { toggleModal } from "../features/cartSlice";
import { setData } from "../features/userDataSlice";

export default function Checkout() {

  const {winWidth} = useSelector(store=>store.nav)

  const {userData} = useSelector(store=>store)

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

function handleChange(e){
  const {name,value} = e.target
  dispatch(setData({name,value}))
}

  return (
    <>
      <GoBack style={{backgroundColor:"#F2F2F2"}} />
      <div id="checkout-page">
        <section id="checkout">
          <p className="checkout-header">CHECKOUT</p>
          <form action="" className="form">
            <div className="sub-form">
              <p className="sub-form-title">BILLING DETAILS</p>
              <div className="input-group-1">
                <div className="input-container">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Taha.K"
                    name="name"
                    onChange={(e)=>handleChange(e)}
                    value={userData.name}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="email-address">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    id="email-address"
                    placeholder="khoumanitaha23@gmail.com"
                    onChange={(e)=>handleChange(e)}
                    value={userData.emailAddress}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="phone-number">Phone Number</label>
                  <input
                    type="text"
                    id="phone-number"
                    placeholder="+1 111-111-111"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={(e)=>handleChange(e)}
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
                    name="address"
                    value={userData.address}
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="zip-code">ZIP Code</label>
                  <input 
                    type="text" 
                    id="zip-code" 
                    placeholder="X1Z K6N" 
                    name="zipCode"
                    value={userData.zipCode}
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    placeholder="Montreal" 
                    name="city"
                    value={userData.city}
                    onChange={(e)=>handleChange(e)}  
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="country">Country</label>
                  <input 
                    type="text" 
                    id="country" 
                    placeholder="Canada" 
                    name="country"
                    value={userData.country}
                    onChange={(e)=>handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="sub-form">
              <p className="sub-form-title">PAYMENT DETAILS</p>
              <div className="input-grou-3">
                <div className="input-container-radio">
                  <p id="payment-method">Payment Method</p>
                  <label 
                    htmlFor="e-money"
                    style={userData.paymentMethod === "eMoney" ? {borderColor: "#d87d4a",borderWidth: "2px"} :{}}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="eMoney"
                      id="e-money"
                      checked={userData.paymentMethod === "eMoney"}
                      onChange={(e)=>handleChange(e)}
                    />
                    e-Money
                  </label>
                  <label 
                    htmlFor="cash-on-delivery"
                    style={userData.paymentMethod === "cashOnDelivery" ? {borderColor: "#d87d4a",borderWidth: "2px"} :{}}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      id="cash-on-delivery"
                      checked={userData.paymentMethod === "cashOnDelivery"}
                      onChange={(e)=>handleChange(e)}
                    />
                    Cash on Delivery
                  </label>
                </div>
                <div className="input-container"></div>
              </div>
              {
                userData.paymentMethod === "eMoney" &&
                <div className="input-group-4">
                  <div className="input-container">
                    <label htmlFor="e-money-number">e-Money Number</label>
                    <input 
                      type="text" 
                      id="e-money-number" 
                      placeholder="01010101" 
                      name="eMoneyNumber"
                      value={userData.eMoneyNumber}
                      onChange={(e)=>handleChange(e)}  
                    />
                  </div>

                  <div className="input-container">
                    <label htmlFor="e-money-pin">e-Money PIN</label>
                    <input 
                      type="text" 
                      id="e-money-pin" 
                      placeholder="0000" 
                      name="eMoneyPin"
                      value={userData.eMoneyPin}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                </div>
              }
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
    </>
  );
}
