//react-router
import { useParams } from "react-router-dom"

//redux
import { useSelector } from "react-redux";

//components
import ProductView from "./ProductView.js";


export default function Product(){
    const {productSlug} = useParams();
    const {allProductsList} = useSelector(store=>store.products)
    const {name,description,image,isNew,price} = allProductsList.find(product=>product.slug===productSlug)

    return(
        allProductsList.some(product => product.slug === productSlug)
        ?
        <div className="product">
            <ProductView
                data={{
                    image,
                    isNew,
                    description,
                    name,
                    price,
                }}
                isCat={false}
            />
        </div>
        :
        <h1>error 404 :/</h1>
    )
}