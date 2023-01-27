//redux
import { useSelector } from "react-redux"

//react-router
import { Link } from "react-router-dom"

//react
import { useState } from "react"


export default function ProductView(props){

    const {slug,name,description,categoryImage,isNew,price,image} = props.data
    // console.log(cartImg)

    const [currentQuantity,setCurrentQuantity] = useState(1)

    // const {handleClickAdd} = props.functions
    

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
                            <button
                                onClick={()=>{
                                    if(currentQuantity > 1){
                                        setCurrentQuantity(prevQ=>prevQ-1)
                                    }
                                }}
                            >
                                -
                            </button>
                            <p>{currentQuantity}</p>
                            <button
                                onClick={()=>setCurrentQuantity(prevQ=>prevQ+1)}
                            >
                                +
                            </button>
                        </div>
                        <button 
                            className="button" 
                            onClick={()=>{
                                props.functions.handleClickAdd(slug,name,price,currentQuantity)
                                setCurrentQuantity(1)
                            }}
                        >
                            ADD TO CART
                        </button>
                    </>
                }
            </div>
        </div>
    )
}  

export function wichImg(width,img){
    if(width > 767){
        return  `.${img.desktop}`
    } else if(width > 480){
        return  `.${img.tablet}`
    } else{
        return  `.${img.mobile}`
    }
}