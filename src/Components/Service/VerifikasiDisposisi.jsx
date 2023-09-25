// LIBRARY IMPORT
import { Container, Row, Col, Form,  Tabs, Tab, } from "react-bootstrap"

// ASSETS IMPORT
import { FaCheckDouble, FaHistory, FaListUl, FaInfo } from "react-icons/fa"

import React from "react";

import RequestDocs from "../../Functions/Monservices/RequestDocs"

import VerifikasiID from "../../Functions/Monservices/VerifikasiID"

import HistoryItems from "../../Functions/Monservices/HistoryItems"

import AcceptDisp from "../../Functions/Monservices/AcceptDisp"

import VerifDisposisi from "../../Functions/VerifDisposisi/VerifDisposisi";

const VerifikasiDisposisi = () => {
    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Daftar Pengajuan Dokumen</h4>
                    <p className="text-dashboard-black">
                        Daftar Pengajuan Dokumen untuk Anda sebagai Disposisi Berkaitan
                    </p>
                </Row>

                <Row className="box-wrap3">
                    <VerifDisposisi />
                </Row>
            </Container>
        </>
    )
}
export default VerifikasiDisposisi