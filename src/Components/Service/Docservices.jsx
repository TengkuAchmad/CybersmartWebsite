// LIBRARY IMPORT
import { Container, Row, Tabs, Tab, } from "react-bootstrap"

// ASSETS IMPORT
import { FaCheckDouble, FaHistory, FaListUl } from "react-icons/fa"

import React from "react";

import ManageSrvcs from "../../Functions/Docservices/ManageSrvcs"

import ManageRequrst from "../../Functions/Docservices/ManageRequrst"

import HistoryItems from "../../Functions/Docservices/HistoryItems"
const DocServices = () => {
    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Manajemen Dokumen dan Layanan Desa</h4>
                    <p className="text-dashboard-black">
                        Pusat Manajemen Pelayanan Administrasi Desa
                    </p>
                </Row>

                <Row className="box-wrap2">
                    <Tabs defaultActiveKey="Services" id="fill-tab-example" className="mb-2" fill transition={true}>
                        <Tab eventKey="Services" title={<span className="tab-title"><FaListUl className="tab-icon" /> Pelayanan</span>}>
                            <ManageSrvcs />
                        </Tab>
                        <Tab eventKey="Disposisi" title={<span className="tab-title"><FaCheckDouble className="tab-icon" /> Persyaratan</span>}>
                            <ManageRequrst />
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