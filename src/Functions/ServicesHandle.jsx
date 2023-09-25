// LIBRARY IMPORT
import { Row, Stack } from "react-bootstrap"

import { Link } from "react-router-dom"

import React from "react"

import { useState } from "react"

// COMPONENTS IMPORT
import BoxTitle from "../Components/BoxTitle"

// ====================== MAIN CODE ========================
const ServicesHandle = () => {
    // VARIABLE DEFINITION
    // Container untuk menampung opsi yang dipilih
    const [ selectedOption, setSelectedOption ] = useState(null)

    // HANDLE DEFINITION
    // Mengisi container dengan data
    const handleLinkClick = (data) => {
        setSelectedOption(data)
    }

    // ====================== HTML CODE ========================
    return (
        <>
            <Row className="mt-4 ps-1">
                <BoxTitle text="Layanan" linkto="/services"/>
                <div className="box-wrap-clean">
                    <Stack gap={4}>
                        <Link to={`/services?data=docservices`} onClick={() => handleLinkClick("docservices")}  className={`text-dashboard ${selectedOption === "docservices" ? "selected" : ""}`}>Dokumen & Layanan</Link>
                        <Link to={`/services?data=monitoringservices`} onClick={() => handleLinkClick("monitoringservices")} className={`text-dashboard ${selectedOption === "monitoringservices" ? "selected" : ""}`}>Monitoring Layanan</Link>
                        <Link to={`/services?data=disposisi`} onClick={() => handleLinkClick("disposisi")} className={`text-dashboard ${selectedOption === "disposisi" ? "selected" : ""}`}>Disposisi</Link>
                        <Link to={`/services?data=disposisiverif`} onClick={() => handleLinkClick("disposisiverif")} className={`text-dashboard ${selectedOption === "disposisiverif" ? "selected" : ""}`}>Perlu Disetujui</Link>
                    </Stack>
                </div>
            </Row>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default ServicesHandle
// ====================== END CODE ========================