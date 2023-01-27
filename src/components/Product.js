//react-router
import { useParams } from "react-router-dom"

//redux
import { useSelector,useDispatch } from "react-redux";

//components
import ProductView from "./ProductView.js";
import Also from "./Also.js";

//reducers
import { addItem } from "../features/cartSlice.js";

export default function Product(){
    const dispatch = useDispatch()
    const {productSlug} = useParams();
    const {allProductsList} = useSelector(store=>store.products)
    const {winWidth} = useSelector(store=>store.nav)
    const {name,description,image,isNew,price,gallery,features,includes,others,slug,cartImg} = allProductsList.find(product=>product.slug===productSlug)
    function wichImg(width,img){
        if(width > 767){
            return  `.${img.desktop}`
        } else if(width > 480){
            return  `.${img.tablet}`
        } else{
            return  `.${img.mobile}`
        }
    }
    const inBox = includes.map((thing,index)=>
        <div className="thing-con" key={index}>
            <span>{thing.quantity}x</span>
            <p className="details-text" >{thing.item}</p>
        </div>
    )
    function handleClickAdd(slug,name,price,quantity,cartImg){
        dispatch(addItem({slug,name,price,quantity,cartImg}))
    }
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
                    slug,
                    cartImg,
                }}
                isCat={false}
                functions={{
                    handleClickAdd,
                }}
            />
            <section className="product-details">
                <div className="features">
                    <p className="details-headings">FEATURES</p>
                    <p className="details-text">{features}</p>
                </div>
                <div className="in-box">
                    <p className="details-headings">IN THE BOX</p>
                    <div className="includes">
                        {inBox}
                    </div>
                </div>
            </section>
            <section className="gallery">
                <img className="gallery-first" src={wichImg(winWidth,gallery.first)} alt="gallery-imgs" />
                <img className="gallery-second" src={wichImg(winWidth,gallery.second)} alt="gallery-imgs" />
                <img className="gallery-third" src={wichImg(winWidth,gallery.third)} alt="gallery-imgs" />
            </section>
            <Also data={others}/>
        </div>
        :
        <h1>error 404 :/</h1>
    )
}