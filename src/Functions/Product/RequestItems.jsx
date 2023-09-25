// LIBRARY IMPORT
import { Row, Col, Form, InputGroup, Button, Table, Modal, Pagination, Dropdown, DropdownButton } from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import { FaPen, FaEllipsisV, FaInfo } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

// ASSETS IMPORT
import ImageComponent from "../../Components/ImageComponent"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const RequestItems = () => {
    // VARIABLE DEFINITION
    const [ dataProduct, setDataProduct ] = useState([])

    const [ dataShowProduct, setDataShowProduct ] = useState([])

    const [ modalShow, setModalShow ] = useState(false)

    const [ modalUpdateShow, setModalUpdateShow ] = useState(false)

    const [ dataJudulProduct, setDataJudulProduct ] = useState("")

    const [ formDataUpdate, setFormDataUpdate ] = useState({
        UUID_PD         : "",
        Judul_PD        : "",
        Status_PD       : "",
        Note_PD         : "",
        UUID_AD         : ""
    })

    // FETCH DEFINITION
    const fetchDataUpdateProduct = useCallback((itemId) => {
        const uuid_product = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/ProductUQControl/${uuid_product}`)
            .then((response) => {
                const dataupdate = response.data.data
                dataupdate.map((item) => {
                    setFormDataUpdate({
                        UUID_PD     : item.UUID_PD,
                        Judul_PD    : item.Judul_PD,
                        Status_PD   : item.Status_PD,
                        Note_PD     : item.Note_PD
                    })
                    setDataJudulProduct(item.Judul_PD)
                })
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])

    const fetchDataCurrentProduct = useCallback((itemId) => {
        const uuid_product = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/ProductUQControl/${uuid_product}`)
            .then((response) => {
                const data = response.data.data
                setDataShowProduct(data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])


    const handleShow = (itemId) => {
        fetchDataCurrentProduct(itemId)
        setModalShow(true)
    }

    const handleUpdateShow = (itemId) => {
        fetchDataUpdateProduct(itemId)
        setModalShow(false)
        setModalUpdateShow(true)
    }

    const handleUpdateChange = (e) => {
        setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value })
    }

    const handleUpdateSubmit = (e, UUID_PD) => {
        e.preventDefault()
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Buat FormData baru untuk mengirim data ke API
        const formDataAPI = new FormData();
        formDataAPI.append("UUID_PD", UUID_PD)
        formDataAPI.append("Status_PD", formDataUpdate.Status_PD)
        formDataAPI.append("Note_PD", formDataUpdate.Note_PD)
        formDataAPI.append("UUID_AD", UUID_AD)

        axios
            .post('https://cybersmartserver.as.r.appspot.com/UpdateProduct', formDataAPI, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                const message = response.data.msg
                toast.success(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                  });

                fetchDataUpdateProduct()
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
    const fetchDataProduct = useCallback(() => {
        axios
            .get('https://cybersmartserver.as.r.appspot.com/ProductControl')
            .then((response) => {
                setDataProduct(response.data.data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])


    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        fetchDataProduct()
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataProduct()
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataProduct])

    const getStatusClass = (action) => {
        if (action === "Disetujui"){
            return "status-approved-product"
        } else if (action === "Ditinjau"){
            return "status-review-product"
        } else if (action == "Ditolak"){
            return "status-reject-product"
        }
    }

    // PAGINATION CONFIGURATION
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dataProduct.slice(indexOfFirstItem, indexOfLastItem)

    // CHANGE PAGE HANDLE
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    

    // ============================ END FUNCTION ============================

    // ====================== HTML CODE ========================
    return (
        <>
        <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
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
                        <Row className="ms-0 ps-0 me-3 mb-3"><h5><b className="text-dashboard-clean">Produk : {dataJudulProduct}</b></h5></Row>
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
                            Informasi Produk
                        </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                <Row className="mt-2">
                    {dataShowProduct.map((item) => (
                        <>
                            <Col xs lg={5} className="img-product">
                                <ImageComponent fileId={item.Gambar_PD} customClasses={"img-product"}/>
                            </Col>
                            <Col xs lg={7} className="ps-5">
                                <Row>
                                    <Col xs lg={2} className="p-0"><p className={`${getStatusClass(item.Status_PD)}`}>{item.Status_PD}</p></Col>
                                    <Col xs lg={10}><div className="button-cards" onClick={() => handleUpdateShow(item.UUID_PD)}>
                                        <FaPen className="icon-edit"/></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <b className="p-0 mt-2">
                                        <h4 className="text-dashboard">{item.Judul_PD}</h4>
                                    </b>
                                </Row>
                                <Row>
                                    <h6 className="text-dashboard-clean">
                                        Rating {item.Rating_PD}/5 &ensp; | &ensp; {item.Rating_PD} Penilaian
                                    </h6>
                                </Row>
                                <Row><h4 className="text-dashboard-clean mb-3 mt-3">Rp{item.Harga_PD}</h4></Row>
                                <Row >
                                    <Col xs lg={1} className="p-0">
                                        <img src={`/sources/img_user/placeholder-pr.png`} alt="Avatar" className="image-avatar-product"/>
                                    </Col>
                                    <Col xs lg={11} className="p-0 d-flex justify-content-center align-items-center">
                                        <h6 className="text-dashboard-clean mb-0">{item.Email_US}</h6>
                                    </Col>
                                </Row>
                                <Row className="text-dashboard mt-4"> Deskripsi Produk</Row>
                                <Row className="text-dashboard-clean"><p>{item.Deskripsi_PD}</p></Row>
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
                        <th className="table-head-custom">Nama</th>
                        <th className="table-head-custom">Kategori</th>
                        <th className="table-head-custom">Deskripsi</th>
                        <th className="table-head-custom">Status</th>
                        <th className="table-head-custom">Nama UMKM</th>
                        <th className="table-head-custom">Created</th>
                        <th className="table-head-custom">Last Updated</th>
                        <th className="table-head-custom">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataProduct.map((item, index) => (
                        <tr key={`${index}_${item.UUID_BE}`}>
                            <td className="table-body-custom">{index + 1}.</td>
                            <td className="table-body-custom">{item.Judul_PD}</td>
                            <td className="table-body-custom truncate-text-q">{item.Kategori_PC}</td>
                            <td className="table-body-custom truncate-text-q">{item.Deskripsi_PD}</td>
                            <td className="table-body-custom truncate-text-q">
                                <div className={`${getStatusClass(item.Status_PD)}`}>
                                    {item.Status_PD}
                                </div>
                            </td>
                            <td className="table-body-custom">{item.Nama_IU}</td>
                            <td className="table-body-custom">{item.CreatedAt}</td>
                            <td className="table-body-custom">{item.UpdatedAt}</td>
                            <td className="table-body-custom">
                                <Button variant="primary" size="sm" onClick={() => handleShow(item.UUID_PD)}>Tinjau</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                    <p className="text-dashboard-clean">Jumlah data : {dataProduct.length} </p>
            </Col>
            <Col xs lg={9} className="d-flex align-items-center justify-content-end">
            {/* PAGINATION */}
                <Pagination>
                    {Array(Math.ceil(dataProduct.length / itemsPerPage)).fill().map((_, index) => (
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

export default RequestItems

// ====================== END CODE ========================