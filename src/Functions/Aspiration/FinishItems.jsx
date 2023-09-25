// LIBRARY IMPORT
import { Row, Col, Form, InputGroup, Button, Table, Modal, Toast, ToastContainer, Pagination, Dropdown, DropdownButton } from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import { FaPen, FaEllipsisV, FaInfo } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

// ASSETS IMPORT

import ImageComponent from "../../Components/ImageComponent"

const FinishItems = () => {
    // VARIABLE DEFINITION
    const [ dataAspiration, setDataAspiration ] = useState([])

    const [ dataShowAspiration, setDataShowAspiration ] = useState([])

    const [ modalShow, setModalShow ] = useState(false)

    const [ modalUpdateShow, setModalUpdateShow ] = useState(false)

    const [ dataJudulAspiration, setDataJudulAspiration ] = useState("")

    const [ formDataUpdate, setFormDataUpdate ] = useState({
        UUID_AS         : "",
        Topik_AS        : "",
        Status_AS       : "",
        Aspirasi_AS     : "",
        UUID_AD         : ""
    })

    // FETCH DEFINITION
    const fetchDataUpdateAspiration = useCallback((itemId) => {
        const uuid_asp = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/AspirationUQControl/${uuid_asp}`)
            .then((response) => {
                const dataupdate = response.data.data
                dataupdate.map((item) => {
                    setFormDataUpdate({
                        UUID_AS     : item.UUID_AS,
                        Topik_AS    : item.Topik_AS,
                        Status_AS   : item.Status_AS,
                        Aspirasi_AS : item.Aspirasi_AS  
                    })
                    setDataJudulAspiration(item.Topik_AS)
                })
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])

    const fetchDataCurrentAspiration = useCallback((itemId) => {
        const uuid_asp = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/AspirationUQControl/${uuid_asp}`)
            .then((response) => {
                const data = response.data.data
                setDataShowAspiration(data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])


    const handleShow = (itemId) => {
        fetchDataCurrentAspiration(itemId)
        setModalShow(true)
    }

    const handleUpdateShow = (itemId) => {
        fetchDataUpdateAspiration(itemId)
        setModalShow(false)
        setModalUpdateShow(true)
    }

    const handleUpdateChange = (e) => {
        setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value })
    }

    const handleUpdateSubmit = (e, UUID_AS) => {
        e.preventDefault()
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Buat FormData baru untuk mengirim data ke API
        const formDataAPI = new FormData();
        formDataAPI.append("UUID_AS", UUID_AS)
        formDataAPI.append("Topik_AS", formDataUpdate.Topik_AS)
        formDataAPI.append("Aspirasi_AS", formDataUpdate.Aspirasi_AS)
        formDataAPI.append("Lokasi_AS", formDataUpdate.Lokasi_AS)
        formDataAPI.append("UUID_US", formDataUpdate.Lokasi_AS)
        formDataAPI.append("UUID_AD", UUID_AD)

        axios
            .post('https://cybersmartserver.as.r.appspot.com/UpdateProduct', formDataAPI, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data.msg)
                fetchDataUpdateAspiration()
            })
            .catch(error => {
                console.error(error)
            })
    } 

    // PAGINATION SETUP
    const [ currentPage, setCurrentPage ] = useState(1)
    const itemsPerPage = 4

    // ============================ START FUNCTION ============================
    // FETCH DEFINITION
    const fetchDataAspiration= useCallback(() => {
        axios
            .get('https://cybersmartserver.as.r.appspot.com/AspirationDoneControl')
            .then((response) => {
                setDataAspiration(response.data.data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])


    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        fetchDataAspiration()
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataAspiration()
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataAspiration])

    const getStatusClass = (action) => {
        if (action === "Selesai"){
            return "status-approved-product"
        } else if (action === "Diproses"){
            return "status-review-product"
        }
    }

    // PAGINATION CONFIGURATION
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dataAspiration.slice(indexOfFirstItem, indexOfLastItem)

    // CHANGE PAGE HANDLE
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    

    // ============================ END FUNCTION ============================

    // ====================== HTML CODE ========================
    return (
        <>
         {/* MODAL UPDATE PRODUCT */}
         <Modal size="lg" show={modalUpdateShow} onHide={() =>setModalUpdateShow(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                            <div className="text-dashboard-clean">
                                <span><FaPen className="icon-red"/></span>
                                Update Status Pengajuan Produk
                            </div>
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                <Row className="mt-2">
                    <>
                        <Row className="ms-0 ps-0 me-3 mb-3"><h5><b className="text-dashboard-clean">Produk : {dataJudulAspiration}</b></h5></Row>
                        <Form onSubmit={(e) => handleUpdateSubmit(e, formDataUpdate.UUID_PD)}>
                            <Form.Group className="mb-3" control>
                                <Form.Label className="text-dashboard-clean">Status Pengajuan</Form.Label>
                                <Form.Select name="Status_PD" aria-label="statuspengajuan" value={formDataUpdate.Status_PD} onChange={handleUpdateChange}>
                                    <option className="text-dashboard-clean">Pilih Status Pengajuan</option>
                                    <option className="text-dashboard-clean" value="Disetujui">Disetujui</option>
                                    <option className="text-dashboard-clean" value="Ditinjau">Ditinjau</option>
                                    <option className="text-dashboard-clean" value="Ditolak">Ditolak</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2" control>
                                <Form.Label className="text-dashboard-clean">Catatan</Form.Label>
                                <textarea class="form-control" rows="3" name="Note_PD" value={formDataUpdate.Note_PD} onChange={handleUpdateChange}></textarea>
                            </Form.Group>
                            <Row className="text-dashboard-clean ms-2 mb-4"><p>Catatan : Tindakan ini akan mengirimkan informasi meneganai status pengajuan produk kepada pengguna.</p></Row>
                            <div>
                                <ButtonSecondary text="Kirim" type="submit"></ButtonSecondary>
                            </div>
                        </Form>
                    </>
                </Row>
            </Modal.Body>
        </Modal>

        {/* MODAL SHOW PRODUCT */}
        <Modal size="lg" show={modalShow} onHide={() =>setModalShow(false)} aria-labelledby="modal">
            <Modal.Header closeButton >
                <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean">
                            <span><FaInfo className="icon-show"/></span>
                            Detail Aspirasi
                        </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                <Row className="mt-2">
                    {dataShowAspiration.map((item) => (
                        <>
                            <Col xs lg={5}>
                                <ImageComponent fileId={item.Gambar_AS} customClasses={"img-product"}/>
                            </Col>
                            <Col xs lg={7} className="ps-3">
                                <Row>
                                    <Col xs lg={2} className="p-0"><p className={`${getStatusClass(item.Status_AS)}`}>{item.Status_AS}</p></Col>
                                    <Col xs lg={10}><div className="button-cards" onClick={() => handleUpdateShow(item.UUID_AS)}>
                                        <FaPen className="icon-edit"/></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <b className="p-0 mt-2">
                                        <h4 className="text-dashboard">{item.Topik_AS}</h4>
                                    </b>
                                </Row>
                                <Row>
                                    <h6 className="text-dashboard-clean">
                                        {item.Aspirasi_AS}
                                    </h6>
                                </Row>
                                <Row><p className="text-dashboard-clean mb-3 mt-3">Lokasi : {item.Lokasi_AS}</p></Row>
                                <Row><p>Dikirim oleh : {item.NamaLengkap_UI}</p></Row>
                                <Row><p>Pada : {item.CreatedAt}</p></Row>
                            </Col>
                        </>
                    ))}
                </Row>
                </Modal.Body>
        </Modal>
        <Row>
            <Table hover>
                <thead >
                    <tr>
                        <th className="table-head-custom">No.</th>
                        <th className="table-head-custom">Topik</th>
                        <th className="table-head-custom">Aspirasi</th>
                        <th className="table-head-custom">Lokasi</th>
                        <th className="table-head-custom">Status</th>
                        <th className="table-head-custom">Created</th>
                        <th className="table-head-custom">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAspiration.map((item, index) => (
                        <tr key={`${index}_${item.UUID_AS}`}>
                            <td className="table-body-custom">{index + 1}.</td>
                            <td className="table-body-custom">{item.Topik_AS}</td>
                            <td className="table-body-custom truncate-text-q">{item.Aspirasi_AS}</td>
                            <td className="table-body-custom truncate-text-q">{item.Lokasi_AS}</td>
                            <td className="table-body-custom truncate-text-q">
                                <div className={`${getStatusClass(item.Status_AS)}`}>
                                    {item.Status_AS}
                                </div>
                            </td>
                            <td className="table-body-custom">{item.CreatedAt}</td>
                            <td className="table-body-custom">{item.UpdatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                    <p className="text-dashboard-clean">Jumlah data : {dataAspiration.length} </p>
            </Col>
            <Col xs lg={9} className="d-flex align-items-center justify-content-end">
            {/* PAGINATION */}
                <Pagination>
                    {Array(Math.ceil(dataAspiration.length / itemsPerPage)).fill().map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Col>
        </Row>    
            
        </>
    )
    // ====================== END HTML CODE ========================
}

export default FinishItems

// ====================== END CODE ========================