// LIBRARY IMPORT
import { Container, Row, Col } from "react-bootstrap"

// COMPONENTS IMPORT
import BannerSlide from "../Components/BannerSlide"
import FadeTransition from "../Components/FadeTransition"

// FUNCTION IMPORT
import RegisterHandle from "../Functions/Register/RegisterHandle"

// ASSETS IMPORT
import Logo from "../Assets/server/image/Logo.png"

// ====================== MAIN CODE ========================
// MAIN CODE
const RegisterPage = () => {
    return (
        <FadeTransition>
            <Container fluid>
                <Row>
                    <Col xs lg="8" className="align-self-center slider-container">
                        <BannerSlide />
                    </Col>
                    <Col xs lg="4" className="sideBar pt-5 ps-5 pe-5 pb-3">
                        <Row>
                            <div className='Box-Logo text-start'>
                                <Row>
                                    <Col xs lg="2">
                                        <img src={Logo} className="Logo" alt="Logo Cybersmart"></img>
                                    </Col>
                                    <Col>
                                        <Row><h6 className="m-0 p-0 text-dashboard-white">CYBERSMART</h6></Row>
                                        <Row><p className="m-0 text-dashboard-white">SISTEM INFORMASI KAMPUNG CYBER</p></Row>
                                        <Row><p className="m-0 text-dashboard-white">DESA CITEUREUP</p></Row>
                                    </Col>
                                </Row>
                            </div>
                        </Row>

                        <Row>
                            <RegisterHandle />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </FadeTransition>
    )
  }

  export default RegisterPage
// ====================== END CODE ========================