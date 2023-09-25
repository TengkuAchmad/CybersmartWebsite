// LIBRARY IMPORT
import { Row, Stack } from "react-bootstrap"

import { Link } from "react-router-dom"

import React from "react"

import { useState } from "react"

// COMPONENTS IMPORT
import BoxTitle from "../Components/BoxTitle"

// ====================== MAIN CODE ========================
const ProductsHandle = () => {
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
                <BoxTitle text="Produk & Jasa" linkto="/products"/>
                <div className="box-wrap-clean">
                    <Stack gap={4}>
                        <Link to={`/products?data=produkops`} onClick={() => handleLinkClick("produkops")} className={`text-dashboard ${selectedOption === "produkops" ? "selected" : ""}`}>Manajemen Produk</Link>
                        <Link to={`/products?data=serviceops`} onClick={() => handleLinkClick("serviceops")} className={`text-dashboard ${selectedOption === "serviceops" ? "selected" : ""}`}>Manajemen Jasa</Link>
                    </Stack>
                </div>
            </Row>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default ProductsHandle
// ====================== END CODE ========================