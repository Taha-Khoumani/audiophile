//components
import About from "../components/About"
import NavLinks from "../components/NavLinks"
import ProductView from "../components/ProductView"

//redux
import { useSelector } from "react-redux"

export default function Headphones(){
    const {allProductsList} = useSelector(store=>store.products)
    
    let headphonesList = allProductsList.filter(product => product.category === "headphones")
    headphonesList = [...headphonesList.filter(product => product.isNew),...headphonesList.filter(product=>!product.isNew)]
    const headphonesListEl = headphonesList.map((product,index) =>
        <ProductView
            key={product.id} 
            data={{
                categoryImage : product.categoryImage,
                isNew:product.isNew,
                description:product.description,
                name:product.name,
                slug:product.slug,
            }}
            isCat={true}
            isImgRight={index%2!==0}
        />
    )
    return(
        <div id="headphones">
            
            <div className="hr-container"><hr className="hr" /></div>
            <h1 className="cat-h">HEADPHONES</h1>
            <div className="productsListElContainer">
                {headphonesListEl}
            </div>
            <NavLinks isText={false} isNav={false} />
            <About/>
        </div>
    )
}