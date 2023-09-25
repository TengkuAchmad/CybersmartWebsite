// LIBRARY IMPORT
import { Row, Col, Form, Button } from "react-bootstrap"

import { useNavigate, Link } from "react-router-dom"

import axios from "axios"

import { useState } from "react"

// COMPONENTS IMPORT
import ButtonPrimary from "../../Components/ButtonPrimary"

// ASSETS IMPORT
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// FUNCTIONS IMPORT
import TokenHandle from "./TokenHandle"

// ====================== MAIN CODE ========================
const LoginHandle = () => {

    // VARIABEL DEFINITION
    const navigate  = useNavigate()

    // STATE DEFINITION
    // Spinner on Button
    const [isLoading, setIsLoading] = useState(false)

    // Show/Hide Password
    const [showPassword, setShowPassword] = useState(false)

    // Form data Login Container
    const [formData, setFormData] = useState({
        Email_AD    : "",
        Password_AD : ""
    })

    // HANDLE DEFINITION
    // Menampilkan dan menyembunyikan password
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    // Menyimpan perubahan data pada form ke kontainer
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Navigasi Halaman
    const handleRegisterClick = () => {
        navigate('/register')
    }

    
    // Menyimpan dan memperbarui form data ke server
    const handleSubmit = (e) => {
        // Reset Container
        e.preventDefault()
        const formData = new FormData(e.target)

        // Menampilkan Spinner pada tombol
        setIsLoading(true)
        // Mengirim form data ke API
        axios
            .post('https://cybersmartserver.as.r.appspot.com/AuthAdmin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                const data = response.data
                const access_token = data['access_token']
                const uuid_admin = data['uuid_admin']
                console.log(uuid_admin)

                // Menyimpan access token ke session
                localStorage.setItem('access_token', access_token)

                // Menyimpan alamat uuid ke session
                localStorage.setItem('UUID_AD', uuid_admin)
                
                // Melakukan pengecekan access_token
                TokenHandle(access_token, () => {
                    navigate('/dashboard')
                })
            })

            // Jika response API error
            .catch(error => {
                const message = error.response.data
                console.log(message)
                toast.error(message['msg'], {
                    position: toast.POSITION.TOP_LEFT
                })
            })

        // Set timeout
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    // ====================== HTML CODE ========================
    return (
        <>
        <ToastContainer theme="light" style={{ width: '500px' }} />
          {/* FORM CONTROL TO GET DATA LOGIN */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2 mt-4 text-start" controlId="Email_AD">
                    <Form.Label className="text-dashboard-white">Alamat Email</Form.Label>
                    <Form.Control name="Email_AD" type="email" value={formData.Email_AD} onChange={handleChange} placeholder="admin@example.com" required autoComplete="off"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3  text-start" controlId="Password_AD">
                    <Form.Label className="text-dashboard-white">Kata Sandi</Form.Label>
                    <div className="password-input">
                        <Form.Control name="Password_AD" value={formData.Password_AD} type={showPassword ? 'text' : 'password'} onChange={handleChange} placeholder="************" required autoComplete="off"/>
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
                    <Col xs lg="6 text-start">
                    </Col>
                    <Col xs lg='6 text-end'>
                        <Link to="/forgotpass">Lupa Password?</Link>
                    </Col>
                </Row>

                <Row className='text-center mt-3 ps-3 pe-3'>
                    <ButtonPrimary text={isLoading ? "Mencoba Masuk..."  : "Masuk" } type="submit" disabled={isLoading}></ButtonPrimary>
                </Row>
            </Form>

            <div className="text-center">
                <p className="mt-2 mb-2 text-dashboard-white">Atau</p>
                <Button onClick={handleRegisterClick} text="Daftar" type="button" className="ButtonCustom">Daftar</Button>
                <p className="mt-5 mb-2 text-dashboard-white">© 2023 | Cybersmart Apps</p>
            </div>
        </>
    );
    // ====================== END HTML CODE ========================
}

export default LoginHandle
// ====================== END CODE ========================