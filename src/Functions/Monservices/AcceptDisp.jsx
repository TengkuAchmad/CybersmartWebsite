import React from "react"

import { Row, Table, Modal } from "react-bootstrap"

import { useState, useEffect, useCallback } from "react"

import axios from "axios"

import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import { FaSearch, FaInfo, FaPlus } from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import ImageComponent from "../../Components/ImageComponent"

const AcceptDisp = () =>{
    // VARIABLE DEFINITION
    const [ dataDocRequest, setDataDocRequest ] = useState([])

    const [ loading, setLoading ] = useState(true)

    const [ modalShow, setModalShow ] = useState(false)

    const [ dataDetailUser, setDataDetailUser ] = useState([])

    const [ dataNotExist, setDataNotExist ] = useState(false)
       
    const fetchDataDocRequest = useCallback(() => {
        axios
            .get("https://cybersmartserver.as.r.appspot.com/DocToAcceptControl")
            .then((response) => {
                setDataDocRequest(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setDataNotExist(true)
            })
    })

    // PENANGANAN AUTO LOADING DATA
    useEffect(() => {
        // AUTO REFRESH
        const interval = setInterval(() => {
            fetchDataDocRequest()
            setLoading(false)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [fetchDataDocRequest])


    const handleModal = (uuid) => {
        setModalShow(true)
        axios
            .get(`https://cybersmartserver.as.r.appspot.com/UQUserFileControl//${uuid}`)
            .then((response) => {
                const data = response.data.data
                setDataDetailUser(data)
                console.log(dataDetailUser)
            })

            .catch((error) => {
                console.error("Error:", error)
            })
    }

    const handleShow= (fileid) => {
        axios
          .get(`https://cybersmartserver.as.r.appspot.com/GenerateShow/${fileid}`)
          .then((response) => {
            // Handle response here, misalnya, membuka tautan unduhan dalam jendela baru
            const downloadLink = response.data;
            if (downloadLink) {
              window.open(downloadLink, "_blank");
            } else {
              // Handle jika tautan unduhan tidak tersedia
              console.error("Tautan unduhan tidak tersedia");
            }
          })
          .catch((error) => {
            // Handle error
            console.error("Error:", error);
          });
      };
      
    const handleVerified = (uuid) => {
        const formData = new FormData()
        const uuidad = localStorage.getItem("UUID_AD")
        formData.append("UUID_AD", uuidad)
        formData.append("UUID_DR", uuid)
        for (const pair of formData.entries()) {
            var key = pair[0];
            var value = pair[1];
            console.log("Key: " + key + ", Value: " + value);
        }
        axios
            .post("https://cybersmartserver.as.r.appspot.com/VerifiedDocReq", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const message = response.data
                console.log(message)
                toast.success(message['msg'], {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                fetchDataDocRequest()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    const getStatusClass = (action) => {
        if (action === "Terverifikasi"){
            return "status-add-news"
        } else if (action == "Ditolak"){
            return "status-delete-news"
        } else if (action == "Ditinjau"){
            return "status-deactivate-news"
        } else if (action == "Selesai"){
            return "status-add-news"
        }
    }

    return (
        <>
            <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
            <Row>
                <Table hover>
                    <thead >
                        <tr>
                            <th className="table-head-custom">No.</th>
                            <th className="table-head-custom">No. Tiket</th>
                            <th className="table-head-custom">Dokumen</th>
                            <th className="table-head-custom">Pemohon</th>
                            <th className="table-head-custom">Diajukan</th>
                            <th className="table-head-custom">Status Berkas</th>
                            <th className="table-head-custom">Pihak Disposisi</th>
                            <th className="table-head-custom">Status Disposisi</th>
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
                                    <td className="table-body-custom"><Skeleton width={85} height={15} /></td>
                                </tr>
                            </>
                        ) : (
                            <>
                                {dataNotExist ? (
                                    <tr>
                                        <td colSpan="8" className="table-body-custom text-center">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {dataDocRequest.map((item, index) => (
                                            <tr key={`${index}_${item.UUID_DR}`}>
                                                <td className="table-body-custom">{index + 1}.</td>
                                                <td className="table-body-custom truncate-text">{item.DocTicket}</td>
                                                <td className="table-body-custom truncat-text">{item.Judul_DO}</td>
                                                <td className="table-body-custom">{item.NamaLengkap_UI}</td>
                                                <td className="table-body-custom">{item.CreatedAt.slice(0,17)}</td>
                                                <td className="table-body-custom">
                                                    <div className={`${getStatusClass(item.DocState_DR)}`}>
                                                        {item.DocState_DR}
                                                    </div>
                                                </td>
                                                <td className="table-body-custom">
                                                    {item.Pihak_DS}
                                                </td>
                                                <td className="table-body-custom">
                                                    <div   div className={`status-deactivate-news ${item.DocState_DR === "Ditinjau" ? "menunggu" : item.DocState_DR === "Ditolak" ? "dibatalkan" : "pending"}`}>
                                                        {item.DocState_DR === "Ditinjau"
                                                            ? "Menunggu"
                                                            : item.DocState_DR === "Ditolak"
                                                            ? "Dibatalkan"
                                                            : item.DocState_DR === "Selesai"
                                                            ? "Selesai"
                                                            : "Diproses"}
                                                    </div>
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
export default AcceptDisp