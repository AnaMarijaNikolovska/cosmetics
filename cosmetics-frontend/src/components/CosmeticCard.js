import React from "react";
import {Link, navigate} from "@reach/router";
import Card from "react-bootstrap/Card";
import NoPhoto from "../assets/nophoto.jpg"

export default function CosmeticCard(props) {

    return (
        <div className="image-flip">
            <div className="mainflip flip-0">
                <div className="frontside">
                    <Card style={{minHeight: '260px', minWidth: "300px"}}>
                        <Card.Body className="flex-center-column text-center">
                            <Card.Img
                                width={320}
                                src={props.picture
                                    ? ("data:image/png;base64," + props.picture)
                                    : NoPhoto}
                                alt="card image"/>
                            <Card.Title className={"mt-4"}>{props.name}</Card.Title>
                            <Card.Text>{props.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="backside">
                    <Card style={{minHeight: '260px', minWidth: "350px"}}>
                        <Card.Body className="text-center position-relative">
                            <Card.Text className={"center-of-parent"}>Get more details <Link
                                to={`/cosmetics/${props.cosmeticId}`}>here </Link></Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}