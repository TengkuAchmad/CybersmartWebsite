import React from "react"

import { Row, Col, Form, InputGroup, Button, Table, Modal, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import LogoVariant from "../../Assets/server/image/Logo-Variant1.png"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const RequestDisposisi = () =>{
    // VARIABLE DEFINITION
    const [ dataDisposisi, setDataDisposisi ] = useState([])
    
    const [ loading, setLoading ] = useState(true)

    const [ data, setData ] = useState(null)

    const [ showToast, setShowToast ] = useState(false)

    const [ deleteItemId, setDeleteItemId ] = useState(null)
    
    const [ modalInsert, setModalInsert ] = useState(false)

    const [ isSending, setIsSending ] = useState(false)

    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)

    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        UUID_DS        : "",
        Pihak_DS       : ""
    })

    const resetFormData = () => {
        setFormData({
          UUID_DS: "",
          Pihak_DS:""
        })
    }

    // GET ALL DATA 
    const fetchDataDisposisi = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DisposisiControl")
            .then((response) => {
                setDataDisposisi(response.data.data)
            })
            .catch((error) => {
                console.log("Error:" , error)
            })
    })


    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataDisposisi()
            setLoading(false)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataDisposisi])

    // HANDLE DEFINITION

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
        form.append('Pihak_DS', formData.Pihak_DS)
        form.append('UUID_AD', UUID_AD)

        axios
            .post('https://cybersmartserver.as.r.appspot.com/DisposisiControl', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then((response) => {
                const message = response.data
                setIsSending(false)
                setModalInsert(false)
                toast.success(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
                fetchDataDisposisi()
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
        formData.append("UUID_DS", deleteItemId)
        formData.append("UUID_AD", uuidad)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeleteDisposisi", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
          })
            .then((response) => {
                const message = response.data.msg
                toast.success(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
                fetchDataDisposisi()
                
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
            <ToastContainer theme="light" style={{ width: '500px' }} limit={2} autoClose={2000}/>
             {/* MODAL DELETE SET UP */}
            <Modal show={showDeleteConfirmation} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dashboard-thin">Konfirmasi Hapus Disposisi</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-3">
                    <Row className="text-dashboard-clean ps-3 pb-3">
                        Apakah Anda yakin ingin menghapus item disposisi ini?
                    </Row>
                    <Row className="text-dashboard-thin ps-3">
                        Peringatan : Tindakan ini akan menghapus seluruh layanan dokumen yang berkaitan dengan disposisi!
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


            {/* MODAL SET DISPOSISI*/}
            <Modal size="lg" show={modalInsert} onHide={() => setModalInsert(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Pihak Disposisi Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Nama Pihak</Form.Label>
                            <Form.Control name="Pihak_DS" type="text" value={formData.Pihak_DS} onChange={handleChange} placeholder="Masukkan nama pihak disposisi baru disini" required autoComplete="off"></Form.Control>
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
                        <span className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{ fill: "#fff"}}/> Pihak
                        </span>
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
                            <th className="table-head-custom">Aksi</th>
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
                                {dataDisposisi.length === 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="5" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataDisposisi.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_DS}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom">{item.Pihak_DS}</td>
                                                <td className="table-body-custom">{item.CreatedAt}</td>
                                                <td className="table-body-custom">{item.UpdatedAt}</td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#9FAACA' }}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleDeleteConfirmation(item.UUID_DS)}> 
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
export default RequestDisposisi