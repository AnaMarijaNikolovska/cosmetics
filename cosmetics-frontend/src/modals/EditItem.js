import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import axios from "../components/AxiosConfig";
import {navigate} from "@reach/router";
import Form from "react-bootstrap/Form";

export default function EditItem() {

    const [cosmetics, setCosmetics] = useState({
        name:"",
        description:"",
        numberOfAvailable:'',
        price:'',
        category:null ,
        picture: null

    })
    const handleChange = variableName => event =>{
        setCosmetics({...cosmetics, [variableName] :event.target.value})
    }
    const handleSubmit = event =>{
        event.preventDefault();
        axios.put("/cosmetics", cosmetics)
            .then(response => {
                navigate(`/cosmetics/${response.data.id}`)
                    .then(() => window.location.reload())
            })
    }

    return (
        <div>
            <Modal.Dialog onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={cosmetics.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter Description" value={cosmetics.description}
                                          onChange={handleChange("description")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control placeholder="Enter Category" value={cosmetics.category}
                                          onChange={handleChange("category")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Number Of Avaliable Items</Form.Label>
                            <Form.Control placeholder="Enter Number Of Available Items" value={cosmetics.numberOfAvailable}
                                          onChange={handleChange("numberOfAvailable")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control placeholder="Enter Price" value={cosmetics.price}
                                          onChange={handleChange("price")}/>
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