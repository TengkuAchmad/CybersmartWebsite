import React from "react"

import { Row, Table, Col, Form, Dropdown, DropdownButton, Modal, Button } from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaEllipsisV, FaTimes, FaCheck, FaInfo, FaEye, FaPen } from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import ImageComponent from "../../Components/ImageComponent"

const VerifikasiID = () =>{
    // VARIABLE DEFINITION
    const [ dataDocRequest, setDataDocRequest ] = useState([])

    const [ loading, setLoading ] = useState(true)

    const [ modalShow, setModalShow ] = useState(false)

    const [ modalPreviewShow, setModalPreviewShow ] = useState(false)

    const [ dataDetailUser, setDataDetailUser ] = useState([])

    const [ dataFileId, setDataFileId ] = useState("")

    const [ dataTitlePreview, setDataTitlePreview ] = useState("")

    const [ dataNotExist, setDataNotExist ] = useState(false) 
       
    const fetchDataDocRequest = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DocToCheckControl")
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
    }, [fetchDataDocRequest])


    const handleModal = (uuid) => {
        setModalShow(true)
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/UQUserFileControl/${uuid}`)
            .then((response) => {
                const data = response.data.data
                setDataDetailUser(data)
                console.log(dataDetailUser)
            })

            .catch((error) => {
                console.error("Error:", error)
            })
    }
      
    const handleVerified = (uuid) => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DR", uuid)
        for (const pair of formData.entries()) {
            var key = pair[0];
            var value = pair[1];
            console.log("Key: " + key + ", Value: " + value);
        }
        axios
            .post("https://cybersmartserver.as.r.appspot.com/VerifiedDocReq", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const message = response.data
                console.log(message)
                toast.success(message['msg'], {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                fetchDataDocRequest()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    const handleSubmitUnverified = (uuid) => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DR", uuid)
        for (const pair of formData.entries()) {
            var key = pair[0];
            var value = pair[1];
            console.log("Key: " + key + ", Value: " + value);
        }
        axios
            .post("https://cybersmartserver.as.r.appspot.com/UnverifiedDocReq", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const message = response.data
                console.log(message)
                toast.success(message['msg'], {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                fetchDataDocRequest()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    const handlePreview = (fileid, titlePreview) => {
        setModalPreviewShow(true)
        setDataFileId(fileid)
        setDataTitlePreview(titlePreview)
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
            <Modal size="lg" show={modalShow} onHide={() =>setModalShow(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                            <div className="text-dashboard-clean">
                                <span><FaInfo className="icon-show"/></span>
                                Verifikasi Identitas
                            </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                    <Row className="mt-2">
                            <>
                                <Table hover>
                                    <thead >
                                        <tr>
                                            <th className="table-head-custom">No.</th>
                                            <th className="table-head-custom">Dokumen</th>
                                            <th className="table-head-custom">Pemilik</th>
                                            <th className="table-head-custom">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataDetailUser.length === 0 ? (
                                            <tr>
                                            <td colSpan="4" className="table-body-custom text-center">Tidak ada data berkas</td>
                                            </tr>
                                        ) : (
                                            dataDetailUser.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_UF}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncat-text">{item.Req_Data}</td>
                                                <td className="table-body-custom">{item.NamaLengkap_UI}</td>
                                                <td className="table-body-custom"><Button variant="primary" size="sm" onClick={() => handlePreview(item.FileDir_UF, item.Req_Data)}>Pratinjau</Button></td>
                                            </tr>
                                            ))
                                        )}
                                        </tbody>
                                </Table>
                            </>
                    </Row>
                </Modal.Body>
            </Modal>
            
            <Modal size="lg" show={modalPreviewShow} onHide={() =>setModalPreviewShow(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                            <div className="text-dashboard-clean">
                                <span><FaInfo className="icon-show"/></span>
                                Pratinjau Berkas | { dataTitlePreview } 
                            </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                    <Row className="mt-2 box-preview">
                        <ImageComponent fileId={ dataFileId } customClasses={"box-berkas"} />
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
                                { dataNotExist ? (
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
                                                <td className="table-body-custom truncate-text">{item.DocTicket}</td>
                                                <td className="table-body-custom truncat-text">{item.Judul_DO}</td>
                                                <td className="table-body-custom">{item.NamaLengkap_UI}</td>
                                                <td className="table-body-custom">{item.CreatedAt.slice(0,17)}</td>
                                                <td className="table-body-custom">
                                                    <div className={`${getStatusClass(item.DocState_DR)}`}>
                                                        {item.DocState_DR}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#A7213B'}}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" 
                                                            onClick={() => handleModal(item.UUID_US)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaEye className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                Cek Berkas
                                                            </div>
                                                        </Dropdown.Item> 
                                                        <Dropdown.Item className="text-menu-dropdown" 
                                                            onClick={() => handleVerified(item.UUID_DR)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaCheck className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                Lolos Verifikasi
                                                            </div>
                                                        </Dropdown.Item>

                                                        <Dropdown.Item className="text-menu-dropdown" 
                                                            onClick={() => handleSubmitUnverified(item.UUID_DR)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaTimes className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                Tidak Lolos Verifikasi
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
export default VerifikasiID