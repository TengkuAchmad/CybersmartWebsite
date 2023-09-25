// LIBRARY IMPORT
import { Container, Row, Col } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

// COMPONENTS IMPORT
import PassresetHandle from "../Functions/Passreset/PassresetHandle"

import FadeTransition from "../Components/FadeTransition"

// ====================== MAIN CODE ========================
const Passreset = () => {
    // VARIABLE DEFINITION
    // Navigasi URL
    const navigate = useNavigate()

    // FUNCTION DEFINITION
    const backtoLogin = () => {
        navigate("/")
    }
    // ====================== HTML CODE ========================
    return (
        <>
            <FadeTransition>
                <Container fluid id="ForgotPassContainer">
                    <Row className="mb-5">
                        <Col xs="auto" className="d-flex align-items-center">
                            <h6 className="m-0 text-dashboard-white-thin" onClick={backtoLogin} style={{ cursor: "pointer" }}>
                                Kembali
                            </h6>
                        </Col>
                    </Row>

                    <Row className="justify-content-center text-center mt-5">
                        <h2 className="text-dashboard-white">Lupa Password?</h2>
                        <h5 className="text-dashboard-white-thin">Kami akan mengirimkan kode OTP ke Email Anda!</h5>
                        <div className="box-forgotpass">
                            <PassresetHandle/>
                        </div>
                    </Row>
                </Container>
            </FadeTransition>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default Passreset
// ====================== END CODE ========================