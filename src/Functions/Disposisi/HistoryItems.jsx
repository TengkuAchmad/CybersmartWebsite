// LIBRARY IMPORT
import { Row, Col, Table, Pagination } from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

// ASSETS IMPORT
import LogoVariant from "../../Assets/server/image/Logo-Variant1.png"

const HistoryItems = () => {
    // VARIABLE DEFINITION
    // Container untuk menampung data
    const [ dataLog, setDataLog ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const itemsPerPage = 7

    // FETCHING DATA
    const fetchDataLog = useCallback(() => {
      axios
        .get('https://cybersmartserver.as.r.appspot.com/GetLogDisposisi')
        .then((response) => {
            setDataLog(response.data.data)
        })
        .catch((error) => {
            console.error("Error:", error)
        }) 
    })

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataLog()
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataLog])

    // PAGINATION CONFIGURATION
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dataLog.slice(indexOfFirstItem, indexOfLastItem)

    // CHANGE PAGE HANDLE
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getStatusClass = (action) => {
        if (action === "Insert Disposisi"){
            return "status-add-news"
        } else if (action === "Delete Disposisi"){
            return "status-delete-news"
        } else if (action === "Activate Disposisi"){
            return "status-activate-news"
        } else if (action === "Deactivate Disposisi"){
            return "status-deactivate-news"
        } else if (action === "Insert Disposisi Entry"){
            return "status-add-news"
        }
    }
    return (
        <>
            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">Admin</th>
                            <th className="table-head-custom">Log Aksi</th>
                            <th className="table-head-custom">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={`${index}_${item.UUID_AD}`}>
                                <td className="table-body-custom">{index + 1}.</td>
                                <td className="table-body-custom">
                                    <span><img src={`/sources/img_admin/${item.Gambar_AI}`} alt="Avatar" className="image-avatar"/></span>
                                    {item.Email_AD}
                                </td>
                                <td className="table-body-custom truncate-text">
                                    <div className={`${getStatusClass(item.Action_AL)}`}>
                                        {item.Action_AL}
                                    </div>
                                </td>
                                <td className="table-body-custom">{item.CreatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Col xs lg={3} className="d-flex align-items-center">
                    <p className="text-dashboard-clean">Jumlah data : {dataLog.length} </p>
                </Col>
                <Col xs lg={9} className="d-flex align-items-center justify-content-end">
                {/* PAGINATION */}
                    <Pagination>
                        {Array(Math.ceil(dataLog.length / itemsPerPage)).fill().map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </> 
    )
}
export default HistoryItems