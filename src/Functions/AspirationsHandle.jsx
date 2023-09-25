// LIBRARY IMPORT
import { Row, Stack } from "react-bootstrap"

import { Link } from "react-router-dom"

import React from "react"

import { useState } from "react"

// COMPONENTS IMPORT
import BoxTitle from "../Components/BoxTitle"

// ====================== MAIN CODE ========================
const AspirationsHandle = () => {
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
                <BoxTitle text="Aspirasi" linkto="/aspiration"/>
                <div className="box-wrap-clean">
                    <Stack gap={4}>
                        <Link to={`/aspiration?data=aspirationops`} onClick={() => handleLinkClick("aspirationops")}  className={`text-dashboard ${selectedOption === "aspirationops" ? "selected" : ""}`}>Manajemen Aspirasi</Link>
                    </Stack>
                </div>
            </Row>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default AspirationsHandle
// ====================== END CODE ========================