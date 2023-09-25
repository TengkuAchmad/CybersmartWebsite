// LIBRARY IMPORT
import { Row, Form } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import axios from "axios"

import { useState } from "react"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// COMPONENTS IMPORT
import ButtonPrimary from "../../Components/ButtonPrimary"


// ====================== MAIN CODE ========================
const PassresetHandle = () => {
    // VARIABLE DEFINITION
    const navigate = useNavigate()

    // Spinner on Button
    const [isLoading, setIsLoading] = useState(false)

    // Form data Email to send OTP Container
    const [formData, setFormData] = useState({
        Email_AI : ""
    })

    // HANDLE DEFINITION
    // Menyimpan perubahan data pada form ke kontainer
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    // Menyimpan dan memperbarui form data ke server
    const handleSubmit = (e) => {
        // Reset Container
        e.preventDefault()
        const formData = new FormData(e.target)

        // Mendapatkan data email dari form
        const email = formData.get('Email_AI')

        // Menampilkan Spinner pada tombol
        setIsLoading(true)

        // Mengirim form data ke API
        axios
            .post('https://cybersmartserver.as.r.appspot.com/AuthOTP', formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data);
                navigate(`/otpcheck?email=${email}`)
            })

            // Jika response API error
            .catch((error) => {
                const message = error.response.data
                toast.error(message['msg'], {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            })

        setTimeout(() => {
            setIsLoading(false)
        },3000)
        // 
    }

    // ====================== HTML CODE ========================
    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} />
            <div className="box-forgotpass">
                {/* FORM CONTROL TO GET DATA EMAIL */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4 mt-4 text-center" controlId="Email_AI">
                        <Form.Label className="text-dashboard-white-thin">Masukkan Email Anda:</Form.Label>
                        <Form.Control name="Email_AI" type="email" value={formData.Email_AI} onChange={handleChange} placeholder="example@gmail.com" required></Form.Control>
                    </Form.Group>

                    <Row className='text-center mt-3 ps-3 pe-3'>
                        <ButtonPrimary text={isLoading ? "Mengirim kode..."  : "Kirim Kode OTP" }  type="submit" disabled={isLoading}>/</ButtonPrimary>
                    </Row>
                </Form>
            </div>
        </>
    )
    // ====================== END HTML CODE ========================
}
export default PassresetHandle
// ====================== END CODE ========================