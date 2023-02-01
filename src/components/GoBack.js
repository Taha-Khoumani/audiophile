//react-router
import { useNavigate } from "react-router-dom"

export default function GoBack(props){
    const navigate = useNavigate()

    return(
        <p  
            style={props.style}
            className="go-back"
            onClick={()=>{
                navigate(-1)
            }}
        >
            Go Back
        </p>
    )
}