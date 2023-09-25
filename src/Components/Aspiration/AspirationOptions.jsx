// LIBRARY IMPORT
import { Container, Row, Col, Form, Button, InputGroup, Tabs, Tab } from "react-bootstrap"

import { useState, useEffect } from "react"

import axios from "axios"


// ASSETS IMPORT
import { FaCheckDouble, FaListUl, FaHistory, FaSearch } from "react-icons/fa"

import RequestItems from "../../Functions/Aspiration/RequestItems"

import FinishItems from "../../Functions/Aspiration/FinishItems"

import HistoryItems from "../../Functions/Aspiration/HistoryItems"

// ====================== MAIN CODE ========================
const AspirationOptions = () => {

    // ====================== HTML CODE ========================
    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Manajemen Aspirasi</h4>
                    <p className="text-dashboard-black">
                        Pusat Manajemen Aspirasi
                    </p>
                </Row>

                {/* LIST KONTEN KIAT */}
                <Row className="box-wrap2">
                    <Tabs defaultActiveKey="Request" id="fill-tab-example" className="mb-2" fill transition={true}>
                        <Tab eventKey="Request" title={<span className="tab-title"><FaListUl className="tab-icon" /> Aspirasi Masuk</span>}>
                            <RequestItems />
                        </Tab>
                        <Tab eventKey="Finish" title={<span className="tab-title"><FaListUl className="tab-icon" /> Aspirasi Selesai</span>}>
                            <FinishItems />
                        </Tab>
                        <Tab eventKey="History" title={<span className="tab-title"><FaHistory className="tab-icon" /> History</span>}>
                            <HistoryItems />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default AspirationOptions
// ====================== END CODE ========================