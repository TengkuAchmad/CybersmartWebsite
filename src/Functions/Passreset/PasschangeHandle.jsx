// LIBRARY IMPORT
import { Row, Form} from "react-bootstrap"

import { useNavigate, useLocation } from "react-router-dom"

import axios from "axios"

import { useState } from "react"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// COMPONEMTS IMPORT
import ButtonPrimary from "../../Components/ButtonPrimary"


// ====================== MAIN CODE ========================
const PasschangeHandle = () => {
    // VARIABLE DEFINITION
    // Navigasi URL
    const navigate = useNavigate()

    // Variabel untuk mendapatkan data email dari URL
    const location = useLocation()
    
    const searchParams = new URLSearchParams(location.search)

    const email = searchParams.get('email')

    // Spinner on Button
    const [ isLoading, setIsLoading ] = useState(false)

    // Definisi container untuk data dari form
    const [ formData, setFormData ] = useState({
        Email_AI : "",
        Password_AD : ""
    })

    // HANDLE DEFINITION
    // Menyimpan perubahan data pada form ke kontainer
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    // Mengirim form data ke API
    const handleSubmit = (e) => {
        // Reset container
        e.preventDefault()
        const formData =  new FormData(e.target)

        // Menampilkan spinner pada tombol
        setIsLoading(true)

        // Mengirim data ke API (metode POST)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/PasswordChange", formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data)
                navigate('/passresetstate')
            })
            .catch(error => {
                const msg = error.response.data
                toast.error(msg['Result'], {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            })

        setTimeout( ()=> {
            setIsLoading(false)
        }, 3000)
    }
    
    // ====================== HTML CODE ========================
    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
            <div className="box-forgotpass">
                {/* FORM CONTROL TO RESET PASSWORD */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4 mt-4 text-center" controlId="Password_AD">
                        <Form.Label className="text-dashboard-white-thin">Masukkan kata sandi baru Anda:</Form.Label>
                        <Form.Control name="Password_AD" type="password" value={formData.Password_AD} onChange={handleChange} placeholder="***********" required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-4 mt-4 text-center" controlId="Email_AI">
                        <Form.Control name="Email_AI" type="hidden" value={email} onChange={handleChange} placeholder="***********" required></Form.Control>
                    </Form.Group>

                    <Row className='text-center mt-3 ps-3 pe-3'>
                        <ButtonPrimary text={isLoading ? "Menyimpan..."  : "Simpan" }  type="submit" disabled={isLoading}>/</ButtonPrimary>
                    </Row>
                </Form>
            </div>
        </>
    )
    // ====================== END HTML CODE ========================
}

export default PasschangeHandle

// ====================== END CODE ========================