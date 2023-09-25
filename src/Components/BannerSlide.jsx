// LIBRARY IMPORT
import { useState } from "react"
import Carousel from "react-bootstrap/Carousel"

// ASSETS IMPORT
import Apps1 from "../Assets/server/image/Apps1.png"
import Apps2 from "../Assets/server/image/Apps2.png"


// ====================== MAIN CODE ========================
const BannerSlide = () => {

    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="d-block image-slider" src={Apps1} alt="Aplkasi Android"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block image-slider" src={Apps2} alt="Aplikasi Website"/>
            </Carousel.Item>
        </Carousel>
    )
}

export default BannerSlide
// ====================== END CODE ========================