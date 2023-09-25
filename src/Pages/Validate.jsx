// LIBRARY IMPORT
import { Container, Row, Button } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

// COMPONENTS IMPORT
import FadeTransition from "../Components/FadeTransition.jsx"

// ASSETS IMPORT
import ValidateIcon from "../Assets/server/image/ValidateIcon.png"

// ====================== MAIN CODE ========================
const Validate = () => {
    // VARIABLE DEFINITION
    const navigate = useNavigate()

    // FUNCTION DEFINITION
    const backtoLogin = () => {
        navigate("/")
    }

    // ====================== HTML CODE ========================
    return (
        <>
            <FadeTransition>
                <Container fluid id="ValidateContainer">
                    <Row className="justify-content-center text-center">
                        <img src={ValidateIcon} className="ValidateIcon pb-3" alt="Loading Icon"></img>
                        <h2>Validasi Akun</h2>
                        <h5>Registrasi Akun Anda sedang divalidasi, kami akan mengirimkan <br/>pemberitahuan melalui Email Anda</h5>
                        <div className="box-button">
                            <Button className="ButtonCustom" onClick={backtoLogin}>Kembali</Button>
                        </div>
                    </Row>
                </Container>
            </FadeTransition>
        </>
    )
    // ====================== END HTML CODE ========================
}

export default Validate
// ====================== END CODE ========================