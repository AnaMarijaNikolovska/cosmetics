import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import axios from "../components/AxiosConfig";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function EditUser(props) {

    const [account, setAccount] = useState({
        name: props.user.name ?? "",
        surname: props.user.surname ?? "",
        username: props.user.username ?? "",
        password: props.user.password ?? "",
        email: props.user.email ?? "",
        phoneNumber: props.user.phoneNumber ?? "",
        country: props.user.country ?? "",
        city: props.user.city ?? "",
        streetName: props.user.streetName ?? "",
        streetNumber: props.user.streetNumber ?? 0,
        zip: props.user.zip ?? 0
    });

    const [accountPicture, setAccountPicture] = useState(null);

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("accountDto", new Blob([JSON.stringify({...account})], {
            type: "application/json"
        }));
        formData.append("accountPicture", accountPicture);

        axios.put(`/user/${props.username}`, formData)
            .then(response => {
                props.onHide();
            })
    }

    const handleDrop = event => {
        let file = event.target.files[0];
        setAccountPicture(file);
    }

    return (
        <div>
            <Modal {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>

                    <Modal.Body>
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={account.name}
                                          onChange={handleChange("name")}/>
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
                                <Form.Control placeholder="Enter City" value={account.city}
                                              onChange={handleChange("city")}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="number" placeholder="Enter Zip Code" value={account.zip}
                                              onChange={handleChange("zip")}/>
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
                                <Form.Control type="number" placeholder="Enter Street Number"
                                              value={account.streetNumber}
                                              onChange={handleChange("streetNumber")}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.File onChange={handleDrop}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onHide}>Close</Button>
                        <Button variant="primary" type={"submit"}>Save changes</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </div>
    )
}