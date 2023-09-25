// LIBRARY IMPORT
import { Row, Col } from "react-bootstrap"

import { useState, useEffect } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

// ASSETS IMPORT
import ProfileInfo from "../../Assets/server/icon/ProfileInfo.png"

import DocumentInfo from "../../Assets/server/icon/DocumentInfo.png"

import AspirationInfo from "../../Assets/server/icon/AspriationInfo.png"

import ImageComponent from "../ImageComponent"

// ====================== MAIN CODE ========================
const DashboardOptions = () => {
    // VARIABLE DEFINITION
    const [ loading, setLoading ] = useState(true)
    // DATA API CONTAINER
    // Data Admin
    const [ dataAdmin, setDataAdmin ] = useState(null)
    // Data User
    const [ userCount, setUserCount ] = useState(null)
    const [ newUserCount, setNewUserCount ] = useState(null)
    const [ verifiedUserCount, setVerifiedUserCount ] = useState(null)
    const [ unverifiedUserCount, setUnverifiedUserCount ] = useState(null)

    // Data Document
    const [ documentReadyCount, setDocumentReadyCount ] = useState(null)
    const [ documentReqCount, setDocumentReqCount ] = useState(null)
    const [ documentFinishCount, setDocumentFinishCount ] = useState(null)
    const [ newDocumentReqCount, setNewDocumentReqCount ] = useState(null)

    // Data Aspiration
    const [ AspirasiCount, setAspirasiCount ] = useState(null)
    const [ newAspirasiCount, setNewAspirasiCount ] = useState(null)
    const [ processAspirasiCount, setProcessAspirasiCount ] = useState(null)
    const [ finishAspirasiCount, setFinishAspirasiCount ] = useState(null)

    // Data News
    const [ dataBerita, setDataBerita ] = useState([])

    // Data Product Request
    const [ dataProduct, setDataProduct ] = useState([])
    
    // FETCH DATA DEFINITION

    // Data Admin
    const fetchDataAdmin = () => {
        const UUID_AD = localStorage.getItem("UUID_AD")
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/UQAdminOptions/${UUID_AD}`)
            .then((response) => {
                const data = response.data[0]
                const message = data['Nama_AI']
                console.log(message)
                setDataAdmin(message)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    // Data Product
    const fetchDataProduct = () => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/ProductRequest")
            .then((response) => {
                setDataProduct(response.data.data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    // Data News
    const fetchDataBerita = () => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/NewsControl")
            .then((response) => {
                setDataBerita(response.data.data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    // Data Dashboard
    const fetchData = () => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DashboardCountInfo")
            .then((response) => {
                const data = response.data.data
                console.log(data)
                // Definisi data user
                setUserCount(data.jumlah_user)
                setNewUserCount(data.jumlah_user_new)
                setVerifiedUserCount(data.jumlah_user_verified)
                setUnverifiedUserCount(data.jumlah_user_unverified)

                // Definisi data dokumen
                setDocumentReadyCount(data.jumlah_document_ready)
                setDocumentReqCount(data.jumlah_document_req)
                setDocumentFinishCount(data.jumlah_document_finish)
                setNewDocumentReqCount(data.jumlah_document_new)

                // Definisi data aspirasi
                setAspirasiCount(data.jumlah_aspirasi)
                setNewAspirasiCount(data.jumlah_aspirasi_new)
                setProcessAspirasiCount(data.jumlah_aspirasi_diproses)
                setFinishAspirasiCount(data.jumlah_aspirasi_selesai)
            })

            .catch((error) => {
                console.error("Error:", error)
            })
    }

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataAdmin()
            fetchData()
            fetchDataBerita()
            fetchDataProduct()
            setLoading(false)
        }, 3000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    // ====================== HTML CODE ========================
    return (
        <>  
            {/* SKELETON LOADER */}
            {loading ? (
                <>
                <Row className="pt-3 pb-1 ms-1">
                    <Col xs lg="5" className="me-3">
                        <Row className="box-wrap">
                            <div className="p-0">
                                <Skeleton width={280} height={15} />
                            </div>
                            <Col xs lg="2 ps-0 pe-0">
                                <Skeleton width={60} height={60} circle="true" />
                            </Col>
                            <Col xs lg="5 ps-2 pe-0">
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                            </Col>
                            <Col xs lg="5 ps-0 pe-0">
                                <Skeleton width={163} height={15}/>
                                <Skeleton width={65} height={15}/>
                                <Skeleton width={163} height={15}/>
                                <Skeleton width={65} height={15}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs lg="5">
                        <Row className="box-wrap">
                            <div className="p-0">
                                <Skeleton width={280} height={15} />
                            </div>
                            <Col xs lg="2 ps-0 pe-0">
                                <Skeleton width={60} height={60} circle="true" />
                            </Col>

                            <Col xs lg="5 ps-2 pe-0">
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                            </Col>

                            <Col xs lg="5 ps-0 pe-0">
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="pt-1 pb-3 ms-1">
                    <Col xs lg="5" className="me-3">
                        <Row className="box-wrap ps-5 ">
                            <Col xs={8} className="p-0">
                                <div className="p-0">
                                    <Skeleton width={200} height={15} />
                                </div>
                            </Col>
                            <Col xs={4} className="text-end">
                                <div className="p-0">
                                    <Skeleton width={100} height={15} />
                                </div>
                            </Col>
                            <Row className="box-wrap mt-2">
                                <Col xs lg="2" className="justify-content-center">
                                    <div className="circle-profile">
                                        <Skeleton width={60} height={60} circle="true" />
                                    </div>
                                </Col>
                                <Col xs lg="10" className="ps-4">
                                    <Skeleton width={165} height={15} />
                                    <Skeleton width={65} height={15} />
                                    <Skeleton width={165} height={15} />
                                </Col>
                            </Row>

                            <Row className="box-wrap mb-2">
                                <Col xs lg="2" className="justify-content-center">
                                    <div className="circle-profile">
                                        <Skeleton width={60} height={60} circle="true" />
                                    </div>
                                </Col>
                                <Col xs lg="10" className="ps-4">
                                    <Skeleton width={165} height={15} />
                                    <Skeleton width={65} height={15} />
                                    <Skeleton width={165} height={15} />
                                </Col>
                            </Row>
                            <Row className="box-wrap mb-2">
                                <Col xs lg="2" className="justify-content-center">
                                    <div className="circle-profile">
                                        <Skeleton width={60} height={60} circle="true" />
                                    </div>
                                </Col>
                                <Col xs lg="10" className="ps-4">
                                    <Skeleton width={165} height={15} />
                                    <Skeleton width={65} height={15} />
                                    <Skeleton width={165} height={15} />
                                </Col>
                            </Row>
                        </Row>
                    </Col>

                    <Col xs lg="5">
                        <Row className="box-wrap">
                            <div className="p-0">
                                <Skeleton width={280} height={15} />
                            </div>
                            <Col xs lg="2 pt-1 ps-0 pe-0">
                                <Skeleton width={60} height={60} circle="true" />
                            </Col>
                            <Col xs lg="5 ps-2 pe-0">
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                            </Col>
                            <Col xs lg="5 ps-0 pe-0">
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                                <Skeleton width={130} height={15} />
                                <Skeleton width={65} height={15} />
                            </Col>
                        </Row>

                        <Row className="box-wrap">
                            <Col xs={8}>
                                <div className="p-0">
                                    <Skeleton width={280} height={15} />
                                </div>
                            </Col>
                            <Col xs={4} className="text-end">
                                <div className="p-0">
                                    <Skeleton width={100} height={15} />
                                </div>
                            </Col>
                            <Row className="box-wrap mb-2 ms-1">
                                <Col xs lg="2" className="justify-content-center">
                                    <div className="circle-profile">
                                    <Skeleton width={60} height={60} circle="true" />
                                    </div>
                                </Col>
                                <Col xs lg="10" className="ps-4">
                                    <Skeleton width={130} height={15} />
                                    <Skeleton width={65} height={15} />
                                    <Skeleton width={130} height={15} />
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
                </>
            ) : (
                <>
                <Row className="pt-3 pb-1 ms-1">
                    <Col xs lg="5" className="me-3">
                        <Row className="box-wrap">
                            <h6 className="text-dashboard-clean">Informasi Jumlah Pengguna</h6>
                            <Col xs lg="2 pt-1 ps-0 pe-0">
                                <img src={ProfileInfo} className="icons-info"></img>
                            </Col>

                            <Col xs lg="5 pt-1 ps-2 pe-0">
                                <p className="text-dashboard-black">Total Pengguna</p>
                                <p className="text-dashboard">{userCount} akun</p>
                                <p className="text-dashboard-black">Pengguna Baru</p>
                                <p className="text-dashboard">{newUserCount} akun</p>
                            </Col>

                            <Col xs lg="5 pt-1 ps-0 pe-0">
                                <p className="text-dashboard-black">Terverifikasi</p>
                                <p className="text-dashboard">{verifiedUserCount} akun</p>
                                <p className="text-dashboard-black">Tidak Terverifikasi</p>
                                <p className="text-dashboard">{unverifiedUserCount} akun</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs lg="5">
                        <Row className="box-wrap">
                            <h6 className="text-dashboard-clean">Informasi Jumlah Dokumen</h6>
                            <Col xs lg="2 pt-1 ps-0 pe-0">
                                <img src={DocumentInfo} className="icons-info"></img>
                            </Col>

                            <Col xs lg="5 pt-1 ps-2 pe-0">
                                <p className="text-dashboard-black">Dokumen Tersedia</p>
                                <p className="text-dashboard">{documentReadyCount} dokumen</p>
                                <p className="text-dashboard-black">Dokumen Selesai</p>
                                <p className="text-dashboard">{documentFinishCount} dokumen</p>
                            </Col>

                            <Col xs lg="5 pt-1 ps-0 pe-0">
                                <p className="text-dashboard-black">Dokumen Diajukan</p>
                                <p className="text-dashboard">{documentReqCount} dokumen</p>
                                <p className="text-dashboard-black">Dokumen Ditinjau</p>
                                <p className="text-dashboard">{newDocumentReqCount} dokumen</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="pt-1 pb-3 ms-1">
                    <Col xs lg="5" className="me-3">
                        <Row className="box-wrap ps-5 ">
                            <Col xs={8} className="p-0">
                                <h6 className="text-dashboard-clean">Pengajuan Produk Etalase</h6>
                            </Col>
                            <Col xs={4} className="text-end">
                                <a href="/your-link"   ><p className="text-dashboard-clean">Lihat Semua</p></a>
                            </Col>
                            {dataProduct.slice(0, 4).map((item) => (
                                <Row className="box-wrap mb-2">
                                    <Col xs lg="2" className="justify-content-center">
                                        <div className="circle-profile">
                                            <ImageComponent fileId={item.Gambar_PD} customClasses={"img-product-circle"}/>
                                        </div>
                                    </Col>
                                    <Col xs lg="10" className="ps-4">
                                        <p className="text-dashboard-black">{item.Judul_PD}</p>
                                        <p className="text-dashboard">{item.Kontak_PD}</p>
                                        <p className="text-dashboard-black">Diajukan pada : {item.CreatedAt}</p>
                                    </Col>
                                </Row>
                            ))}
                        </Row>
                    </Col>

                    <Col xs lg="5">
                        <Row className="box-wrap">
                            <h6 className="text-dashboard-clean">Informasi Jumlah Aspirasi</h6>
                            <Col xs lg="2 pt-1 ps-0 pe-0">
                                <img src={AspirationInfo} className="icons-info"></img>
                            </Col>
                            <Col xs lg="5 pt-1 ps-2 pe-0">
                                <p className="text-dashboard-black">Total Aspirasi</p>
                                <p className="text-dashboard">{AspirasiCount} aspirasi</p>
                                <p className="text-dashboard-black">Aspirasi Selesai</p>
                                <p className="text-dashboard">{finishAspirasiCount} aspirasi</p>
                            </Col>
                            <Col xs lg="5 pt-1 ps-0 pe-0">
                                <p className="text-dashboard-black">Aspirasi Baru</p>
                                <p className="text-dashboard">{newAspirasiCount} aspirasi</p>
                                <p className="text-dashboard-black">Aspirasi Diproses</p>
                                <p className="text-dashboard">{processAspirasiCount} aspirasi</p>
                            </Col>
                        </Row>

                        <Row className="box-wrap">
                            <Col xs={8}>
                                <h6 className="text-dashboard-clean">Rekapitulasi Berita</h6>
                            </Col>
                            <Col xs={4} className="text-end">
                                <a href="/your-link"><p className="text-dashboard-clean">Lihat Semua</p></a>
                            </Col>

                            {dataBerita.slice(0, 2).map((item) => (
                                <Row className="box-wrap mb-2 ms-1" key={item.UUID_BE}>
                                    <Col xs lg="2" className="justify-content-center">
                                        <div className="circle-profile">
                                            <ImageComponent fileId={item.Gambar_BE} style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </Col>
                                    <Col xs lg="10" className="ps-4">
                                        <p className="text-dashboard-black">{item.Kategori_BE}</p>
                                        <p className="text-dashboard">{item.Judul_BE}</p>
                                        <p className="text-dashboard-black">{item.CreatedAt}</p>
                                    </Col>
                                </Row>
                            ))}
                        </Row>
                    </Col>
                </Row>
                </>
            )}
        </> 
    )

    // ====================== END HTML CODE ========================
}
export default DashboardOptions
// ======================  END CODE ========================