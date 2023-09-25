// LIBRARY IMPORT
import { Row, Col, Dropdown } from "react-bootstrap";

import { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { FaCircle } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

// ASSETS IMPORT
import ImageComponent from "../../Components/ImageComponent";


// ====================== MAIN CODE ========================
const BannerItems = () => {
  // VARIABLE DEFINITION
  // Container untuk menampung data berita dengan banner
  const [dataBeritaBanner, setDataBeritaBanner] = useState([]);

  // Container untuk menampung data berita non banner
  const [dataBeritaNonBanner, setDataBeritaNonBanner] = useState([]);

  const [statusToast,setStatusToast] = useState(false)

  // FETCH DEFINTION
  // Fetch Data Berita Banner
  const fetchDataBeritaBanner = useCallback(() => {
    axios
      .get("https://cybersmartserver.as.r.appspot.com/GetBeritaBanner")
      .then((response) => {
        setDataBeritaBanner(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Fetch Data Berita Non Banner
  const fetchDataBeritaNonBanner = useCallback(() => {
    axios
      .get("https://cybersmartserver.as.r.appspot.com/GetBeritaNonBanner")
      .then((response) => {
        setDataBeritaNonBanner(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // PENANGANAN AUTO LOADING DATA
  useEffect(() => {
    fetchDataBeritaBanner();
    fetchDataBeritaNonBanner();

    // AUTO REFRESH
    const interval = setInterval(() => {
      fetchDataBeritaBanner();
      fetchDataBeritaNonBanner();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchDataBeritaBanner, fetchDataBeritaNonBanner]);

  // FUNCTION DEFINITION
  // Mengaktifkan status banner
  const handleActivate = (UUID_BE) => {
    // Mendapatkan UUID_AD dari localStorage
    const UUID_AD = localStorage.getItem("UUID_AD");

    // Membuat objek data yang akan dikirim dalam body request
    const formData = new FormData();

    formData.append("UUID_BE", UUID_BE);
    formData.append("UUID_AD", UUID_AD);

    // Mengirim data ke API menggunakan axios
    axios
      .post(
        "https://cybersmartserver.as.r.appspot.com/ActivateBanner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      .then((response) => {
        // Data Response
        const message = response.data.message;
        setStatusToast(true)
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // Menonaktifkan status banner
  const handleDeactivate = (UUID_BE) => {
    // Mendapatkan UUID_AD dari localStorage
    const UUID_AD = localStorage.getItem("UUID_AD");

    // Membuat objek data yang akan dikirim dalam body request
    const formData = new FormData();

    formData.append("UUID_BE", UUID_BE);
    formData.append("UUID_AD", UUID_AD);

    // Mengirim data ke API menggunakan axios
    axios
      .post(
        "https://cybersmartserver.as.r.appspot.com/DeactivateBanner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      .then((response) => {
        // Data Response
        const message = response.data.message;
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        })
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // ====================== HTML CODE ========================

  return (
    <>
      {statusToast && (
        <ToastContainer theme="light" style={{ width: '500px' }} limit={1} autoClose={2000}/>
      )}
      <Row>
        <Col xs lg="6">
          {dataBeritaNonBanner.map((item) => (
            <Row key={item.UUID_BE} className="box-news">
              <div className="box-news-image">
                <ImageComponent fileId={item.Gambar_BE} />
              </div>
              <div className="box-news-text">
                <Row>
                  <Col xs lg="6">
                    <p className="text-dashboard-clean">{item.Kategori_BE}</p>
                  </Col>
                  <Col xs lg="6" className="text-end">
                    <p className="text-dashboard-clean">{item.CreatedAt}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg="6">
                    <h6>
                      <strong className="text-dashboard-bold">
                        {item.Judul_BE}
                      </strong>
                    </h6>
                  </Col>
                  <Col xs lg="6" className="text-end">
                    <p className="text-dashboard-clean">{item.Penerbit_BE}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg="6">
                    <div className="text-start">
                      <p className="status-inactive">
                        {" "}
                        <span>
                          <FaCircle className="icon-status-inactive" />
                        </span>
                        Nonaktif
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 4, offset: 2 }}
                    className="d-flex justify-content-end"
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        className="custom-toggle"
                        id="dropdown-basic"
                        size="sm"
                      >
                        Ubah
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="custom-menu">
                        <Dropdown.Item
                          className="text-menu-dropdown"
                          onClick={() => handleActivate(item.UUID_BE)}
                        >
                          {" "}
                          Aktifkan
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </div>
            </Row>
          ))}
        </Col>
        <Col xs lg="6">
          {dataBeritaBanner.map((item) => (
            <Row key={item.UUID_BE} className="box-news">
              <div className="box-news-image">
                <ImageComponent fileId={item.Gambar_BE} />
              </div>
              <div className="box-news-text">
                <Row>
                  <Col xs lg="6">
                    <p className="text-dashboard-clean">{item.Kategori_BE}</p>
                  </Col>
                  <Col xs lg="6" className="text-end">
                    <p className="text-dashboard-clean">{item.CreatedAt}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg="6">
                    <h6>
                      <strong className="text-dashboard-bold">
                        {item.Judul_BE}
                      </strong>
                    </h6>
                  </Col>
                  <Col xs lg="6" className="text-end">
                    <p className="text-dashboard-clean">{item.Penerbit_BE}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs lg="6">
                    <div className="text-start">
                      <p className="status-active">
                        {" "}
                        <span>
                          <FaCircle className="icon-status-active" />
                        </span>
                        Aktif
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 4, offset: 2 }}
                    className="d-flex justify-content-end"
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        className="custom-toggle"
                        id="dropdown-basic"
                        size="sm"
                      >
                        Ubah
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="custom-menu">
                        <Dropdown.Item
                          className="text-menu-dropdown"
                          onClick={() => handleDeactivate(item.UUID_BE)}
                        >
                          {" "}
                          Nonaktifkan
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </div>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
  // ====================== EMD HTML CODE ========================
};
export default BannerItems;
// ====================== END CODE ========================
