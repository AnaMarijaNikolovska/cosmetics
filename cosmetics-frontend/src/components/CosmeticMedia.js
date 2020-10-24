import Media from "react-bootstrap/Media";
import React from "react";
import NoPhoto from "../assets/nophoto.jpg";
import Button from "react-bootstrap/Button";
import axios from "./AxiosConfig";

export default function CosmeticMedia(props) {

    const handleDelete = cosmeticId => event => {
        axios.put(`user/${props.username}/shopping-cart`, null, {
            params: {
                cosmeticId: cosmeticId
            }
        })
            .then(() => {
                props.setHasDeletedCosmetic();
            })
    }

    return (
        <Media className={"media-border mb-2"}>
            <img
                width={100}
                height={120}
                className="align-self-start mr-3"
                src={props.picture
                    ? ("data:image/png;base64," + props.picture)
                    : NoPhoto}
                alt="Generic placeholder"
            />
            <Media.Body className={"card-details"} style={{position: "relative"}}>
                <h5>{props.title}</h5>
                <p>
                    {props.description}
                </p>
                <p>
                    {props.price} EUR
                </p>
                <div className={"end-of-parent"}>
                    <Button variant={"danger"} onClick={handleDelete(props.id)}>
                        X
                    </Button>
                </div>
            </Media.Body>
        </Media>
    )
}