//redux
import { useSelector,useDispatch } from "react-redux";

//react-hooks
import { useEffect ,useState} from "react";

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

  function styleErrors(){
    let inputs = Array.from(document.querySelectorAll("[type='text'],[type='email'],[type='tel']"))
    inputs.forEach(input=>{

      document.querySelector(`[for="${input.id}"] span`).innerText = userData[input.name].length > 0 ? "Wrong Format" : "Required"

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
        
        // document.querySelector(`[for="${input.id}"] span`).innerText = userData[input.name].length > 0 ? "Wrong Format" : "Required"
      }

    })
  }

  function styleErrorsSelect(e){
    let input = e
    if(input.value !== "default" && input.classList.contains("invalid-input")){
      input.classList.remove("invalid-input")
      document.querySelector(`[for="${input.id}"]`).classList.remove("invalid-label")
      document.querySelector(`[for="${input.id}"] span`).classList.remove("invalid-message")
    }

    //if the input is invalid: set red styling
    else if(input.value === "default" && !input.classList.contains("invalid-input")){
      input.classList.add("invalid-input")
      document.querySelector(`[for="${input.id}"]`).classList.add("invalid-label")
      document.querySelector(`[for="${input.id}"] span`).classList.add("invalid-message")
    }
  }

  function styleErrorsRadio(){
    let header = document.querySelector("#payment-method")
    let eMoney = document.querySelector("[for='e-money']")
    let cashOnDelivery = document.querySelector("[for='cash-on-delivery']")
    let required = document.querySelector("#payment-method span")

    if(userData.paymentMethod && header.classList.contains("invalid-label")){
      header.classList.remove("invalid-label")
      eMoney.classList.remove("invalid-input")
      cashOnDelivery.classList.remove("invalid-input")
      required.classList.remove("invalid-message")
    }

    //if the input is invalid: set red styling
    else if(userData.paymentMethod === "" && !header.classList.contains("invalid-label")){
      header.classList.add("invalid-label")
      eMoney.classList.add("invalid-input")
      cashOnDelivery.classList.add("invalid-input")
      required.classList.add("invalid-message")
    }
  }

  const [autocomplete,setAutocomplete] = useState([])

  useEffect(()=>{
    if(userData.address.length > 0){
      var requestOptions = {
        method: 'GET'
      };
      
      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${userData.address}&apiKey=b414fc770853448288f2b7b9331d17b4`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          setAutocomplete((
            result.features.map(place=>{
              return {
                address:place.properties.address_line1,
                state:place.properties.state,
                country:place.properties.country,
                city:place.properties.city,
              }
            })
          ))

        })
        .catch(error => console.log('error', error));
    } else{
      setAutocomplete([])
    }

  },[userData.address])

  const addressAutoEls = autocomplete.map((option,index)=>
    <p 
      key={index}
      onClick={()=>{
        dispatch(setData({name:"address",value:option.address}))
        dispatch(setData({name:"country",value:option.country}))
        dispatch(setData({name:"city",value:option.city}))
      }}
    >
      <i className="fa-solid fa-location-dot"></i>
      <span>
        {`${option.address}`}
        <span className="span">{` ${option.state && option.state !== option.address ? ", "+option.state:""} ${", " + option.country && option.country !== option.address? ", "+option.country:""}`}</span>
      </span>
    </p>  
  )

  const [addressStyle,setaddressStyle] = useState(
    document.activeElement === document.getElementById("address") ? 
    {display:"block"} :
    {display:"none"} 
  )

  // useEffect(()=>{
  //   setaddressStyle(
  //     document.activeElement === document.getElementById("address") ? 
  //     {display:"block"} :
  //     {display:"none"}
  //   )
  //   // eslint-disable-next-line
  // },[document.activeElement])

  return (
    <>
      <GoBack style={{backgroundColor:"#F2F2F2"}} />
      <div id="checkout-page"
        onClick={()=>{
          setaddressStyle(
            document.activeElement === document.getElementById("address") ? 
            {display:"block"} :
            {display:"none"}
          )
        }}
      >
        <section id="checkout">
          <p className="checkout-header">CHECKOUT</p>
          <form action="" className="form" id="checkout-form" onSubmit={(e)=>e.preventDefault()}>
            <div className="sub-form">
              <p className="sub-form-title">BILLING DETAILS</p>
              <div className="input-group-1">
                <div className="input-container">
                  <label htmlFor="name">
                    Name
                    <span style={{display:"none"}}></span> 
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
                    <label htmlFor="email-address">
                      Email Address
                      <span style={{display:"none"}}>                      
                          {
                            document.getElementById("email-address")?
                            "Wrong format" :
                            "required"
                          }
                        </span>
                    </label>
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
                  <label htmlFor="phone-number">
                    Phone Number
                    <span style={{display:"none"}}></span>
                  </label>
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
                  <div id="addreess-autocomplete-container">
                    <input
                      autoComplete="new-user-street-address"
                      required
                      type="text"
                      id="address"
                      placeholder="2023 Silicon-Valey Avenu"
                      name="address"
                      value={userData.address}
                      onChange={(e)=>handleChange(e)}
                    />
                    {
                      autocomplete.length > 0 && userData.address.length > 0 &&
                      <div 
                        id="address-autocomplete" 
                        style={addressStyle}
                      >
                        {addressAutoEls}
                      </div>
                    }
                  </div>
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

                <div className="input-container" id="country-container">
                  <label htmlFor="country">Country<span style={{display:"none"}}>required</span></label>
                  <select 
                    required
                    id="country"
                    name="country"
                    value={userData.country}
                    // defaultValue={"default"}
                    onChange={(e)=>{
                      handleChange(e) 
                    }}
                  >
                    <option value="default" >---Select-your-country---</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo">Congo, the Democratic Republic of the</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan">France, Metropolitan</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                    <option value="Holy See">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia, Federated States of</option>
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                    <option value="Saint LUCIA">Saint LUCIA</option>
                    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                    <option value="Span">Spain</option>
                    <option value="SriLanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Viet Nam</option>
                    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>

              </div>
            </div>
            <div className="sub-form">
              <p className="sub-form-title">PAYMENT DETAILS</p>
              <div className="input-grou-3">
                <div className="input-container-radio">
                  <p id="payment-method">Payment Method <span style={{display:"none"}}>Required</span></p>
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
          {
            userData.paymentMethod === "cashOnDelivery" &&
            <div id="cash-on-delivery-details">
              <img src="./assets/checkout/icon-cash-on-delivery.svg" alt="cash-on-delivery-icon" />
              <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
            </div>
          }
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
                styleErrorsSelect(document.querySelector("select"))
                styleErrorsRadio()
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
