// LIBRARY IMPORT
import { Container, Row, Tabs, Tab } from "react-bootstrap";

// ASSETS IMPORT
import { FaCheckDouble, FaHistory, FaListUl } from "react-icons/fa";

// COMPONENTS IMPORT
import BannerItems from "../../Functions/News/BannerItems";

import ManageItems from "../../Functions/News/ManageItems";

import HistoryItems from "../../Functions/News/HistoryItems";

// ====================== MAIN CODE ========================
const NewsOptions = () => {
  // ====================== HTML CODE ========================

  return (
    <>
      <Container fluid className="mt-3 mr-5 pr-2">
        <Row className="box-wrap-line2">
          <h4 className="text-dashboard ps-0">Manajemen Berita</h4>
          <p className="text-dashboard-black">Pusat Manajemen Berita Desa</p>
        </Row>

        <Row className="box-wrap2">
          <Tabs
            defaultActiveKey="Manage"
            id="fill-tab-example"
            className="mb-2"
            fill
            transition={true}
          >
            <Tab
              eventKey="Manage"
              title={
                <span className="tab-title">
                  <FaListUl className="tab-icon" /> All News
                </span>
              }
            >
              <ManageItems />
            </Tab>
            <Tab
              eventKey="Banner"
              title={
                <span className="tab-title">
                  <FaCheckDouble className="tab-icon" /> Active
                </span>
              }
            >
              <BannerItems />
            </Tab>
            <Tab
              eventKey="History"
              title={
                <span className="tab-title">
                  <FaHistory className="tab-icon" /> History
                </span>
              }
            >
              <HistoryItems />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  );
  // ====================== EMD HTML CODE ========================
};
export default NewsOptions;
// ====================== END CODE ========================
