//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"
import ProductView from "../../components/ProductView"

//redux
import { useSelector } from "react-redux"

export default function Speakers(){
    const {allProductsList} = useSelector(store=>store.products)
    let speakersList = allProductsList.filter(product => product.category === "speakers")
    speakersList = [...speakersList.filter(product => product.isNew),...speakersList.filter(product=>!product.isNew)]
    const speakersListEl = speakersList.map((product,index) =>
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
        <div id="speakers">
            <div className="hr-container"><hr className="hr" /></div>
            <h1 className="cat-h">SPEAKERS</h1>
            <div className="productsListElContainer">
                {speakersListEl}
            </div>
            <NavLinks isText={false} isNav={false} />
            <About/>
        </div>
    )
}