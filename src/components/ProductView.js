//redux
import { useSelector } from "react-redux"

//react-router
import { Link } from "react-router-dom"

export default function ProductView(props){
    const {slug,name,description,categoryImage,isNew,price,image} = props.data

    const {winWidth} = useSelector(store=>store.nav)

    function wichCatImg(width,img){
        if(width > 767){
            return img.desktop
        } else if(width > 480){
            return img.tablet
        } else{
            return img.mobile
        }
    }

    function wichImg(width,img){
        if(width > 767){
            return  `.${img.desktop}`
        } else if(width > 480){
            return  `.${img.tablet}`
        } else{
            return  `.${img.mobile}`
        }
    }

    function reverse(width){
        if(width > 767 && props.isImgRight){
            return{flexDirection:"row-reverse"}
        }else{
            return {}
        }
    }

    return(
        <div className={props.isCat?"category-product":"category-product-2"} style={reverse(winWidth)}>
            <img 
                className="category-product-img"
                src={props.isCat?wichCatImg(winWidth,categoryImage):wichImg(winWidth,image)}
                // src={wichImg(winWidth,props.isCat?categoryImage:image)}
                alt="product-img" 
            />
            <div className="category-product-text">
                {isNew && <p className={props.isCat?"category-product-text-new":"category-product-text-new-2"}> NEW PRODUCT</p>}
                <p className={props.isCat?"category-product-text-name":"category-product-text-name-2"}>{name}</p>
                <p className={props.isCat?"category-product-text-description":"category-product-text-description-2"}>{description}</p>
                {
                    props.isCat
                    ?
                    <Link to={slug} ><button className="button">SEE PRODUCT</button></Link>
                    :
                    <>
                        <p className="price">$ {price.toLocaleString()}</p>
                        <div className="product-nums">
                            <button>-</button>
                            <p>1</p>
                            <button>+</button>
                        </div>
                        <button className="button">ADD TO CART</button>
                    </>
                }
            </div>
        </div>
    )
}  