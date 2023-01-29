export default function Checkout() {
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
      <section id="summary"></section>
    </div>
  );
}
