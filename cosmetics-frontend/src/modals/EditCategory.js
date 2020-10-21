import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../components/AxiosConfig";
import {navigate} from "@reach/router";

export default function EditCategory(props) {

    const [category, setCategory] = useState({
        name: "",
        description: ""
    })
    const handleChange = variableName => event => {
        setCategory({...category, [variableName]: event.target.value})
    }
    const handleSubmit = event => {
        event.preventDefault();
        axios.put("/category/1", category)
            .then(response => {
                navigate(`/category/${response.data.id}`)
                    .then(() => window.location.reload())
            })
    }
    return (
        <div>
            <Modal.Dialog >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={category.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter Description" value={category.description}
                                          onChange={handleChange("description")}/>
                        </Form.Group>
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