//components
import About from "../components/About"
import NavLinks from "../components/NavLinks"
import ProductView from "../components/ProductView"

//redux
import { useSelector } from "react-redux"

export default function Earphones(){
    const {allProductsList} = useSelector(store=>store.products)

    let earphonesList = allProductsList.filter(product => product.category === "earphones")
    earphonesList = [...earphonesList.filter(product => product.isNew),...earphonesList.filter(product=>!product.isNew)]
    const earphonesListEl = earphonesList.map((product,index) =>
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
        <div id="earphones">
            <div className="hr-container"><hr className="hr" /></div>
            <h1 className="cat-h">EARPHONES</h1>
            <div className="productsListElContainer">
                {earphonesListEl}
            </div>
            <NavLinks isText={false} isNav={false}/>
            <About/>
        </div>
    )
}