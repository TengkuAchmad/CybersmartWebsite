// LIBRARY IMPORT
import { Container, Row, Col } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

// COMPONENT IMPORT
import OTPHandle from "../Functions/Passreset/OTPHandle"

import FadeTransition from "../Components/FadeTransition"

// ====================== MAIN CODE ========================

const OTPCheck = () => {
    // VARIABLE DEFINITION
    // Navigasi
    const navigate = useNavigate()

    // FUNCTION DEFINITION
    const backtoForgotPass = () => {
        navigate("/forgotpass")
    }

    // ====================== HTML CODE ========================
    return (
        <>
            <FadeTransition>
                <Container fluid id="ForgotPassContainer">
                    <Row className="mb-5">
                        <Col xs="auto" className="d-flex align-items-center">
                            <h6 className="m-0 text-dashboard-white-thin" onClick={backtoForgotPass} style={{ cursor: "pointer" }}>Kembali</h6>
                        </Col>
                    </Row>

                    <Row className="justify-content-center text-center mt-5">
                        <h2 className="text-dashboard-white-thin">Verifikasi Kode OTP</h2>
                        <h5 className="text-dashboard-white">Masukkan kode OTP yang telah kami kirimkan ke Email Anda, <br/> tetap jaga kerahasiaan kode Anda.</h5>
                        <div className="box-forgotpass">
                            <OTPHandle/>
                        </div>
                    </Row>
                </Container>
            </FadeTransition>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default OTPCheck
// ====================== END CODE ========================