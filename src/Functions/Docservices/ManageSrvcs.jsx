import React from "react"

import { Row, Col, Form, InputGroup, Button, Table, Modal, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV, FaPowerOff } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const ManageSrvcs = () =>{
    // VARIABLE DEFINITION
    const [ dataServices, setDataServices ] = useState([])

    const [ deleteItemId, setDeleteItemId ] = useState(null)

    const [ dataDisposisi, setDataDisposisi ] = useState([])

    const [ dataRequirements, setDataRequirements ] = useState([])

    const [ selectedOptions, setSelectedOptions ] = useState([])

    const [ data, setData ] = useState(null)

    const [ dataNotExist, setDataNotExist ] = useState(false)
    
    const [ loading, setLoading ] = useState(true)
    
    const [ modalInsert, setModalInsert ] = useState(false)

    const [ isSending, setIsSending ] = useState(false)

    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)

    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        UUID_DO         : "",
        Judul_DO        : "",
        Deskripsi_DO    : "",
        UUID_DE    : ""
    })

    const resetFormData = () => {
        setFormData({
          UUID_DO: "",
          Judul_DO: "",
          Deskripsi_DO: "",
          UUID_DE: ""
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
      };
      

    // GET DATA 
    const fetchDataDisposisiEntry = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DisposisiEntryControl")
            .then((response) => {
                setDataDisposisi(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    })

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

    const fetchDataServices = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DocServicesControl")
            .then((response) => {
                setDataServices(response.data.data)
            })
            .catch((error) => {
                setDataNotExist(true)
            })
    })

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataRequirements()
            fetchDataServices()
            fetchDataDisposisiEntry()
            setLoading(false)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataServices])

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
        form.append('Judul_DO', formData.Judul_DO)
        form.append('Deskripsi_DO', formData.Deskripsi_DO)
        form.append('UUID_DE', formData.UUID_DE)
        form.append('UUID_AD', UUID_AD)
        console.log({"data" : formData.UUID_DE})
        axios
            .post('https://cybersmartserver.as.r.appspot.com/DocServicesControl', form, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then((response) => {
                const message = response.data.msg
                setIsSending(false)
                setModalInsert(false)
                toast.success(message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                });
                fetchDataServices()
            })
            .catch((error) => {
                setIsSending(false)
                const message = error.response.data
                console.error(message)
            })

            selectedOptions.forEach((option) => {
                form.append('Judul_DO', formData.Judul_DO)
                form.append('Req_Data', option);

                axios
                .post("https://cybersmartserver.as.r.appspot.com/SetDocServicesReq" , form, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error.response.data)
                })
            }) 
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
        formData.append("UUID_DO", deleteItemId)
        formData.append("UUID_AD", uuidad)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeleteDocServices", formData, {
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
                fetchDataServices()
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
        formData.append("UUID_DO", uuid)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/ActivateDocServicesControl", formData, {
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
                fetchDataServices()
            })
            .catch((error) => {
                setData(error.data.msg)
            })
    }

    const handleDeactivate = (uuid) => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DO", uuid)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeactivateDocServicesControl", formData, {
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
                fetchDataServices()
            })
            .catch((error) => {
                setData(error.data.msg)
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
                    <Modal.Title className="text-dashboard-thin">Konfirmasi Hapus Layanan</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-3">
                    <Row className="text-dashboard-clean ps-3 pb-3">
                        Apakah Anda yakin ingin menghapus layanan ini?
                    </Row>
                    <Row className="text-dashboard-thin ps-3">
                        Peringatan : Tindakan ini akan menghapus seluruh pengajuan dokumen yang berkaitan dengan layanan!
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
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Layanan Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Nama Layanan</Form.Label>
                            <Form.Control name="Judul_DO" type="text" value={formData.Judul_DO} onChange={handleChange} placeholder="Masukkan nama layanan disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Deskripsi Layanan</Form.Label>
                            <Form.Control name="Deskripsi_DO" as="textarea" rows={5} value={formData.Deskripsi_DO} onChange={handleChange} placeholder="Masukkan deskripsi layanan disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Syarat Layanan</Form.Label>
                            <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                                {dataRequirements.map((option) => (
                                    <Form.Check key={option.Req_Data} type="checkbox" id={option.Req_Data} label={option.Req_Data} value={option.Req_Data} checked={selectedOptions.includes(option.Req_Data)} onChange={handleCheckboxChange} style={{ WebkitTextFillColor : '#A7213B' }} />
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Pihak Disposisi</Form.Label>
                            <Form.Select name="UUID_DE" aria-label="kategori berita" onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih Pihak Disposisi</option>
                                {dataDisposisi.map((option) => (
                                    <option className="text-dashboard-clean" value={option.UUID_DE}>{ option.Pihak_DS } - { option.Nama_AI }</option>
                                ))}
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
                        <Form.Control placeholder="Cari Layanan" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Col>
                <Col xs lg="5">
                </Col>
                <Col xs lg="2">
                    <Button className="ButtonCustomSearch text-dashboard-white" onClick={() => {setModalInsert(true); resetFormData(); setSelectedOptions([]);}}>
                        <span className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{ fill: "#fff"}}/> Layanan
                        </span>
                    </Button>
                </Col>
            </Row>   

            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">Layanan</th>
                            <th className="table-head-custom">Deskripsi</th>
                            <th className="table-head-custom">Disposisi</th>
                            <th className="table-head-custom">Created</th>
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
                                <td className="table-body-custom"><Skeleton width={15} height={15} /></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                { dataServices.length === 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="7" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataServices.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_DO}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncate-text">{item.Judul_DO}</td>
                                                <td className="table-body-custom">{item.Deskripsi_DO}</td>
                                                <td className="table-body-custom">{item.Pihak_DS}</td>
                                                <td className="table-body-custom">{item.CreatedAt}</td>
                                                <td className="table-body-custom">
                                                    <div className={`${getStatusClass(item.Status_DO)}`}>
                                                        {item.Status_DO}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#9FAACA' }}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" 
                                                            onClick={() => {
                                                                if (item.Status_DO === 'Aktif') {
                                                                    handleDeactivate(item.UUID_DO);
                                                                } else {
                                                                    handleActivate(item.UUID_DO);
                                                                }}} >

                                                            <div className="text-dashboard-thin">
                                                                <span><FaPowerOff className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                {item.Status_DO === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleDeleteConfirmation(item.UUID_DO)}> 
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
export default ManageSrvcs