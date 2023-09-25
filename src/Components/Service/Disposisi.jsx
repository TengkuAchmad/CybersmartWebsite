// LIBRARY IMPORT
import { Container, Row, Tabs, Tab, } from "react-bootstrap"

// ASSETS IMPORT
import { FaCheckDouble, FaHistory, FaListUl } from "react-icons/fa"

import React from "react";

import ManageItems from "../../Functions/Disposisi/ManageItems"

import RequestDisposisi from "../../Functions/Disposisi/RequestDisposisi"

import HistoryItems from "../../Functions/Disposisi/HistoryItems"

const DocServices = () => {
    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Manajemen Disposisi</h4>
                    <p className="text-dashboard-black">
                        Pusat Manajemen Disposisi
                    </p>
                </Row>

                <Row className="box-wrap2">
                    <Tabs defaultActiveKey="Services" id="fill-tab-example" className="mb-2" fill transition={true}>
                        <Tab eventKey="Services" title={<span className="tab-title"><FaListUl className="tab-icon" /> Pihak Disposisi</span>}>
                            <ManageItems />
                        </Tab>
                        <Tab eventKey="Disposisi" title={<span className="tab-title"><FaCheckDouble className="tab-icon" /> Pengajuan Disposisi</span>}>
                            <RequestDisposisi />
                        </Tab>
                        <Tab eventKey="History" title={<span className="tab-title"><FaHistory className="tab-icon" /> Riwayat</span>}>
                            <HistoryItems />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </>
    )
}
export default DocServices