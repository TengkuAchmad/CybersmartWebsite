// LIBRARY IMPORT
import { Row, Col, Form } from "react-bootstrap"

import { useNavigate, useLocation } from "react-router-dom"

import axios from "axios"

import { useState } from "react"

// COMPONENTS IMPORT
import ButtonPrimary from "../../Components/ButtonPrimary"

// ============================ MAIN CODE ============================
const OTPHandle = () => {
    // VARIABLE DEFINITION
    // Navigasi URL
    const navigate = useNavigate()

    // Variabel untuk mendapatkan data email dari URL
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email")

    // Spinner on Button
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    // Definisi container untuk data dari form
    const [formData, setFormData] = useState({
        OTP_AI1: "",
        OTP_AI2: "",
        OTP_AI3: "",
        OTP_AI4: "",
    })

    // HANDLE DEFINITION
    // Menyimpan perubahan data pada form ke kontainer
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Mengirim form data ke API
    const handleSubmit = (e) => {
        // Reset container
        e.preventDefault()
        const otp = Object.values(formData).join("")
        
        const data = {
            "OTP_AI" : otp,
            "Email_AI" : email
        }

        // Menampilkan spinner pada tombol
        setIsLoading(true);

        // Mengirim data ke API (metode POST)
        axios
            .post("https://cybersmartserver.as.r.appspot.com/CheckOTP", data ,{
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log(response.data);
                navigate(`/passchange?email=${email}`)
            })
            .catch((error) => {
                setError(true);
                setIsLoading(false)
            })

        setTimeout(() => {
            setError(false)
        }, 5000)
    }

    // ====================== HTML CODE ========================
    return (
        <>
            <div className="box-forgotpass">
                {/* FORM CONTROL TO GET DATA EMAIL */}
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs>
                            <Form.Group className="mb-4 mt-4  text-center" controlId="OTP_AI1">
                                <Form.Control name="OTP_AI1" type="text" className="text-form-otp text-center pt-5 pb-5 ps-3 pe-3" value={formData.OTP_AI1} onChange={handleChange} maxLength="1" required autoComplete="off"></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs lg="3">
                            <Form.Group className="mb-4 mt-4 text-center" controlId="OTP_AI2">
                                <Form.Control name="OTP_AI2" type="text" className="text-form-otp text-center pt-5 pb-5 ps-3 pe-3" value={formData.OTP_AI2} onChange={handleChange} maxLength="1" required autoComplete="off"></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs lg="3">
                            <Form.Group className="mb-4 mt-4 text-center" controlId="OTP_AI3">
                                <Form.Control name="OTP_AI3" type="text" className="text-form-otp text-center pt-5 pb-5 ps-3 pe-3" value={formData.OTP_AI3} onChange={handleChange} maxLength="1" required autoComplete="off"></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs lg="3">
                            <Form.Group className="mb-4 mt-4 text-center" controlId="OTP_AI4">
                                <Form.Control name="OTP_AI4" type="text" className="text-form-otp text-center pt-5 pb-5 ps-3 pe-3" value={formData.OTP_AI4} onChange={handleChange} maxLength="1" required autoComplete="off"></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="text-center mt-3 ps-3 pe-3">
                        <ButtonPrimary text={ isLoading ? "Memverifikasi..." : error ? "Kode OTP salah!" : "Verifikasi"} type="submit"disabled={isLoading} className={error ? "error-button" : ""}></ButtonPrimary>
                    </Row>
                </Form>
            </div>
    </>
  )
  // ====================== END HTML CODE ========================
}
export default OTPHandle
// ====================== END CODE ========================
