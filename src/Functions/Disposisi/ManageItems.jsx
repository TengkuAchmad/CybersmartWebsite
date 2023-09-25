import React from "react"

import { Row, Col, Form, InputGroup, Button, Table, Modal, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV, FaPowerOff } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import LogoVariant from "../../Assets/server/image/Logo-Variant1.png"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const ManageItems = () =>{
    // VARIABLE DEFINITION
    const [ dataDisposisi, setDataDisposisi ] = useState([])

    const [ deleteItemId, setDeleteItemId ] = useState(null)

    const [ modalUpdateShow, setModalUpdateShow ] = useState(false)
    
    const [ dataAdmin, setDataAdmin ] = useState([])

    const [ dataDisposisiEntry, setDataDisposisiEntry ] = useState([])

    const [ selectedOptions, setSelectedOptions ] = useState([])
    
    const [ loading, setLoading ] = useState(true)
    
    const [ modalInsert, setModalInsert ] = useState(false)

    const [ isSending, setIsSending ] = useState(false)

    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)

    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        UUID_DS         : "",
        UUID_AD        : "",
        Status_DE    : ""
    })

    const resetFormData = () => {
        setFormData({
          UUID_DS: "",
          UUID_AD: "",
          Status_DE: ""
        })
    }
    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedOptions((prevSelectedOptions) => {
          if (prevSelectedOptions.includes(value)) {
            return prevSelectedOptions.filter((item) => item !== value);
          } else {
            return [...prevSelectedOptions, value];
          }
        });
        console.log(selectedOptions)
      };
      

    // GET DATA 
    const fetchDataDisposisiEntry = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DisposisiEntryControl")
            .then((response) => {
                setDataDisposisiEntry(response.data.data)
            })
            .catch((error) => {
                console.log("Error:" , error)
            })
    })

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

    const fetchDataAdmin = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/AdminOptions")
            .then((response) => {
                setDataAdmin(response.data)
            })
            .catch((error) => {
                console.log("Error:" , error)
            })
    })

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataDisposisiEntry()
            fetchDataDisposisi()
            fetchDataAdmin()
            setLoading(false)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataDisposisi])

    // HANDLE DEFINITION
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        // Reset Container
        e.preventDefault()

        setIsSending(true)

        const UUID_AD = localStorage.getItem('UUID_AD')
        
        const form  = new FormData()
        form.append('Status_DE', formData.Status_DE)
        form.append('UUID_DS', formData.UUID_DS)
        form.append('UUIDAD', formData.UUID_AD)
        form.append('UUID_AD', UUID_AD)

        axios
            .post('https://cybersmartserver.as.r.appspot.com/DisposisiEntryControl', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then((response) => {
                const message = response.data
                toast.success(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
                setIsSending(false)
                setModalInsert(false)
                fetchDataDisposisiEntry()
            })
            .catch((error) => {
                setIsSending(false)
                const message = error.response.data
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                  });
                console.error(message)
            })

            console.log(selectedOptions)
    }

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
                fetchDataDisposisiEntry()
                
            })
            .catch((error) => {
                console.error("Error:", error)
            })

            .finally(() => {
                handleDeleteCancel()
            })
    }

    const handleActivate = (uuid) => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DE", uuid)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/ActivateDisposisiControl", formData, {
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
                fetchDataDisposisiEntry()
            })
            .catch((error) => {
                const message = error.data.msg
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
            })
    }

    const handleDeactivate = (uuid) => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DE", uuid)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeactivateDisposisiControl", formData, {
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
                fetchDataDisposisiEntry()
            })
            .catch((error) => {
                const message = error.data.msg
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
            })
    }

    
    const getStatusClass = (action) => {
        if (action === "Aktif"){
            return "status-add-news"
        } else if (action === "Nonaktif"){
            return "status-delete-news"
        }
    }

    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
            {/* MODAL DELETE SET UP */}
            <Modal show={showDeleteConfirmation} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dashboard-thin">Konfirmasi Hapus Pihak Disposisi</Modal.Title>
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

            {/* MODAL SET DISPOSISI ENTRY*/}
            <Modal size="lg" show={modalInsert} onHide={() => setModalInsert(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Pihak Disposisi Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Pihak Disposisi</Form.Label>
                            
                            <Form.Select name="UUID_DS" aria-label="UUID_DS" value={formData.UUID_DS} onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih pihak disposisi</option>
                                {dataDisposisi.map((item, index) => (
                                    <option className="text-dashboard-clean" value={item.UUID_DS}>{item.Pihak_DS}</option>
                                ))}  
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Penanggungjawab</Form.Label>
                            <Form.Select name="UUID_AD" aria-label="UUID_AD" value={formData.UUID_AD} onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih pihak penanggungjawab</option>
                                {dataAdmin.map((item, index) => (
                                    <option className="text-dashboard-clean" value={item.UUID_AD}>{item.Nama_AI}</option>
                                ))}  
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Status Keaktifan</Form.Label>
                            <Form.Select name="Status_DE" aria-label="Status_DE" value={formData.Status_DE} onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih status keaktifan</option>
                                <option className="text-dashboard-clean" value="Aktif">Aktif</option>
                                <option className="text-dashboard-clean" value="Nonaktif">Nonaktif</option>
                            </Form.Select>
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
                        <Form.Control placeholder="Cari" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Col>
                <Col xs lg="5">
                </Col>
                <Col xs lg="2">
                    <Button className="ButtonCustomSearch text-dashboard-white" onClick={() => {setModalInsert(true); resetFormData(); setSelectedOptions([]);}}>
                        <span className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{fill: "#fff"}}/> Disposisi
                        </span>
                    </Button>
                </Col>
            </Row>   

            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">Pihak Disposisi</th>
                            <th className="table-head-custom">Penanggungjawab</th>
                            <th className="table-head-custom">Alamat Email</th>
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
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={50} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={15} height={15} /></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                {dataDisposisiEntry.length === 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="8" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataDisposisiEntry.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_DE}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncate-text">{item.Pihak_DS}</td>
                                                <td className="table-body-custom">{item.Nama_AI}</td>
                                                <td className="table-body-custom">{item.Email}</td>
                                                <td className="table-body-custom">
                                                    <div className={`${getStatusClass(item.Status_DE)}`}>
                                                        {item.Status_DE}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#9FAACA' }}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" 
                                                            onClick={() => {
                                                                if (item.Status_DE === 'Aktif') {
                                                                    handleDeactivate(item.UUID_DE);
                                                                } else {
                                                                    handleActivate(item.UUID_DE);
                                                                }}} >

                                                            <div className="text-dashboard-thin">
                                                                <span><FaPowerOff className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                {item.Status_DE === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleDeleteConfirmation(item.UUID_DS)}> 
                                                            <div className="text-dashboard-thin" >
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
export default ManageItems