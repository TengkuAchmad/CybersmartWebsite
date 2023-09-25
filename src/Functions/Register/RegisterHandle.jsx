// LIBRARY IMPORT
import { Row, Col, Form, Modal } from "react-bootstrap"

import axios from "axios"

import { useNavigate } from "react-router-dom"

import { useState } from "react"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


// COMPONENTS IMPORT
import ButtonPrimary from "../../Components/ButtonPrimary"

// ASSETS IMPORT
import { FaEye, FaEyeSlash } from 'react-icons/fa'

// ====================== MAIN CODE ========================
const RegisterHandle = () => {
    // VARIABLE DEFINITION
    const navigate = useNavigate()

    // Modal
    const [showModal, setShowModal] = useState(false)

    // Spinner on Button
    const [isLoading, setIsLoading] = useState(false)

    // Show/Hide Password
    const [showPassword, setShowPassword] = useState(false)

    // Form data Register Container
    const [formData, setFormData] = useState({
        NamaLengkap_AI: "",
        NIP_AI: "",
        WANumber_AI: "",
        Email_AD: "",
        Password_AD: "",
        Email_AI: ""
    })


    // HANDLE DEFINITION
    const handleModalShow = () => {
        setShowModal(true)
    }
    // Menampilkan dan menyembunyikan password
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    // Navigasi Halaman
    const handleLoginClick = () => {
        navigate('/')
    }
    
    // Menyimpan perubahan data pada form ke kontainer
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Menyimpan dan memperbarui form data ke server
    const handleSubmit = (e) => {
        // Reset Container
        e.preventDefault()
        const formData = new FormData(e.target)

        // Menampilkan spinner pada tombol
        setIsLoading(true)

        // Mengirim form data ke API
        axios
            .post('https://cybersmartserver.as.r.appspot.com/AdminOptions', formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                navigate('/validate')
            })
            .catch(error => {
                const message = error.response.data
                toast.error(message['msg'], {
                    position: toast.POSITION.TOP_LEFT
                })
            })
        
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }
    
    
    // ====================== HTML CODE ========================
    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} />
            {/* MODAL UPDATE PRODUCT */}
            <Modal size="lg" show={showModal} onHide={() =>setShowModal(false)} aria-labelledby="modal">
                <Modal.Header closeButton >
                    <Modal.Title id="modal" className="ps-2 pe-2">
                            <div className="text-dashboard-clean">
                                Persyaratan dan Peraturan Administrator
                            </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ps-4 pe-4 m-0 mb-5">
                    <Row className="mt-2 ms-2">
                        <>
                            <Row className="text-dashboard-clean"><h6>Penggunaan Akun Administrator</h6></Row>
                            <ul className="custom-list">
                                <li className="text-dashboard-thin">Hanya pengguna yang memiliki peran sebagai admin yang diizinkan menggunakan akun admin.</li>
                                <li className="text-dashboard-thin">Akun admin harus digunakan hanya untuk tujuan terkait tugas administratif dan manajemen sistem yang relevan.</li>
                            </ul>                
                        </>
                    </Row>
                </Modal.Body>
            </Modal>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2 mt-4 text-start" controlId="NamaLengkap_AI">
                    <Form.Label className="text-dashboard-white">Nama Lengkap (sesuai KTP)</Form.Label>
                    <Form.Control name="NamaLengkap_AI" type="text" value={formData.NamaLengkap_AI} onChange={handleChange} placeholder="Eko Nur Khazi" required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3  text-start" controlId="NIP_AI">
                    <Form.Label className="text-dashboard-white">Nomor Induk Pegawai</Form.Label>
                    <Form.Control name="NIP_AI" value={formData.NIP_AI} type="number" onChange={handleChange} placeholder="12345678-901234-5-678" required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3  text-start" controlId="Email_AI">
                    <Form.Label className="text-dashboard-white">Email Aktif</Form.Label>
                    <Form.Control name="Email_AI" value={formData.Email_AI} type="email" onChange={handleChange} placeholder="example@gmail.com" required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3  text-start" controlId="WANumber_AI">
                    <Form.Label className="text-dashboard-white">Nomor WhatsApp Aktif</Form.Label>
                    <Form.Control name="WANumber_AI" value={formData.WANumber_AI} type="number" onChange={handleChange} placeholder="081234567890" required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3  text-start" controlId="Email_AD">
                    <Form.Label className="text-dashboard-white">Email Admin</Form.Label>
                    <Form.Control name="Email_AD" value={formData.Email_AD} type="email" onChange={handleChange} placeholder="admin@cyber.com" required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3  text-start" controlId="Password_AD">
                    <Form.Label className="text-dashboard-white">Kata Sandi</Form.Label>
                    <div className="password-input">
                        <Form.Control name="Password_AD" value={formData.Password_AD} type={showPassword ? 'text' : 'password'} onChange={handleChange} placeholder="************" required/>
                        <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <FaEyeSlash style={{ fill: '#A7213B' }} />
                                    ) : (
                                <FaEye style={{ fill: '#A7213B' }} />
                            )}
                        </div>
                    </div>
                </Form.Group>
                
                <Row className="m-0 p-0">
                    <Col xs lg="1 text-start m-0 p-0"> 
                        <Form.Check type='checkbox'/>
                    </Col>

                    <Col xs lg="11 text-start m-0 p-0">
                        <Form.Check.Label className="custom-label">Saya sudah membaca dan menyetujui <a onClick={handleModalShow}>Persyaratan dan Peraturan Admin</a></Form.Check.Label>
                    </Col>
                </Row>

                <Row className='text-center mt-3 ps-3 pe-3'>
                    <ButtonPrimary text={isLoading ? "Loading..."  : "Daftar" } type="submit" disable={isLoading} >/</ButtonPrimary>
                </Row>
            </Form>

            <div className="text-center">
                <p className="mt-2 mb-2 text-dashboard-white">Sudah punya akun? <a onClick={handleLoginClick}>Masuk</a></p>
                <p className="mt-5 text-dashboard-white">© 2023 | Cybersmart Apps</p>
            </div>
        </>
    )
    // ====================== END HTML CODE ========================
}

export default RegisterHandle
// ====================== END CODE ========================