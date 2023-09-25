// LIBRARY IMPORT
import { Container, Row, Col } from "react-bootstrap"

// COMPONENTS IMPORT
import FadeTransition from "../Components/FadeTransition"
import BannerSlide from "../Components/BannerSlide"

// FUNCTION IMPORT
import LoginHandle from "../Functions/Login/LoginHandle"

// ASSETS IMPORT
import Logo from "../Assets/server/image/Logo.png"


// ====================== MAIN CODE ========================
const LoginPage = () => {
    return (
        <FadeTransition>
            <Container fluid>
                <Row>
                    <Col xs lg="8" className="align-self-center slider-container">
                        <BannerSlide />
                    </Col>
                    <Col xs lg="4" className="sideBar2 pt-5 ps-5 pe-5">
                        <Row>
                            <div className='Box-Logo text-center '>
                                <img src={Logo} className="Logo" alt="Logo Cybersmart"></img>
                                <h3 className="text-dashboard-white">CYBERSMART</h3>
                                <h6 className="text-dashboard-white">SISTEM INFORMASI KAMPUNG CYBER</h6>
                                <h6 className="text-dashboard-white">DESA CITEUREUP</h6>
                            </div>
                        </Row>
                        <Row>
                            {/* DISINI MEMANGGIL FORM */}
                            <LoginHandle/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </FadeTransition>
    )
}

export default LoginPage;
// ====================== END CODE ========================