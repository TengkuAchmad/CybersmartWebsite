// LIBRARY IMPORT
import { Row, Col, Form, InputGroup, Button, Table, Modal, Pagination} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV, FaPowerOff, FaInfo, FaArrowUp } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// ASSETS IMPORT

import ImageComponent from "../../Components/ImageComponent"

const ManageItems = () => {
    // VARIABLE DEFINITION
    const [ dataService, setDataService ] = useState([])

    const [ loading, setLoading ] = useState(true)

    const [ dataShowService, setDataShowService ] = useState([])

    const [ modalShow, setModalShow ] = useState(false)

    const [ modalUpdateShow, setModalUpdateShow ] = useState(false)

    const [ dataJudulService, setDataJudulService ] = useState("")

    const [ formDataUpdate, setFormDataUpdate ] = useState({
        UUID_SE         : "",
        Judul_SE        : "",
        Status_SE       : "",
        Note_SE         : "",
        UUID_AD         : ""
    })

    const resetFormDataUpdate = () => {
        setFormDataUpdate({
            UUID_SE         : "",
            Judul_SE        : "",
            Status_SE       : "",
            Note_SE         : "",
            UUID_AD         : ""
        })
    }

    // PAGINATION SETUP
    const [ currentPage, setCurrentPage ] = useState(1)
    const itemsPerPage = 4

    // ============================ START FUNCTION ============================

    // FETCH DEFINITION
    const fetchDataUpdateService= useCallback((itemId) => {
        const uuid_service = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/ServiceUQControl/${uuid_service}`)
            .then((response) => {
                const dataupdate = response.data.data
                dataupdate.map((item) => {
                    setFormDataUpdate({
                        UUID_SE     : item.UUID_SE,
                        Judul_SE    : item.Judul_SE,
                        Status_SE   : item.Status_SE,
                        Note_SE     : item.Note_SE
                    })
                    setDataJudulService(item.Judul_SE)
                })
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])

    const fetchDataCurrentService = useCallback((itemId) => {
        const uuid_service = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/ServiceUQControl/${uuid_service}`)
            .then((response) => {
                const data = response.data.data
                setDataShowService(data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])

    const fetchDataService = useCallback(() => {
        axios
            .get('https://cybersmartserver.as.r.appspot.com/ServiceControl')
            .then((response) => {
                console.log(response)
                setDataService(response.data.data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])

    // PENANGANAN AUTO LOADING DATA 
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataService()
            setLoading(false)
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataService])

    // PAGINATION CONFIGURATION
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dataService.slice(indexOfFirstItem, indexOfLastItem)

    // CHANGE PAGE HANDLE
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getStatusClass = (action) => {
        if (action === "Ditolak"){
            return "status-reject-product"
        } else if (action === "Disetujui"){
            return "status-approved-product"
        } else if (action === "Ditinjau"){
            return "status-review-product"
        }
    }

    const handleShow = (itemId) => {
        fetchDataCurrentService(itemId)
        resetFormDataUpdate()
        setModalShow(true)
    }

    const handleUpdateShow = (itemId) => {
        fetchDataUpdateService(itemId)
        setModalShow(false)
        setModalUpdateShow(true)
    }

    const handleUpdateChange = (e) => {
        setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value })
    }

    const handleUpdateSubmit = (e, UUID_SE) => {
        e.preventDefault()
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Buat FormData baru untuk mengirim data ke API
        const formDataAPI = new FormData()
        formDataAPI.append("UUID_SE", UUID_SE)
        formDataAPI.append("Status_SE", formDataUpdate.Status_SE)
        formDataAPI.append("Note_SE", formDataUpdate.Note_SE)
        formDataAPI.append("UUID_AD", UUID_AD)

        axios
            .post('https://cybersmartserver.as.r.appspot.com/UpdateService', formDataAPI, {
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
                setModalUpdateShow(false)
            })
            .catch(error => {
                console.error(error)
            })
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
                                Update Status Pengajuan Jasa
                            </div>
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                <Row className="mt-2">
                    <>
                        <Row className="ms-0 ps-0 me-3 mb-3"><h5><b className="text-dashboard-clean">Jasa : {dataJudulService}</b></h5></Row>
                        <Form onSubmit={(e) => handleUpdateSubmit(e, formDataUpdate.UUID_SE)}>
                            <Form.Group className="mb-3" control>
                                <Form.Label className="text-dashboard-clean">Status Pengajuan</Form.Label>
                                <Form.Select name="Status_SE" aria-label="statuspengajuan" value={formDataUpdate.Status_SE} onChange={handleUpdateChange}>
                                    <option className="text-dashboard-clean">Pilih Status Pengajuan</option>
                                    <option className="text-dashboard-clean" value="Disetujui">Disetujui</option>
                                    <option className="text-dashboard-clean" value="Ditinjau">Ditinjau</option>
                                    <option className="text-dashboard-clean" value="Ditolak">Ditolak</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-2" control>
                                <Form.Label className="text-dashboard-clean">Catatan</Form.Label>
                                <textarea class="form-control" rows="3" name="Note_SE" value={formDataUpdate.Note_PD} onChange={handleUpdateChange}></textarea>
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
                            Informasi Jasa
                        </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                <Row className="mt-2">
                    {dataShowService.map((item) => (
                        <>
                            <Col xs lg={5} className="img-product">
                                <ImageComponent fileId={item.Gambar_SE} customClasses={"img-product"}/>
                            </Col>
                            <Col xs lg={7} className="ps-5">
                                <Row>
                                    <Col xs lg={2} className="p-0"><p className={`${getStatusClass(item.Status_SE)}`}>{item.Status_SE}</p></Col>
                                    <Col xs lg={10}><div className="button-cards" onClick={() => handleUpdateShow(item.UUID_SE)}>
                                        <FaPen className="icon-edit"/></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <b className="p-0 mt-2">
                                        <h4 className="text-dashboard">{item.Judul_SE}</h4>
                                    </b>
                                </Row>
                                <Row>
                                    <h6 className="text-dashboard-clean">
                                        Rating {item.Rating_PD}/5 &ensp; | &ensp; {item.Rating_SE} Penilaian
                                    </h6>
                                </Row>
                                <Row><h4 className="text-dashboard-clean mb-3 mt-3">Rp{item.Harga_SE}</h4></Row>
                                <Row >
                                    <Col xs lg={1} className="p-0">
                                        <img src={`/sources/img_user/placeholder-pr.png`} alt="Avatar" className="image-avatar-product"/>
                                    </Col>
                                    <Col xs lg={11} className="p-0 d-flex justify-content-center align-items-center">
                                        <h6 className="text-dashboard-clean mb-0">{item.Email_US}</h6>
                                    </Col>
                                </Row>
                                <Row className="text-dashboard mt-4"> Deskripsi Jasa</Row>
                                <Row className="text-dashboard-clean"><p>{item.Deskripsi_SE}</p></Row>
                            </Col>
                        </>
                    ))}
                </Row>
                </Modal.Body>
        </Modal>
        
        {loading ? (
            <>
            <Row>
                <Col xs lg={3}>
                    <div className="card-product">
                        <Skeleton width={191} height={120} />
                        <div className="text-category-product">
                            <Skeleton width={100} height={15} />
                        </div>
                        <div className="text-title-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        <div className="text-desc-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        
                        <Row className="ps-2 pe-2 d-flex align-items-center justify-content-start">
                            <Col xs lg={10} className="d-flex align-items-center justify-content-start pt-2">
                                <Row className="ps-2 pe-2">
                                    <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                                        <Skeleton width={30} height={30} circle="true"/>
                                    </Col>
                                    <Col xs lg={9} className="d-flex align-items-center justify-content-start ps-1 pe-0 me-0" >
                                        <Row className="justify-content-start ps-2">
                                            <Skeleton width={71} height={20} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs lg={3}>
                    <div className="card-product">
                        <Skeleton width={191} height={120} />
                        <div className="text-category-product">
                            <Skeleton width={100} height={15} />
                        </div>
                        <div className="text-title-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        <div className="text-desc-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        
                        <Row className="ps-2 pe-2 d-flex align-items-center justify-content-start">
                            <Col xs lg={10} className="d-flex align-items-center justify-content-start pt-2">
                                <Row className="ps-2 pe-2">
                                    <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                                        <Skeleton width={30} height={30} circle="true"/>
                                    </Col>
                                    <Col xs lg={9} className="d-flex align-items-center justify-content-start ps-1 pe-0 me-0" >
                                        <Row className="justify-content-start ps-2">
                                            <Skeleton width={71} height={20} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs lg={3}>
                    <div className="card-product">
                        <Skeleton width={191} height={120} />
                        <div className="text-category-product">
                            <Skeleton width={100} height={15} />
                        </div>
                        <div className="text-title-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        <div className="text-desc-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        
                        <Row className="ps-2 pe-2 d-flex align-items-center justify-content-start">
                            <Col xs lg={10} className="d-flex align-items-center justify-content-start pt-2">
                                <Row className="ps-2 pe-2">
                                    <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                                        <Skeleton width={30} height={30} circle="true"/>
                                    </Col>
                                    <Col xs lg={9} className="d-flex align-items-center justify-content-start ps-1 pe-0 me-0" >
                                        <Row className="justify-content-start ps-2">
                                            <Skeleton width={71} height={20} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs lg={3}>
                    <div className="card-product">
                        <Skeleton width={191} height={120} />
                        <div className="text-category-product">
                            <Skeleton width={100} height={15} />
                        </div>
                        <div className="text-title-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        <div className="text-desc-product">
                            <Skeleton width={150} height={15} />
                        </div>
                        
                        <Row className="ps-2 pe-2 d-flex align-items-center justify-content-start">
                            <Col xs lg={10} className="d-flex align-items-center justify-content-start pt-2">
                                <Row className="ps-2 pe-2">
                                    <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                                        <Skeleton width={30} height={30} circle="true"/>
                                    </Col>
                                    <Col xs lg={9} className="d-flex align-items-center justify-content-start ps-1 pe-0 me-0" >
                                        <Row className="justify-content-start ps-2">
                                            <Skeleton width={71} height={20} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            </>
        ) : (
            <>
            <Row>
                {currentItems.map((item) => (
                    <Col xs lg={3} key={item.UUID_SE}>
                        <div className="card-product" onClick={() => {handleShow(item.UUID_SE)}}>
                            <ImageComponent fileId={item.Gambar_SE}/>
                            <div className="text-category-product">
                                {item.Kategori_SE}
                            </div>
                            <div className="text-title-product">
                                {item.Judul_SE}
                            </div>
                            <div className="text-desc-product">
                                {item.Deskripsi_SE}
                            </div>
                            
                            <Row className="ps-2 pe-2 d-flex align-items-center justify-content-start">
                                <Col xs lg={10} className="d-flex align-items-center justify-content-start pt-4">
                                    <Row className="ps-2 pe-2">
                                        <Col xs lg={3} className="d-flex align-items-center justify-content-center">
                                            <span><img src={`/sources/img_user/placeholder-pr.png`} alt="Avatar" className="image-avatar-product"/></span>
                                        </Col>
                                        <Col xs lg={9} className="d-flex align-items-center justify-content-start ps-1 pe-0 me-0" >
                                            <Row className="justify-content-start ps-2">
                                                <p  className={`${getStatusClass(item.Status_SE)}`}>{item.Status_SE}</p>
                                                <p className="m-0 text-dashboard-clean">
                                                    Rating : {item.Rating_SE}/5
                                                </p>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs lg={2} className="d-flex align-items-center justify-content-center button-card mt-2">
                                    <FaArrowUp className="icon-arrow"/>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col xs lg={3} className="d-flex align-items-center">
                    <p className="text-dashboard-clean">Jumlah data : {dataService.length} </p>
                </Col>
                <Col xs lg={9} className="d-flex align-items-center justify-content-end">
                {/* PAGINATION */}
                    <Pagination>
                        {Array(Math.ceil(dataService.length / itemsPerPage)).fill().map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
            </>   
        )}
            
        </>
    )
    // ====================== END HTML CODE ========================
}

export default ManageItems

// ====================== END CODE ========================