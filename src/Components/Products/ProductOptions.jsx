// LIBRARY IMPORT
import { Container, Row, Tabs, Tab, } from "react-bootstrap"

// ASSETS IMPORT
import { FaHistory, FaListUl, FaRegHourglass } from "react-icons/fa"

// COMPONENTS IMPORT

import ManageItems from "../../Functions/Product/ManageItems"

import RequestItems from "../../Functions/Product/RequestItems"

import HistoryItems from "../../Functions/Product/HistoryItems"
// ====================== MAIN CODE ========================
const ProductOptions = () => {
    // ====================== HTML CODE ========================

    return (
        <>
            <Container fluid className="mt-3 mr-5 pr-2">
                <Row className="box-wrap-line2">
                    <h4 className="text-dashboard ps-0">Manajemen Produk</h4>
                    <p className="text-dashboard-black">
                        Pusat Manajemen Etalase Produk Digital
                    </p>
                </Row>

                <Row className="box-wrap2">
                    <Tabs defaultActiveKey="Manage" id="fill-tab-example" className="mb-2" fill transition={true}>
                        <Tab eventKey="Manage" title={<span className="tab-title"><FaListUl className="tab-icon" /> All Product</span>}>
                            <ManageItems />
                        </Tab>
                        <Tab eventKey="Banner" title={<span className="tab-title"><FaRegHourglass className="tab-icon" /> Request</span>}>
                            <RequestItems />
                        </Tab>
                        <Tab eventKey="History" title={<span className="tab-title"><FaHistory className="tab-icon" /> History</span>}>
                            <HistoryItems />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </> 
    )
    // ====================== EMD HTML CODE ========================
}
export default ProductOptions
// ====================== END CODE ========================