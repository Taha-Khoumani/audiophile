import { wichImg } from "./ProductView"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Also(props){
    const {data} = props
    const {winWidth} = useSelector(store=>store.nav)
    const othersListEl = data.map((item,index)=>
        <div className="also-product" key={index}>
            <img src={wichImg(winWidth,item.image)} alt="other-imgs" className="also-img" />
            <p className="also-name">{item.name}</p>
            <Link to={`/audiophile/${item.category}/${item.slug}`}><button className="button">SEE PRODUCT</button></Link>
        </div>
    )
    return(
        <div className="also-con">
            <p className="details-headings">YOU MAY ALSO LIKE</p>
            <section className="also">
                {othersListEl}
            </section>
        </div>
    )
}