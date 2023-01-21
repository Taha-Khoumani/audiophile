//redux
import { useSelector } from "react-redux"

export default function CatProduct(props){
    const {slug,name,description,categoryImage,isNew} = props.data

    const {winWidth} = useSelector(store=>store.nav)

    function wichImg(width){
        if(width > 767){
            return categoryImage.desktop
        } else if(width > 480){
            return categoryImage.tablet
        } else{
            return categoryImage.mobile
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
        <div className="category-product" style={reverse(winWidth)}>
            <img 
                className="category-product-img"
                src={wichImg(winWidth)}
                alt="product-img" 
            />
            <div className="category-product-text">
                {isNew && <p className="category-product-text-new"> NEW PRODUCT</p>}
                <p className="category-product-text-name">{name}</p>
                <p className="category-product-text-description">{description}</p>
                <button>SEE PRODUCT</button>
            </div>
        </div>
    )
}