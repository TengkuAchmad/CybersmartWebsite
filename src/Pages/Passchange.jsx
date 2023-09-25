// LIBRARY IMPORT
import { Container, Row, Col } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import FadeTransition from "../Components/FadeTransition"

// FUNCTION IMPORT
import PasschangeHandle from "../Functions/Passreset/PasschangeHandle"

// ====================== MAIN CODE ========================
const Passchange = () => {
    // VARIABEL DEFINITION
    // Navigasi URL
    const navigate = useNavigate()

    // FUNCTION DEFINITION
    const backtoPassreset = () => {
        navigate('/forgotpass')
    }
    
    // ====================== HTML CODE ========================
    return (
        <>
            <FadeTransition>
                <Container fluid id="ForgotPassContainer">
                    <Row className="mb-5">
                        <Col xs="auto" className="d-flex align-items-center">
                            <h6 className="m-0 text-dashboard-white" onClick={backtoPassreset} style={{ cursor: "pointer" }}>Kembali</h6>
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center mt-5">
                        <h2 className="text-dashboard-white">Atur Ulang Kata Sandi Anda</h2>
                        <h5 className="text-dashboard-white-thin">Kode berhasil diverifikasi, silakan atur ulang kata sandi Anda!</h5>
                        <div className="box-forgotpass">
                            <PasschangeHandle />
                        </div>
                    </Row>
                </Container>
            </FadeTransition>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default Passchange
// ====================== END CODE ========================