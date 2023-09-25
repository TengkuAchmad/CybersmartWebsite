import React from "react"

import { Row, Col, Form, InputGroup, Button, Table, Modal, Toast, ToastContainer, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import LogoVariant from "../../Assets/server/image/Logo-Variant1.png"

const ManageRequrst = () =>{
    // VARIABLE DEFINITION
    const [ dataRequirements, setDataRequirements ] = useState([])
    
    const [ loading, setLoading ] = useState(true)

    const [ data, setData ] = useState(null)

    const [ showToast, setShowToast ] = useState(false)

    const [ deleteItemId, setDeleteItemId ] = useState(null)
    
    const [ modalInsert, setModalInsert ] = useState(false)

    const [ modalUpdate, setModalUpdate ] = useState(false)

    const [ isSending, setIsSending ] = useState(false)

    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)

    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        UUID_DRD         : "",
        Req_Data        : ""
    })

    const resetFormData = () => {
        setFormData({
          UUID_DRD: "",
          Req_Data:""
        })
    }

    // GET UPDATE DATA
    const fetchDataUpdateReq = useCallback((itemId) => {
        const uuid_req = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/GetCurrentReq/${uuid_req}`)
            .then((response) => {
                const data = response.data.data
                console.log(data)
                setFormData({
                    UUID_DRD  : data.UUID_DRD,
                    Req_Data  : data.Req_Data,
                    CreatedAt : data.CreatedAt,
                    UpdatedAt : data.UpdatedAt
                })
            })
            .catch((error) => {
                console.log("Error:" , error)
            })
    })

    // GET ALL DATA 
    const fetchDataRequirements = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/RequirementsControl")
            .then((response) => {
                setDataRequirements(response.data.data)
            })
            .catch((error) => {
                console.log("Error:" , error)
            })
    })


    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataRequirements()
            setLoading(false)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataRequirements])

    // HANDLE DEFINITION
    // HANDLE TO UPDATE
    const handleUpdate = (itemId) => {
        fetchDataUpdateReq(itemId)
        setModalUpdate(true)
    }

    const handleUpdateChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleUpdateSubmit = (e, UUID_DRD) => {
        e.preventDefault()

        setIsSending(true)

        const UUID_AD = localStorage.getItem('UUID_AD')
        
        // Buat FormData baru untuk mengirim data ke API
        const formDataAPI = new FormData();
        formDataAPI.append("UUID_DRD", UUID_DRD)
        formDataAPI.append("Req_Data", formData.Req_Data)
        formDataAPI.append("UUID_AD", UUID_AD)
        
        axios
            .put('https://cybersmartserver.as.r.appspot.com/RequirementsControl', formDataAPI, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then((response) => {
                const message = response.data
                console.log(message)
                setIsSending(false)
                setModalUpdate(false)
                fetchDataRequirements()
            })
            .catch(error => {
                console.error(error)
            })
    }

    // HANDLE TO SUBMIT
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        // Reset Container
        e.preventDefault()
        
        setIsSending(true)

        const UUID_AD = localStorage.getItem('UUID_AD')
        
        const form  = new FormData()
        form.append('Req_Data', formData.Req_Data)
        form.append('UUID_AD', UUID_AD)

        axios
            .post('https://cybersmartserver.as.r.appspot.com/RequirementsControl', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then((response) => {
                const message = response.data
                setIsSending(false)
                setModalInsert(false)
                fetchDataRequirements()
            })
            .catch((error) => {
                setIsSending(false)
                const message = error.response.data
                console.error(message)

            })
    }

    // FUNCTIONS TO DELETE DATA
    // FUNCTION TO DELETE BERITA
    const handleDeleteConfirmation = (itemId) => {
        setDeleteItemId(itemId)
        setShowDeleteConfirmation(true)
    }

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false)
        setDeleteItemId(null)
    }

    const handleDelete = (uuid) => {
        handleDeleteConfirmation(uuid)
    }

    const handleDeleteConfirm = () => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_DRD", deleteItemId)
        formData.append("UUID_AD", uuidad)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeleteRequirements", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
          })
            .then((response) => {
                const message = response.data.msg
                console.log(message)
                setData(message)
                fetchDataRequirements()
                setShowToast(true)
                
            })
            .catch((error) => {
                console.error("Error:", error)
            })

            .finally(() => {
                handleDeleteCancel()
            })
    }


    return (
        <>
            {/* TOAST SET UP */}
            <ToastContainer className="p-3" position="top-end" style={{ zIndex:1 }}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg='light'>
                    <Toast.Header>
                        <img src={LogoVariant} className="rounded me-2 LogoToaster" alt="Logo"/>
                        <strong className="me-auto toast-text">Cybersmart Web Admin</strong>
                        <small className="toast-text">Just now</small>
                    </Toast.Header>
                    <Toast.Body className="toast-text">{data}</Toast.Body>
                </Toast>
            </ToastContainer>

             {/* MODAL DELETE SET UP */}
             <Modal show={showDeleteConfirmation} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dashboard-thin">Konfirmasi Hapus Berkas</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-3">
                    <Row className="text-dashboard-clean ps-3 pb-3">
                        Apakah Anda yakin ingin menghapus berkas ini?
                    </Row>
                    <Row className="text-dashboard-thin ps-3">
                        Peringatan : Tindakan ini akan menghapus seluruh layanan dan pengajuan dokumen yang berkaitan dengan berkas ini!
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* MODAL SET NEWS*/}
            <Modal size="lg" show={modalInsert} onHide={() => setModalInsert(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Berkas Persyaratan Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Nama Berkas</Form.Label>
                            <Form.Control name="Req_Data" type="text" value={formData.Req_Data} onChange={handleChange} placeholder="Masukkan nama berkas baru disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <div className="mb-3">
                            <ButtonSecondary text={isSending ? "Mengirim..." : "Kirim"  } type="submit"></ButtonSecondary>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* MODAL UPDATE NEWS*/}
            <Modal size="lg" show={modalUpdate} onHide={() => setModalUpdate(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPen className="icon-red"/></span>Update Berkas Persyaratan</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={(e) => handleUpdateSubmit(e, formData.UUID_DRD)}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Nama Berkas</Form.Label>
                            <Form.Control name="Req_Data" type="text" value={formData.Req_Data} onChange={handleUpdateChange} placeholder="Masukkan nama berkas baru disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <div className="mb-3">
                            <ButtonSecondary text={isSending ? "Mengirim..." : "Kirim"  } type="submit"></ButtonSecondary>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>


            <Row className="ps-0 pt-2">
                <Col xs lg="5 ps-0">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" className="box-search">
                            {" "}<FaSearch style={{ fill: "black" }} />
                        </InputGroup.Text>
                        <Form.Control placeholder="Cari Persyaratan" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Col>
                <Col xs lg="5">
                </Col>
                <Col xs lg="2">
                    <Button className="ButtonCustomSearch text-dashboard-white" onClick={() => {setModalInsert(true); resetFormData()}}>
                        <spa className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{ fill: "#fff" }}/> Syarat
                        </spa>
                    </Button>
                </Col>
            </Row>   

            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">Berkas</th>
                            <th className="table-head-custom">Created</th>
                            <th className="table-head-custom">Last Updated</th>
                            <th className="table-head-custom"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <>
                            <tr>
                                <td className="table-body-custom"><Skeleton width={15} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={150} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={15} height={15} /></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                {dataRequirements.length === 0 ? (
                                    <> 
                                        <tr>
                                            <td colSpan="5" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataRequirements.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_BE}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom">{item.Req_Data}</td>
                                                <td className="table-body-custom">{item.CreatedAt}</td>
                                                <td className="table-body-custom">{item.UpdatedAt}</td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#9FAACA' }}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleUpdate(item.UUID_DRD)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaPen className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                Ubah
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleDeleteConfirmation(item.UUID_DRD)}> 
                                                            <div className="text-dashboard-thin">
                                                                <span><FaTrash className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                            Hapus
                                                            </div>
                                                        </Dropdown.Item>
                                                    </DropdownButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </tbody>
                </Table>
            </Row>
        </>
    )
}
export default ManageRequrst