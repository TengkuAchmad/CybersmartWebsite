// LIBRARY IMPORT
import { Container, Row, Tabs, Tab } from "react-bootstrap"

import { useState, useEffect } from "react"

import axios from "axios"


// ASSETS IMPORT
import { FaCheckDouble, FaListUl, FaHistory, FaSearch } from "react-icons/fa"

import ManageItems from "../../Functions/Quotes/ManageItems"

import HistoryItems from "../../Functions/Quotes/HistoryItems"

// ====================== MAIN CODE ========================
const QuoteOptions = () => {

    // ====================== HTML CODE ========================
    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Manajemen Profil dan Kiat</h4>
                    <p className="text-dashboard-black">
                        Tambahkan Profil dan Kiat agar tampil pada Aplikasi
                    </p>
                </Row>

                {/* LIST KONTEN KIAT */}
                <Row className="box-wrap2">
                    <Tabs defaultActiveKey="Manage" id="fill-tab-example" className="mb-2" fill transition={true}>
                        <Tab eventKey="Manage" title={<span className="tab-title"><FaListUl className="tab-icon" /> All Items</span>}>
                            <ManageItems />
                        </Tab>
                        <Tab eventKey="Banner" title={<span className="tab-title"><FaHistory className="tab-icon" /> History</span>}>
                            <HistoryItems />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default QuoteOptions
// ====================== END CODE ========================