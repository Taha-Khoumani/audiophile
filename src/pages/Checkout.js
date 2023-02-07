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

  // function styleErrors(e){
  //   if(!e.target.validity.valid)
  //     document.querySelector(`[for="${e.target.id}"]`).style.color="#CD2C2C"
  //   else
  //     document.querySelector(`[for="${e.target.id}"]`).style.color = ``
  // }

  function styleErrors(){
    let inputs = Array.from(document.querySelectorAll("[type='text'],[type='email'],[type='tel']"))
    inputs.forEach(input=>{

      //if the input is valid: set normal styling
      if(input.validity.valid && input.classList.contains("invalid-input")){
        input.classList.remove("invalid-input")
        document.querySelector(`[for="${input.id}"]`).classList.remove("invalid-label")
        document.querySelector(`[for="${input.id}"] span`).classList.remove("invalid-message")
      }

      //if the input is invalid: set red styling
      else if(!input.validity.valid && !input.classList.contains("invalid-input")){
        input.classList.add("invalid-input")
        document.querySelector(`[for="${input.id}"]`).classList.add("invalid-label")
        document.querySelector(`[for="${input.id}"] span`).classList.add("invalid-message")
      }
    })
  }

  return (
    <>
      <GoBack style={{backgroundColor:"#F2F2F2"}} />
      <div id="checkout-page">
        <section id="checkout">
          <p className="checkout-header">CHECKOUT</p>
          <form action="" className="form" id="checkout-form" onSubmit={(e)=>e.preventDefault()}>
            <div className="sub-form">
              <p className="sub-form-title">BILLING DETAILS</p>
              <div className="input-group-1">
                <div className="input-container">
                  <label htmlFor="name">
                    Name
                    <span style={{display:"none"}}>required</span> 
                  </label>
                  <input 
                    required
                    type="text" 
                    id="name" 
                    placeholder="Taha.K"
                    name="name"
                    onChange={(e)=>{
                      handleChange(e)
                    }}
                    value={userData.name}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="email-address">Email Address<span style={{display:"none"}}>required</span></label>
                  <input
                    required
                    type="email"
                    name="emailAddress"
                    id="email-address"
                    placeholder="khoumanitaha23@gmail.com"
                    onChange={(e)=>handleChange(e)}
                    value={userData.emailAddress}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="phone-number">Phone Number<span style={{display:"none"}}>required</span></label>
                  <input
                    required
                    type="tel"
                    id="phone-number"
                    placeholder="+1 111-111-111"
                    pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
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
                  <label htmlFor="address">Address<span style={{display:"none"}}>required</span></label>
                  <input
                    required
                    type="text"
                    id="address"
                    placeholder="2023 Silicon-Valey Avenu"
                    name="address"
                    value={userData.address}
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="zip-code">ZIP Code<span style={{display:"none"}}>required</span></label>
                  <input 
                    required
                    type="text" 
                    id="zip-code" 
                    placeholder="X1Z K6N" 
                    pattern="[a-z,A-z]\d[a-z,A-z]\s{0,1}\d[a-z,A-z]\d"
                    name="zipCode"
                    value={userData.zipCode}
                    onChange={(e)=>handleChange(e)}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="city">City<span style={{display:"none"}}>required</span></label>
                  <input 
                    required
                    type="text" 
                    id="city" 
                    placeholder="Montreal" 
                    name="city"
                    value={userData.city}
                    onChange={(e)=>handleChange(e)}  
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="country">Country<span style={{display:"none"}}>required</span></label>
                  <input 
                    required
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
                      required
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
                      required
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
                    <label htmlFor="e-money-number">e-Money Number<span style={{display:"none"}}>required</span></label>
                    <input 
                      required
                      type="text" 
                      id="e-money-number" 
                      placeholder="01010101" 
                      pattern="\d{4,10}"
                      name="eMoneyNumber"
                      value={userData.eMoneyNumber}
                      onChange={(e)=>handleChange(e)}  
                    />
                  </div>

                  <div className="input-container">
                    <label htmlFor="e-money-pin">e-Money PIN<span style={{display:"none"}}>required</span></label>
                    <input 
                      required
                      type="text" 
                      id="e-money-pin" 
                      placeholder="0000" 
                      pattern="\d{4}"
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
          <input
            className="button"
            type="submit"
            onClick={()=>{
              if(document.querySelector("#checkout-form").checkValidity())
                animateModal()
              else
                styleErrors()
            }}
            value="CONTINUE & PAY"
            form="checkout-form"
          />
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
