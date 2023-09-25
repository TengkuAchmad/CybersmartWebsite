import React from "react"

import { Row, Col, Form, InputGroup, Button, Table, Modal, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import ButtonSecondary from "../../Components/ButtonSecondary"

import { FaSearch, FaPlus } from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const RequestDocs = () =>{
    // VARIABLE DEFINITION
    const [ dataDocRequest, setDataDocRequest ] = useState([])

    const [ dataUser, setDataUser ] = useState([])

    const [ dataDocService, setDataDocService ] = useState([])

    const [ loading, setLoading ] = useState(true)

    const [ isSending, setIsSending ] = useState(false)

    const [ modalInsert, setModalInsert ] = useState(false)

    const [ dataNotExist, setDataNotExist ] = useState(false)
    
    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        UUID_US         : "",
        UUID_DO        : ""
    })

    const resetFormData = () => {
        setFormData({
            UUID_US: "",
            UUID_DO: ""
        })
    }

    const fetchDataUser = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/UserControl")
            .then((response) => {
                const data = response.data.data
                setDataUser(data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    })

    const fetchDataDocServices = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DocServicesControl")
            .then((response) => {
                const data = response.data.data
                setDataDocService(data)
            })
            .catch((error) => {
                console.log("Error:" , error)
            })
    })

    const fetchDataDocRequest = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DocRequestControl")
            .then((response) => {
                setDataDocRequest(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setDataNotExist(true)
            })
    })

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataDocRequest()
            setLoading(false)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    },[fetchDataDocRequest])

    const handleTicket = (uuid) => {
        setIsSending(true)
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DR", uuid)
        formData.append("DocState_DR", "Ditinjau")
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DocTicketGenerate", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setIsSending(false)
                const message = response.data
                toast.success(message['msg'], {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                fetchDataDocRequest()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = async(e) => {
        // Reset Container
        e.preventDefault()

        setIsSending(true)
        
        const form  = new FormData()
        form.append('UUID_US', formData.UUID_US)
        form.append('UUID_DO', formData.UUID_DO)
        form.append('DocState_DR', 'Diajukan')
        axios
            .post('https://cybersmartserver.as.r.appspot.com/DocRequestControl', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })

            .then((response) => {
                const message = response.data
                console.log(message)
                setIsSending(false)
                setModalInsert(false)
                fetchDataDocRequest()
            })

            .catch((error) => {
                setIsSending(false)
                const message = error.response.data
                console.error(message)
            })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const getStatusClass = (action) => {
        if (action === "Ditinjau"){
            return "status-add-news"
        } else if (action === "Diajukan"){
            return "status-delete-news"
        }
    }

    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>

            {/* MODAL SET PENGAJUAN BARU */}
            <Modal size="lg" show={modalInsert} onHide={() => setModalInsert(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Pengajuan Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Identitas Pengguna</Form.Label>
                            <Form.Select name="UUID_US" aria-label="kategori berita" onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih Identitas Pengguna</option>
                                {dataUser.map((option) => (
                                    <option className="text-dashboard-clean" value={option.UUID_US}>{ option.NIK_UI } - { option.NamaLengkap_UI }</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Jenis Pengajuan Dokumen</Form.Label>
                            <Form.Select name="UUID_DO" aria-label="kategori berita" onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih Jenis Pengajuan Dokumen</option>
                                {dataDocService.map((option) => (
                                    <option className="text-dashboard-clean" value={option.UUID_DO}>{ option.Judul_DO }</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className="mb-3">
                            <ButtonSecondary text={isSending ? "Mengirim..." : "Kirim"  } type="submit" />
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
                        <Form.Control placeholder="Cari Pengajuan" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Col>
                <Col xs lg="5">
                </Col>
                <Col xs lg="2">
                    <Button className="ButtonCustomSearch text-dashboard-white" onClick={() => {setModalInsert(true); resetFormData(); fetchDataUser(); fetchDataDocServices();}}>
                        <span className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{ fill: "#fff"}}/> Pengajuan
                        </span>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">No. Tiket</th>
                            <th className="table-head-custom">Dokumen</th>
                            <th className="table-head-custom">Pemohon</th>
                            <th className="table-head-custom">Diajukan pada</th>
                            <th className="table-head-custom">Status</th>
                            <th className="table-head-custom">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <>
                            <tr>
                                <td className="table-body-custom"><Skeleton width={15} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={150} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={90} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={65} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={65} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                {dataNotExist ? (
                                    <>
                                        <tr>
                                            <td colSpan="7" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataDocRequest.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_DR}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncate-text">
                                                    {item.DocTicket ? item.DocTicket : "-"}
                                                </td>
            
                                                <td className="table-body-custom truncat-text">{item.Judul_DO}</td>
                                                <td className="table-body-custom">{item.NamaLengkap_UI}</td>
                                                <td className="table-body-custom">{item.CreatedAt.slice(0,17)}</td>
                                                <td className="table-body-custom">
                                                    <div className={`${getStatusClass(item.DocState_DR)}`}>
                                                        {item.DocState_DR}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">
                                                    <Button onClick={() => handleTicket(item.UUID_DR)} size="sm" variant="primary">{isSending ? "Memproses..." : "Mulai Proses"  }</Button>
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
export default RequestDocs