import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../components/AxiosConfig";
import {navigate} from "@reach/router";
import {useToasts} from "react-toast-notifications";
import {authContext} from "../../components/AuthContext";
import {Jumbotron} from "react-bootstrap";

export default function LogIn() {
    const {addToast} = useToasts();
    const {setAuthData} = useContext(authContext)
    const [account, setAccount] = useState({
        username: "",
        password: ""
    })

    const BasicAuthToken = (username, password) => {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    const handleChange = name => event => {
        setAccount({...account, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post("user/login", account)
            .then(res => {
                setAuthData(BasicAuthToken(res.data.username, res.data.password));
                navigate("/")
                    .then(() => {
                        addToast(`Welcome back ${res.data.username}`, {
                            appearance: "success",
                            autoDismiss: true,
                            placement: "bottom-right"
                        })
                    })
            })
    }

    return (
        <Jumbotron>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" value={account.username}
                                  onChange={handleChange("username")}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={account.password}
                                  onChange={handleChange("password")}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Jumbotron>
    )
}