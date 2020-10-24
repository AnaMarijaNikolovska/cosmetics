import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image1 from "../assets/190827-beauty-best-hair-products-1566922412.png"
import Image2 from "../assets/The-Ultimate-Makeup-Bag-Packing-Guide.jpg"
import Image3 from "../assets/holidaypartymakeup-1572370992.jpg"
import MainCategories from "./MainCategories";

export default function Home() {
    return (
        <div>
            <Carousel>

                <Carousel.Item>
                    <img src={Image1} alt={"image"}/>

                </Carousel.Item>

                <Carousel.Item>
                    <img src={Image2} alt={"image"}/>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={Image3} alt={"image"}/>
                </Carousel.Item>
            </Carousel>
            <MainCategories/>
        </div>
    )
}