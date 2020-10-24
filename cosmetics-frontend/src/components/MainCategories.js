import React from "react";
import Card from "react-bootstrap/Card";
import {navigate} from "@reach/router";

export default function MainCategories() {
    return (
        <div className={"row mt-4 mb-4"}>
            <div className={"col-md-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/lips")}
                      style={{backgroundColor: "#EB72FE", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        Lips
                    </Card.Body>
                </Card>
            </div>
            <div className={"col-md-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/eyes")}
                      style={{backgroundColor: "#8DAAF9", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        Eyes
                    </Card.Body>
                </Card>
            </div>
            <div className={"col-md-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/face")}
                      style={{backgroundColor: "#FF76BC", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        Face
                    </Card.Body>
                </Card>
            </div>
            <div className={"col-md-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/haircare")}
                      style={{backgroundColor: "#FFBA76", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        HairCare
                    </Card.Body>
                </Card>
            </div>

            <div className={"col-md-3 mt-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/skincare")}
                      style={{backgroundColor: "#FEF853", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        SkinCare
                    </Card.Body>
                </Card>
            </div>

            <div className={"col-md-3 mt-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/forhim")}
                      style={{backgroundColor: "#B072FE", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        ForHim
                    </Card.Body>
                </Card>
            </div>

            <div className={"col-md-3 mt-3"}>
                <Card className={"card-rounded"}
                      onClick={()=> navigate("/main-category/other")}
                      style={{backgroundColor: "#AEFF6A", color: "white", fontWeight: "bolder"}}>
                    <Card.Body>
                        Other
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}