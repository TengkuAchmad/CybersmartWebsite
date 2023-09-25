// LIBRARY IMPORT
import { Container, Row, Col, Button} from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import { useNavigate } from "react-router-dom"

// ASSETS IMPORT
import Success from "../Assets/server/image/Success.png"

// COMPONENTS IMPORT
import FadeTransition from "../Components/FadeTransition"


// ====================== MAIN CODE ========================
const Passresetstate = () => {
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
                            <h5 className="m-0 text-dashboard-white-thin" onClick={backtoLogin} style={{ cursor: "pointer" }}>Kembali</h5>
                        </Col>
                    </Row>

                    <Row className="justify-content-center text-center mt-5">
                        <img src={Success} className="SuccessIcon" alt="Success Icon"></img>
                        <h2 className="text-dashboard-white">Hooray, Kata Sandi Anda berhasil diperbarui</h2>
                        <h5 className="text-dashboard-white-thin">Selalu ganti kata sandi Anda secara berkala!</h5>
                        <div className="box-forgotpass">
                            <Button className="ButtonCustom mt-5" type="button" onClick={backtoLogin}>
                                Coba Masuk
                            </Button>
                        </div>
                    </Row>
                </Container>
            </FadeTransition>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default Passresetstate

// ====================== END CODE ========================