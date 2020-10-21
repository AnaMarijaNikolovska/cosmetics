import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import axios from "../components/AxiosConfig";
import {navigate} from "@reach/router";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function EditUser() {

    const [account, setAccount] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        streetName: "",
        streetNumber: "",
        zip: ""
    })

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put("/user/1", account)
            .then(response => {
                navigate(`/account/${response.data.id}`)
                    .then(() => window.location.reload())
            })
    }

    return (
        <div>
            <Modal.Dialog onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={account.email}
                                              onChange={handleChange("email")}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={account.username}
                                              onChange={handleChange("username")}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter Username" value={account.username}
                                          onChange={handleChange("username")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={account.name} onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control placeholder="Enter Surname" value={account.surname}
                                          onChange={handleChange("surname")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control placeholder="Please enter your phone number" value={account.phoneNumber}
                                          onChange={handleChange("phoneNumber")}/>
                        </Form.Group>

                        <Form.Row>

                            <Form.Group as={Col}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control placeholder="Enter Country" value={account.country}
                                              onChange={handleChange("country")}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder="Enter City" value={account.city} onChange={handleChange("city")}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Zip</Form.Label>
                                <Form.Control placeholder="Enter Zip Code" value={account.zip} onChange={handleChange("zip")}/>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col}>
                                <Form.Label>Street Name</Form.Label>
                                <Form.Control placeholder="Enter Street Name" value={account.streetName}
                                              onChange={handleChange("streetName")}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Street Number</Form.Label>
                                <Form.Control placeholder="Enter Street Number" value={account.streetName}
                                              onChange={handleChange("streetNumber")}/>
                            </Form.Group>

                        </Form.Row>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}