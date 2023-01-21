//components
import About from "../../components/About"
import NavLinks from "../../components/NavLinks"
import CatProduct from "../../components/CatProduct"

//redux
import { useSelector } from "react-redux"

export default function Speakers(){
    const {allProductsList} = useSelector(store=>store.products)
    let speakersList = allProductsList.filter(product => product.category === "speakers")
    speakersList = [...speakersList.filter(product => product.new),...speakersList.filter(product=>!product.new)]
    const speakersListEl = speakersList.map((product,index) =>
        <CatProduct
            key={product.id} 
            data={{
                categoryImage : product.categoryImage,
                isNew:product.new,
                description:product.description,
                name:product.name,
                slug:product.slug,
            }}
            isImgRight={index%2!==0}
        />
    )
    
    return(
        <div id="speakers">
            <div className="hr-container"><hr className="hr" /></div>
            <h1 className="cat-h">SPEAKERS</h1>
            <div className="headphonesListElContainer">
                {speakersListEl}
            </div>
            <NavLinks isText={false} isNav={false} />
            <About/>
        </div>
    )
}