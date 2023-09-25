import React from "react"

import { Row, Table, Modal, Button, Form } from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaInfo, FaPlus } from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import ButtonSecondary from "../../Components/ButtonSecondary"

const VerifDisposisi = () =>{
    // VARIABLE DEFINITION
    const [ dataDocRequest, setDataDocRequest ] = useState([])

    const [ loading, setLoading ] = useState(true)

    const [ modalShowAccept, setModalShowAccept ] = useState(false)

    const [ modalShowDecline, setModalShowDecline ] = useState(false)

    const [ FileUUID, setFileUUID ] = useState("")

    const [ isSending, setIsSending ] = useState(false)

    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        DocNote_DR      : "",
        fileuser        : null
    })

    const handleChange = (e) => {
        if (e.target.name === "fileuser"){
            setFormData({ ...formData, fileuser: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }
       
    const fetchDataDocRequest = useCallback(() => {
        const uuidad = localStorage.getItem("UUID_AD")
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/GetDisposisiByAdmin/${uuidad}`)
            .then((response) => {
                setDataDocRequest(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log("Error:" , error)
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
    }, [fetchDataDocRequest])


    const handleModalAccept = (uuid) => {
        setFileUUID(uuid)
        setModalShowAccept(true)
    }
      
    const handleSubmit = async (e) => {
        // Reset Container
        e.preventDefault()

        const form = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        form.append("UUID_AD", uuidad)
        form.append("UUID_DR", FileUUID)
        form.append("DocNote_DR", formData.DocNote_DR)
        form.append("fileuser", formData.fileuser)
        for (const [key, value] of form.entries()) {
            console.log(key, value);
          }
          
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DocToFinished", form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                const message = response.data
                console.log(message)
                toast.success(message['msg'], {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                setModalShowAccept(false)
                fetchDataDocRequest()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    const getStatusClass = (action) => {
        if (action === "Terverifikasi"){
            return "status-add-news"
        } else if (action == "Ditolak"){
            return "status-delete-news"
        }
    }

    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
            <Modal size="lg" show={modalShowAccept} onHide={() =>setModalShowAccept(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                            <div className="text-dashboard-clean">
                                <span><FaInfo className="icon-show"/></span>
                                Formulir Persetujuan
                            </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                    <Row className="mt-2 box-preview">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" control>
                                <Form.Label className="text-dashboard-clean">File Dokumen (PDF)</Form.Label>
                                <Form.Control name="fileuser" type="file" required onChange={handleChange}></Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" control>
                                <Form.Label className="text-dashboard-clean">Catatan</Form.Label>
                                <Form.Control name="DocNote_DR" as="textarea" rows={5} value={formData.DocNote_DR} onChange={handleChange} required autoComplete="off" placeholder="Sampaikan informasi lain untuk dikirimkan kepada pemohon"></Form.Control>
                            </Form.Group>

                            <div className="mb-3">
                                <ButtonSecondary text={isSending ? "Mengirim..." : "Kirim"  } type="submit"></ButtonSecondary>
                            </div>
                        </Form>
                    </Row>
                </Modal.Body>
            </Modal>

            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">No. Tiket</th>
                            <th className="table-head-custom">Dokumen</th>
                            <th className="table-head-custom">Status Berkas</th>
                            <th className="table-head-custom">Pihak Disposisi</th>
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
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                {dataDocRequest.length === 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="6" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataDocRequest.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_DR}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncate-text">{item.DocTicket}</td>
                                                <td className="table-body-custom truncat-text">{item.Judul_DO}</td>
                                                <td className="table-body-custom">
                                                    <div className={`${getStatusClass(item.DocState_DR)}`}>
                                                        {item.DocState_DR}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">
                                                    {item.Pihak_DS}
                                                </td>
                                                <td>
                                                    <span className="me-1">
                                                        <Button variant="success" size="sm" onClick={() => handleModalAccept(item.UUID_DR)}>Setujui</Button>
                                                    </span>
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
export default VerifDisposisi