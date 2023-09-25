// LIBRARY IMPORT
import { Container, Row, Col, Form,  Tabs, Tab, } from "react-bootstrap"

// ASSETS IMPORT
import { FaCheckDouble, FaHistory, FaListUl, FaInfo } from "react-icons/fa"

import React from "react";

import RequestDocs from "../../Functions/Monservices/RequestDocs"

import VerifikasiID from "../../Functions/Monservices/VerifikasiID"

import HistoryItems from "../../Functions/Monservices/HistoryItems"

import AcceptDisp from "../../Functions/Monservices/AcceptDisp";

const MonitoringServices = () => {
    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Manajemen dan Monitoring Pengajuan Layanan</h4>
                    <p className="text-dashboard-black">
                        Pusat Manajemen dan Monitoring Pengajuan Layanan Administrasi Desa
                    </p>
                </Row>

                <Row className="box-wrap3">
                    <Tabs defaultActiveKey="Request" id="fill-tab-example" className="mb-2" fill transition={true}>
                        <Tab eventKey="Request" title={<span className="tab-title">1. Pengajuan Dokumen</span>}>
                            <RequestDocs />
                        </Tab>
                        <Tab eventKey="Verification" title={<span className="tab-title">2. Pengecekan Berkas </span>}>
                            <VerifikasiID />
                        </Tab>
                        <Tab eventKey="Status" title={<span className="tab-title">3. Status Berkas </span>}>
                            <AcceptDisp />
                        </Tab>
                        <Tab eventKey="Final" title={<span className="tab-title">4. History</span>}>
                            <HistoryItems />
                        </Tab>

                    </Tabs>
                </Row>
            </Container>
        </>
    )
}
export default MonitoringServices