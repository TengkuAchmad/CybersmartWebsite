// LIBRARY IMPORT

// COMPONENTS IMPORT
import DashboardOptions from "../Components/Home/DashboardOptions"

import NewsOps from "../Components/Home/NewsOptions"

import QuoteOps from "../Components/Home/QuoteOptions"

import ProductOps from "../Components/Products/ProductOptions"

import ServicesOptions from "../Components/Products/ServiceOptions"

import DocServices from "../Components/Service/Docservices"

import MonitoringServices from "../Components/Service/MonitoringServices"

import Disposisi from "../Components/Service/Disposisi"

import AspirationOptions from "../Components/Aspiration/AspirationOptions"

import VerifikasiDisposisi from "../Components/Service/VerifikasiDisposisi"

// ====================== MAIN CODE ========================
const OptionsHandle = ({ opt }) => {
    let componentToRender
    if (opt === "beritaops"){
        componentToRender = <NewsOps />
    } else if (opt === "profileops"){
        componentToRender = <QuoteOps />
    } else if (opt === "aspirasiops"){
        componentToRender = <NewsOps />
    } else if (opt === "produkops"){
        componentToRender = <ProductOps />
    } else if (opt === "serviceops"){
        componentToRender = <ServicesOptions />
    } 
    else if (opt === "layananops"){
        componentToRender = <NewsOps />
    } else if (opt === "jajaranops"){
        componentToRender = <NewsOps />
    } else if (opt === "docservices"){
        componentToRender = <DocServices />
    } else if (opt === "monitoringservices"){
        componentToRender = <MonitoringServices />
    } else if (opt === "disposisi"){
        componentToRender = <Disposisi />
    } else if (opt === "disposisiverif"){
        componentToRender = <VerifikasiDisposisi />
    } else if (opt === "aspirationops"){
        componentToRender = <AspirationOptions />
    } else  { 
        componentToRender = <DashboardOptions />
    }

    // ====================== HTML CODE ========================
    return (
        <>
            { componentToRender }
        </>
    )
    // ====================== END HTML CODE ========================
}
export default OptionsHandle
// ====================== END CODE ========================
