import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import CosmeticCard from "../../components/CosmeticCard";
import Eyes from "../../assets/eyes1.jpg";
import ForHim from "../../assets/forhim.jpg";
import SkinCare from "../../assets/skin.png";
import Lips from "../../assets/lips.jpg";
import Face from "../../assets/facemakeup.png";
import HairCare from "../../assets/hair.jpg";
import Other from "../../assets/other.png";
import {Button} from "react-bootstrap";
import {navigate} from "@reach/router";


export default function MainCategoryDetails(props) {
    const [mainCategoryCosmetics, setMainCategoryCosmetics] = useState(null);
    useEffect(() => {
        axios.get(`/cosmetics/main-category/${props.mainCategory}`)
            .then(res => {
                setMainCategoryCosmetics(res.data);
            })
    }, [])

    return (
        <div style={{position: "relative"}}>
            <h2>{props.mainCategory.toUpperCase()}</h2>
            <div className={"category-picture"}
                 style={{
                     backgroundImage: `url(${props.mainCategory === "eyes" ? Eyes
                         : props.mainCategory === "lips" ? Lips
                             : props.mainCategory === "face" ? Face
                                 : props.mainCategory === "haircare" ? HairCare
                                     : props.mainCategory === "skincare" ? SkinCare
                                         : props.mainCategory === "forhim" ? ForHim
                                             : Other})`
                 }}>
            </div>
            <h3 className={"mt-2 mb-2"}>Cosmetics in this category</h3>
            <hr style={{width: "80%"}}/>
            <div className={"row"}>
                {mainCategoryCosmetics && mainCategoryCosmetics.length > 0
                && mainCategoryCosmetics.map(cosmetic =>
                    <div key={cosmetic.id} className="col-md-4">
                        <CosmeticCard cosmeticId={cosmetic.id} picture={cosmetic.picture} name={cosmetic.name}
                                      description={cosmetic.description}/>
                    </div>)}
            </div>
            <div className={"text-right"}>
                <Button variant={"success"} onClick={() => navigate("/cosmetics/add")}> Add Cosmetic </Button>
            </div>
        </div>
    )
}