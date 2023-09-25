// LIBRARY IMPORT
import { useNavigate } from "react-router-dom"

// ====================== MAIN CODE ========================
const BoxTitle = (props) => {
    // VARIABLE DEFINITION
    // Navigasi URL
    const navigate = useNavigate()

    // HANDLE DEFINITION
    const backtoLink = () => {
        navigate(props.linkto)
    }
    // ====================== HTML CODE ========================
    return (
        <button className="box-wrap-line" onClick={backtoLink}>{props.text}</button>
    )
    // ====================== END HTML CODE ========================
}
export default BoxTitle