// LIBRARY IMPORT
import { Row, Col, Form, InputGroup, Button, Table, Modal, Dropdown, DropdownButton, Truncate} from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaPlus, FaPen, FaTrash, FaEllipsisV } from "react-icons/fa"

import ButtonSecondary from "../../Components/ButtonSecondary"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// ====================== MAIN CODE ========================
const ManageItems = () => {
    // VARIABLE DEFINITION
    // Container untuk menampung data berita
    const [ dataBerita, setDataBerita ] = useState([])
    
    const [ loading, setLoading ] = useState(true)

    const [ isSending, setIsSending ] = useState(false)

    const [ dataGambarBerita, setDataGambarBerita ] = useState(null)

    // Container untuk menampung data berita baru
    const [ formData, setFormData ] = useState({
        UUID_BE         : "",
        Judul_BE        : "",
        Deskripsi_BE    : "",
        Kategori_BE     : "",
        Tag_BE          : "",
        Penerbit_BE     : "",
        Gambar_BE       : null
    })

    const resetFormData = () => {
        setFormData({
          UUID_BE: "",
          Judul_BE: "",
          Deskripsi_BE: "",
          Kategori_BE: "",
          Penerbit_BE: "",
          Gambar_BE: null
        })
      }

    // Modal Delete Confirmation Setup
    const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false)

    const [ deleteItemId, setDeleteItemId ] = useState(null)

    // Modal Setup
    const [ modalShow, setModalShow ] = useState(false)

    // Modal Update Setup
    const [ modalUpdateShow, setModalUpdateShow ] = useState(false)

    // ============================ FETCH DATA FUNCTION ============================
    // FETCH DATA DEFINITION
    const fetchDataBerita = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/NewsControl")
            .then((response) => {
                setDataBerita(response.data.data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    },[])

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataBerita()
            setLoading(false)
        }, 3000)
        return () => {
            clearInterval(interval)
        }
    }, [fetchDataBerita])


    // FETCH DATA UPDATE DEFINITION
    const fetchDataUpdateBerita = useCallback((itemId) => {
        const uuid_berita = itemId

        axios
            .get(`https://cybersmartserver.as.r.appspot.com/GetCurrentNews/${uuid_berita}`)
            .then((response) => {
                const data = response.data.data
                setFormData({
                    UUID_BE: data.UUID_BE,
                    Judul_BE: data.Judul_BE,
                    Deskripsi_BE: data.Deskripsi_BE,
                    Kategori_BE: data.Kategori_BE,
                    Penerbit_BE: data.Penerbit_BE,
                })
                setDataGambarBerita(data.Gambar_BE)
            })

            .catch((error) => {
                console.error("Error:", error)
            })
    },[])
    // ============================ END FETCH DATA FUNCTION ============================


    // ============================ FUNCTION ============================
    // FUNCTION TO SET BERITA
    // Menyimpan perubahan data pada form ke kontainer
    const handleChange = (e) => {
        if (e.target.name === "Gambar_BE"){
            setFormData({ ...formData, Gambar_BE: e.target.files[0] })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    // Menyimpan dan memperbarui form data ke server
    const handleSubmit = async (e) => {
        // Reset Container
        e.preventDefault()
        
        setIsSending(true)
        // Mendapatkan UUID_AD dari localStorage
        const UUID_AD = localStorage.getItem('UUID_AD')

        // Input nilai ke form
        const form = new FormData()
        form.append('Judul_BE', formData.Judul_BE)
        form.append('Deskripsi_BE', formData.Deskripsi_BE)
        form.append('Kategori_BE', formData.Kategori_BE)
        form.append('Penerbit_BE', formData.Penerbit_BE)
        form.append('Gambar_BE', formData.Gambar_BE)
        form.append('UUID_AD', UUID_AD)

        // Mengirim form data ke API

        axios
            .post('https://cybersmartserver.as.r.appspot.com/NewsControl', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                const message = response.data
                setIsSending(false)
                setModalShow(false)
                fetchDataBerita()
            })
            .catch(error => {
                setIsSending(false)
                const message = error.response.data.message
                console.error(error)
            })
    }

    // FUNCTION TO UPDATE BERITA
    const handleUpdate = (itemId) => {
        fetchDataUpdateBerita(itemId)
        setModalUpdateShow(true)
    }

    const handleUpdateChange = (e) => {
        if (e.target.name === "Gambar_BE"){
            setFormData({ ...formData, [e.target.name]: e.target.files[0]})
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }
    
    const handleUpdateSubmit = (e, UUID_BE) => {
        e.preventDefault()

        setIsSending(true)

        const UUID_AD = localStorage.getItem('UUID_AD')
        console.log(UUID_BE)
        console.log(UUID_AD)
        // Buat FormData baru untuk mengirim data ke API
        const formDataAPI = new FormData();
        formDataAPI.append("Judul_BE", formData.Judul_BE)
        formDataAPI.append("Deskripsi_BE", formData.Deskripsi_BE)
        formDataAPI.append("Kategori_BE", formData.Kategori_BE)
        formDataAPI.append("Penerbit_BE", formData.Penerbit_BE)
        formDataAPI.append("Gambar_BE", formData.Gambar_BE)
        formDataAPI.append("UUID_BE", UUID_BE)
        formDataAPI.append("UUID_AD", UUID_AD)
        for (const entry of formDataAPI.entries()) {
            const [key, value] = entry;
            console.log(`${key}: ${value}`);
        }
        
        axios
        .put('https://cybersmartapps.et.r.appspot.com/NewsControl', formDataAPI, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            const message = response.data
            console.log(message)
            setIsSending(false)
            setModalUpdateShow(false)
            fetchDataBerita()
        })
        .catch(error => {
            console.error(error)
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
        formData.append("UUID_BE", deleteItemId)
        formData.append("UUID_AD", uuidad)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/DeleteNews", formData, {
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
                fetchDataBerita()
                
            })
            .catch((error) => {
                console.error("Error:", error)
            })

            .finally(() => {
                handleDeleteCancel()
            })
    }
    // ============================ END FUNCTION ============================

    // ====================== HTML CODE ========================
    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
            {/* MODAL DELETE SET UP */}
            <Modal show={showDeleteConfirmation} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-dashboard-thin">Konfirmasi Hapus Berita</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dashboard-clean ps-3">Apakah Anda yakin ingin menghapus item berita ini?</Modal.Body>
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
            <Modal size="lg" show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPlus className="icon-red"/></span>Tambah Berita Baru</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Judul Berita</Form.Label>
                            <Form.Control name="Judul_BE" type="text" value={formData.Judul_BE} onChange={handleChange} placeholder="Masukkan judul berita disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Deskripsi Berita</Form.Label>
                            <Form.Control name="Deskripsi_BE" as="textarea" rows={5} value={formData.Berita_BE} onChange={handleChange} placeholder="Masukkan deskripsi berita disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Kategori Berita</Form.Label>
                            <Form.Select name="Kategori_BE" aria-label="kategori berita" value={formData.Kategori_BE} onChange={handleChange}>
                                <option className="text-dashboard-clean">Pilih kategori berita</option>
                                <option className="text-dashboard-clean" value="Politik">Politik</option>
                                <option className="text-dashboard-clean" value="Ekonomi">Ekonomi</option>
                                <option className="text-dashboard-clean" value="Teknologi">Teknologi</option>
                                <option className="text-dashboard-clean" value="Hiburan">Hiburan</option>
                                <option className="text-dashboard-clean" value="Olahraga">Olahraga</option>
                                <option className="text-dashboard-clean" value="Kesehatan">Kesehatan</option>
                                <option className="text-dashboard-clean" value="Pendidikan">Pendidikan</option>
                                <option className="text-dashboard-clean" value="Lingkungan">Lingkungan</option>
                                <option className="text-dashboard-clean" value="Wisata">Wisata</option>
                                <option className="text-dashboard-clean" value="Gaya Hidup">Gaya Hidup</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Penerbit Berita</Form.Label>
                            <Form.Control name="Penerbit_BE" type="text" value={formData.Penerbit_BE} onChange={handleChange} placeholder="Masukkan penerbit berita disini" required></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Gambar Berita</Form.Label>
                            <Form.Control name="Gambar_BE" type="file" required onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <div className="mb-3">
                            <ButtonSecondary text={isSending ? "Mengirim..." : "Kirim"  } type="submit"></ButtonSecondary>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* MODAL UPDATE NEWS */}
            <Modal size="lg" show={modalUpdateShow} onHide={() =>setModalUpdateShow(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                        <div className="text-dashboard-clean"><span><FaPen className="icon-red"/></span>Update Berita</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4">
                    <Form onSubmit={(e) => handleUpdateSubmit(e, formData.UUID_BE)}>
                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Judul Berita</Form.Label>
                            <Form.Control name="Judul_BE" type="text" value={formData.Judul_BE} onChange={handleUpdateChange} placeholder="Masukkan judul berita disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Deskripsi Berita</Form.Label>
                            <Form.Control name="Deskripsi_BE" as="textarea" rows={5} value={formData.Deskripsi_BE} onChange={handleUpdateChange} placeholder="Masukkan deskripsi berita disini" required autoComplete="off"></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Kategori Berita</Form.Label>
                            <Form.Select name="Kategori_BE" aria-label="kategori berita" value={formData.Kategori_BE} onChange={handleUpdateChange}>
                                <option className="text-dashboard-clean">Pilih kategori berita</option>
                                <option className="text-dashboard-clean" value="Politik">Politik</option>
                                <option className="text-dashboard-clean" value="Ekonomi">Ekonomi</option>
                                <option className="text-dashboard-clean" value="Teknologi">Teknologi</option>
                                <option className="text-dashboard-clean" value="Hiburan">Hiburan</option>
                                <option className="text-dashboard-clean" value="Olahraga">Olahraga</option>
                                <option className="text-dashboard-clean" value="Kesehatan">Kesehatan</option>
                                <option className="text-dashboard-clean" value="Pendidikan">Pendidikan</option>
                                <option className="text-dashboard-clean" value="Lingkungan">Lingkungan</option>
                                <option className="text-dashboard-clean" value="Wisata">Wisata</option>
                                <option className="text-dashboard-clean" value="Gaya Hidup">Gaya Hidup</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Penerbit Berita</Form.Label>
                            <Form.Control name="Penerbit_BE" type="text" value={formData.Penerbit_BE} onChange={handleUpdateChange} placeholder="Masukkan penerbit berita disini" required></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" control>
                            <Form.Label className="text-dashboard-clean">Gambar Berita</Form.Label>
                            <Form.Control name="Gambar_BE" type="file" required onChange={handleUpdateChange}>
                            </Form.Control>
                            <span>
                                <p className="mt-2">File sebelumnya: {dataGambarBerita}</p>
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
                        <Form.Control placeholder="Cari Berita" aria-label="Search" aria-describedby="basic-addon1" />
                    </InputGroup>
                </Col>
                <Col xs lg="5">
                </Col>
                <Col xs lg="2">
                    <Button className="ButtonCustomSearch text-dashboard-white" onClick={() => {setModalShow(true); resetFormData()}}>
                        <span className="text-dashboard-white"> 
                            <FaPlus className="pe-1" style={{fill: '#fff'}}/>Berita
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
                            <th className="table-head-custom">Judul Berita</th>
                            <th className="table-head-custom">Kategori</th>
                            <th className="table-head-custom">Penerbit</th>
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
                                <td className="table-body-custom"><Skeleton width={90} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={65} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={65} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                <td className="table-body-custom"><Skeleton width={15} height={15} /></td>
                            </tr>
                            </>
                        ) : (
                            <>
                                {dataBerita.length === 0 ? (
                                    <>
                                        <tr>
                                            <td colSpan="8" className="table-body-custom text-center">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        {dataBerita.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_BE}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom">
                                                    <span><img src={`/sources/img_admin/${item.Gambar_AI}`} alt="Avatar" className="image-avatar"/></span>
                                                    {item.Email_AD}
                                                </td>
                                                <td className="table-body-custom truncate-text">{item.Judul_BE}</td>
                                                <td className="table-body-custom">{item.Kategori_BE}</td>
                                                <td className="table-body-custom">{item.Penerbit_BE}</td>
                                                <td className="table-body-custom">{item.CreatedAt}</td>
                                                <td className="table-body-custom">{item.UpdatedAt}</td>
                                                <td className="table-body-custom">
                                                    <DropdownButton title={<FaEllipsisV style={{ fill: '#9FAACA' }}/>} className="dropdown-button-class">
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleUpdate(item.UUID_BE)}>
                                                            <div className="text-dashboard-thin">
                                                                <span><FaPen className="icon-button me-1" style={{ fill: '#A7213B' }}/></span>
                                                                Ubah
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className="text-menu-dropdown" onClick={() => handleDeleteConfirmation(item.UUID_BE)}> 
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
export default ManageItems

// ====================== END CODE ========================


