// LIBRARY IMPORT
import { Row, Stack } from "react-bootstrap"

import { Link } from "react-router-dom"

import React from "react"

import { useState } from "react"

// COMPONENTS IMPORT
import BoxTitle from "../Components/BoxTitle"

// ====================== MAIN CODE ========================
const DashboardHandle = () => {
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
                <BoxTitle text="Beranda" linkto="/dashboard"/>
                <div className="box-wrap-clean">
                    <Stack gap={4}>
                        <Link to={`/dashboard?data=beritaops`} onClick={() => handleLinkClick("beritaops")}  className={`text-dashboard ${selectedOption === "beritaops" ? "selected" : ""}`}>Manajemen Berita</Link>
                        <Link to={`/dashboard?data=profileops`} onClick={() => handleLinkClick("profileops")} className={`text-dashboard ${selectedOption === "profileops" ? "selected" : ""}`}>Manajemen Kiat</Link>
                    </Stack>
                </div>
            </Row>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default DashboardHandle
// ====================== END CODE ========================