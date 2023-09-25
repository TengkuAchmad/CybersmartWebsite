// LIBRARY IMPORT
import { Row, Col, Form, InputGroup, Button, Table, Modal, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV, FaPowerOff } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const ManageItems = () => {
    // VARIABLE DEFINITION
    const [ isSending, setIsSending ] = useState(false)

    const [ loading, setLoading ] = useState(true)

    // Container untuk menampung data quote
    const [ dataQuote, setDataQuote ] = useState([])

    const [ dataGambarQuote, setDataGambarQuote ] = useState(null)

    // CONDITIONAL
    const [ deleteItemId, setDeleteItemId ] = useState(null)

    // MODAL
    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)
    const [ showSetModal, setShowSetModal ] = useState(false)

    // TOAST
    const [ showToast, setShowToast ] = useState(false)
    const [ dataToast, setDataToast ] = useState("")

    // Container untuk menampung data form update quote
    const [ formData, setFormData ] = useState({
        UUID_CK     : "",
        Nama_CK     : "",
        Text_CK     : "",
        Gambar_CK   : null
    })

    const resetFormData = () => {
        setFormData({
          UUID_CK   : "",
          Nama_CK   : "",
          Text_CK   : "",
          Gambar_CK : null
        })
    }

    // Modal Add Quote Setup
    const [ modalShow, setModalShow ] = useState(false)

    // Modal Update Quote Setup
    const [ modalUpdateShow, setModalUpdateShow ] = useState(false)

    // ============================ FETCH DATA FUNCTION ============================
    // FETCH DATA DEFINITION
    const fetchDataQuote = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/QuoteControl")
            .then((response) => {
                setDataQuote(response.data.data)
            })
            .catch((error) => {
                console.error("Error:",error)
            })
    },[])

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataQuote()
            setLoading(false)
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataQuote])

    // FETCH DATA UPDATE FORM DEFINITION
    const fetchDataUpdateQuote = useCallback((itemId) => {
        const uuid_quote = itemId
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/GetCurrentQuote/${uuid_quote}`)
            .then((response) => {
                const data = response.data.data
                setFormData({
                    UUID_CK     : data.UUID_CK,
                    Nama_CK     : data.Nama_CK,
                    Text_CK     : data.Text_CK
                })
                setDataGambarQuote(data.Gambar_CK)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])
    // ============================ END FETCH DATA FUNCTION ============================


    const getStatusClass = (action) => {
        if (action === "Aktif"){
            return "status-active-table"
        } else if (action === "Nonaktif"){
            return "status-inactive-table"
        }
    }

    // ============================ HANDLE DATA FUNCTION ============================
    // HANDLE DATA SET DEFINITION
    const handleChange = (e) => {
        if (e.target.name === "Gambar_CK"){
            setFormData({ ...formData, Gambar_CK: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    // Menyimpan dan memperbarui form data ke server
    const handleSubmit = async (e) => {
        setIsSending(true)

        // Reset Container
        e.preventDefault()
        
        // Mendapatkan UUID_AD dari localStorage
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Input nilai ke form
        const formdata = new FormData()
        formdata.append('Nama_CK', formData.Nama_CK)
        formdata.append('Text_CK', formData.Text_CK)
        formdata.append('Gambar_CK', formData.Gambar_CK)
        formdata.append('UUID_AD', UUID_AD)

        for (const entry of formdata.entries()) {
            const [key, value] = entry;
            console.log(`${key}: ${value}`);
        }
        
        // Mengirim form data ke API
        axios.post('https://cybersmartserver.as.r.appspot.com/QuoteControl', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        .then((response) => {
            toast.success(response.data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            setIsSending(false)
            setShowSetModal(false)
            fetchDataQuote()
        })
        .catch(error => {
            console.error("Error:", error)
        })
    }

    // HANDLE DATA UPDATE DEFINITION
    const handleUpdate = (itemId) => {
        fetchDataUpdateQuote(itemId)
        setModalUpdateShow(true)
    }

    const handleUpdateChange = (e) => {
        if (e.target.name === "Gambar_CK"){
            setFormData({ ...formData, [e.target.name]: e.target.files[0]})
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }
    
    const handleUpdateSubmit = (e, UUID_CK) => {
        setIsSending(true)
        e.preventDefault()
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Buat FormData baru untuk mengirim data ke API
        const formDataAPI = new FormData();
        formDataAPI.append("Nama_CK", formData.Nama_CK)
        formDataAPI.append("Text_CK", formData.Text_CK)
        formDataAPI.append("Gambar_CK", formData.Gambar_CK)
        formDataAPI.append("UUID_CK", UUID_CK)
        formDataAPI.append("UUID_AD", UUID_AD)

        axios
            .put('https://cybersmartserver.as.r.appspot.com/QuoteControl', formDataAPI, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setIsSending(false)
                setModalUpdateShow(false)
                fetchDataQuote()
            })
            .catch(error => {
                console.error(error)
            })
    }

    // HANDLE DATA DELETE DEFINITION
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
        formData.append("UUID_CK", deleteItemId)
        formData.append("UUID_AD", uuidad)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeleteQuote", formData, {
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
                fetchDataQuote()
            })
            .catch((error) => {
                console.error("Error:", error)
            })

            .finally(() => {
                handleDeleteCancel()
            })
    }

    // FUNCTION DEFINITION
    // Mengaktifkan status quote
    const handleActivate = (UUID_CK) => {
        // Mendapatkan UUID_AD dari localStorage
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Membuat objek data yang akan dikirim dalam body request
        const formData = new FormData()

        formData.append('UUID_CK', UUID_CK)
        formData.append('UUID_AD', UUID_AD)


        // Mengirim data ke API menggunakan axios
        axios.post('https://cybersmartserver.as.r.appspot.com/ActivateQuote', formData, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })

        .then(response => {
            // Data Response
            const message = response.data.message
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
            fetchDataQuote()
            
        })
        
        .catch(error => {
            console.error(error)
        })
    }

    // Menonaktifkan status quote
    const handleDeactivate = (UUID_CK) => {
        // Mendapatkan UUID_AD dari localStorage
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Membuat objek data yang akan dikirim dalam body request
        const formData = new FormData()

        formData.append('UUID_CK', UUID_CK)
        formData.append('UUID_AD', UUID_AD)


        // Mengirim data ke API menggunakan axios
        axios.post('https://cybersmartserver.as.r.appspot.com/DeactivateQuote', formData, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })

        .then(response => {
            // Data Response
            const message = response.data.message
            fetchDataQuote()
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
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
            {/* MODAL SET QUOTE */}
            <Modal size="lg" show={showSetModal} onHide={() => setShowSetModal(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Konten Kiat Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-dashboard-clean">Nama Kiat</Form.Label>
                            <Form.Control name="Nama_CK" type="text" value={formData.Nama_CK} onChange={handleChange} placeholder="Masukkan judul nama kiat disini!" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-dashboard-clean">Teks Kiat</Form.Label>
                            <Form.Control name="Text_CK" as="textarea" rows={2} value={formData.Text_CK} onChange={handleChange} placeholder="Masukkan teks kiat disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-dashboard-clean">Gambar Kiat</Form.Label>
                            <Form.Control name="Gambar_CK" type="file" required onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <div className="mb-3">
                            <ButtonSecondary text={isSending ? "Mengirim..." : "Kirim"  } type="submit"></ButtonSecondary>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* MODAL DELETE SET UP */}
            <Modal show={showDeleteConfirmation} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dashboard-thin">Konfirmasi Hapus Konten Kiat</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dashboard-clean ps-3">Apakah Anda yakin ingin menghapus item kiat ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL UPDATE */}
            <Modal size="lg" show={modalUpdateShow} onHide={() => setModalUpdateShow(false)} aria-labelledby="modal">
                <Modal.Header closeButton>
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPen className="icon-red"/></span>Update Quote</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={(e) => handleUpdateSubmit(e, formData.UUID_CK)}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-dashboard-clean">Nama Quote</Form.Label>
                            <Form.Control name="Nama_CK" type="text" value={formData.Nama_CK} onChange={handleUpdateChange} placeholder="Masukkan nama quote disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-dashboard-clean">Teks Quote</Form.Label>
                            <Form.Control name="Text_CK" as="textarea" rows={2} value={formData.Text_CK} onChange={handleUpdateChange} placeholder="Masukkan teks quote disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-dashboard-clean">Gambar Quote</Form.Label>
                            <Form.Control name="Gambar_CK" type="file" required onChange={handleUpdateChange}>
                            </Form.Control>
                            <span>
                                <p className="mt-2">File sebelumnya: {dataGambarQuote}</p>
                            </span>
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
                        <Form.Control placeholder="Cari Kiat" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Col>
                <Col xs lg="5"></Col>
                <Col xs lg="2">
                    <Button className="ButtonCustomSearch text-dashboard" onClick={() => {setShowSetModal(true); resetFormData()}}>
                        <span className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{fill : "white"}}/> Kiat
                        </span>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">Admin</th>
                            <th className="table-head-custom">Status</th>
                            <th className="table-head-custom">Nama Kiat</th>
                            <th className="table-head-custom">Teks Kiat</th>
                            <th className="table-head-custom">Gambar Kiat</th>
                            <th className="table-head-custom">Created</th>
                            <th className="table-head-custom">Last Updated</th>
                            <th className="table-head-custom"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <>
                            <tr>
                                <td><Skeleton width={15} height={15}/></td>
                                <td><Skeleton width={150} height={15}/></td>
                                <td><Skeleton width={90} height={15}/></td>
                                <td><Skeleton width={70} height={15}/></td>
                                <td><Skeleton width={70} height={15}/></td>
                                <td><Skeleton width={70} height={15}/></td>
                                <td><Skeleton width={70} height={15}/></td>
                                <td><Skeleton width={70} height={15}/></td>
                                <td><Skeleton width={15} height={15}/></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                {dataQuote.length === 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="9" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataQuote.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_BE}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncate-text-q">
                                                    <span><img src={`/sources/img_admin/${item.Gambar_AI}`} alt="Avatar" className="image-avatar"/></span>
                                                    {item.Email_AD}
                                                </td>
                                                <td className="table-body-custom truncate-text-q">
                                                    <div className={`${getStatusClass(item.Status_CK)}`}>
                                                        {item.Status_CK}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">{item.Nama_CK}</td>
                                                <td className="table-body-custom truncate-text-q">{item.Text_CK}</td>
                                                <td className="table-body-custom truncate-text-q">{item.Gambar_CK}</td>
                                                <td className="table-body-custom">{item.CreatedAt}</td>
                                                <td className="table-body-custom">{item.UpdatedAt}</td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#9FAACA' }}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => item.Status_CK === 'Aktif' ? handleDeactivate(item.UUID_CK) : handleActivate(item.UUID_CK)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaPowerOff className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                {item.Status_CK === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleUpdate(item.UUID_CK)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaPen className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                Ubah
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleDeleteConfirmation(item.UUID_CK)}> 
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
    // ====================== END HTML CODE ========================
}

export default ManageItems

// ====================== END CODE ========================