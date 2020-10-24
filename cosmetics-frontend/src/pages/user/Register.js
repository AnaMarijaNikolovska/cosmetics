import React, {useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "../../components/AxiosConfig";
import {authContext} from "../../components/AuthContext";
import {navigate} from "@reach/router";
import {useToasts} from "react-toast-notifications";
import {Jumbotron} from "react-bootstrap";

export default function Register() {
    const {setAuthData} = useContext(authContext);
    const {addToast} = useToasts();
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
    });

    const [accountPicture, setAccountPicture] = useState(null);

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleDrop = event => {
        let file = event.target.files[0];
        setAccountPicture(file);
    }

    const BasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("accountDto", new Blob([JSON.stringify({...account})], {
            type: "application/json"
        }));
        formData.append("accountPicture", accountPicture);
        axios.post("user", formData)
            .then(res => {
                setAuthData(BasicAuthToken(res.data.username, res.data.password));
                navigate(`/user/${res.data.username}`).then(() =>
                    addToast("Account created", {appearance: "success", autoDismiss: true})
                );
            })
    }

    return (
        <Jumbotron>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={account.email}
                                      onChange={handleChange("email")}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={account.password}
                                      onChange={handleChange("password")}/>
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
                        <Form.Control type="number" placeholder="Enter Street Number" value={account.streetNumber}
                                      onChange={handleChange("streetNumber")}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Picture</Form.Label>
                    <Form.File onChange={handleDrop}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Jumbotron>
    )
}