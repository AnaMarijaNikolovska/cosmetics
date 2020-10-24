import React, {useContext, useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import Button from "react-bootstrap/Button";
import EditUser from "../../modals/EditUser";
import {Card} from "react-bootstrap";
import NoPhoto from "../../assets/nophoto.jpg";
import {navigate} from "@reach/router";
import {authContext, decodeUsernameFromAuthentication} from "../../components/AuthContext";

export default function UserDetails(props) {
    const {auth} = useContext(authContext);
    const loggedUsername = auth ? decodeUsernameFromAuthentication(auth) : null;

    const [account, setAccount] = useState(null);
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

    useEffect(() => {
        axios.get(`/user/${props.username}`).then(r => {
            setAccount(r.data)
        })
    }, [showUpdateProfileModal])

    const handleDelete = () => {
        axios.delete(`/user/${account.username}`)
            .then(res => {
                navigate("/")
                    .then(() => window.location.reload())
            })
    }

    return (
        <div>
            {account && <Card>
                <Card.Title className={"mt-3"}>User Details</Card.Title>
                <Card.Body>
                    <div className={"row"}>
                        <div className={"col-md-5 right-border"}>
                            <Card.Img
                                src={account.picture
                                    ? ("data:image/png;base64," + account.picture)
                                    : NoPhoto}
                            >
                            </Card.Img>
                            <h2>{account.name} {account.surname}</h2>
                        </div>
                        <div className={"col-md-7 card-details"}>
                            <p>Username: <b>{account.username}</b></p>
                            <p>E-mail: <b>{account.email}</b></p>
                            <p>Phone Number: <b>{account.phoneNumber}</b></p>
                            <p>Country: <b>{account.country} </b><span
                                className={"ml-2"}> City: <b>{account.city}</b></span>
                                <span className={"ml-2"}> Zip: <b>{account.zip}</b></span></p>
                            <p>Street Name: <b>{account.streetName}</b> <span
                                className={"ml-2"}>  Street Number: <b>{account.streetNumber}</b></span></p>

                            <div className={"action-panel"}>
                                {loggedUsername && loggedUsername === account.username &&
                                <>
                                    <Button onClick={() => setShowUpdateProfileModal(true)}>Edit profile</Button>
                                    <Button variant={"danger"} className={"ml-3"} onClick={handleDelete}>
                                        Delete profile
                                    </Button>
                                </>}
                            </div>
                        </div>
                    </div>

                </Card.Body>
                {showUpdateProfileModal &&
                <EditUser username={account.username} user={account} show={showUpdateProfileModal}
                          onHide={() => setShowUpdateProfileModal(false)}/>}
            </Card>}
        </div>
    )
}