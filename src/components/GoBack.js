//react-router
import { useNavigate } from "react-router-dom"

export default function GoBack(props){
    const navigate = useNavigate()

    return(
        <div id="go-back-container" style={props.style?props.style:{}}>
            <p  
                className="go-back"
                onClick={()=>{
                    navigate(-1)
                }}
            >
                Go Back
            </p>
        </div>
    )
}