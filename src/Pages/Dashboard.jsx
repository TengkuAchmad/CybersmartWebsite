// LIBRARY IMPORT
import { Nav, Container, Row, Col } from "react-bootstrap"

import { useLocation, useNavigate } from "react-router-dom"

import { useEffect } from "react"
// COMPONENTS IMPORT
import DashboardHandle from "../Functions/DashboardHandle"

import OptionsHandle from "../Functions/OptionsHandle"

import FadeTransition from "../Components/FadeTransition"

// ASSETS IMPORT
import Profile from "../Assets/server/icon/Profile.png"

import Home from "../Assets/server/icon/Home.png"

import Services from "../Assets/server/icon/Services.png"

import Voice from "../Assets/server/icon/Voice.png"

import Cart from "../Assets/server/icon/Cart.png"

import Version from "../Assets/server/icon/Version.png"

import Settings from "../Assets/server/icon/Settings.png"

// ====================== MAIN CODE ========================
const Dashboard = () => {
    // VARIABLE DEFINITION
    // Variabel untuk mendapatkan data email dari URL
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const dataOptions = searchParams.get("data")
    
    // Variabel untuk navigasi URL
    const navigate = useNavigate()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("access_token") !== null

        if (!isLoggedIn){
            navigate('/')
        }
    }, [navigate])
    
    // ====================== HTML CODE ========================
    return (
        <>
            <FadeTransition>
                <Container fluid className="DashboardContainer">
                    <Row>
                        <Col xs lg="1">
                            <Nav defaultActiveKey="/dashboard" className="flex-column navbar-side pt-3 pb-3 text-center">
                                <Row className='mt-5 mb-3'><Nav.Link href= "/dashboard"><img src={Home} className='icons-active' alt="icon-dashboard"></img>Beranda</Nav.Link></Row>
                                <Row className='mb-3'><Nav.Link href= "/services"><img src={Services} className='icons' alt="icon-dashboard"></img>Layanan</Nav.Link></Row>
                                <Row className='mb-3'><Nav.Link href= "/aspiration"><img src={Voice} className='icons' alt="icon-dashboard"></img>Aspirasi</Nav.Link></Row>
                                <Row className='mb-5'><Nav.Link href= "/products"><img src={Cart} className='icons' alt="icon-dashboard"></img>Produk</Nav.Link></Row>
                                <Row className='mt-2 mb-1'><Nav.Link href= "/logout"><img src={Version} className='icons' alt="icon-dashboard"></img>Keluar</Nav.Link></Row>
                            </Nav>
                        </Col>

                        <Col xs lg="2">
                            <Nav defaultActiveKey="/dashboard" className="flex-column pt-3 pb-3 text-center">
                                <DashboardHandle />
                            </Nav>
                        </Col>

                        <Col xs lg="9" className="pt-4 pb-3 text-center">
                            <OptionsHandle opt={dataOptions}/>
                        </Col>
                    </Row>
                </Container>
            </FadeTransition>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default Dashboard
// ====================== END CODE ========================