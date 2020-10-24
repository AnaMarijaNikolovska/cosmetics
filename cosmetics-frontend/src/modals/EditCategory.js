import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../components/AxiosConfig";
import {useToasts} from "react-toast-notifications";

export default function EditCategory(props) {
    const {addToast} = useToasts();
    const mainCategories = ["LIPS", "EYES", "FACE", "HAIRCARE", "SKINCARE", "FORHIM", "OTHER"]
    const [category, setCategory] = useState({
        name: props.category.name,
        description: props.category.description,
        mainCategory: props.category.mainCategory
    })
    const handleChange = variableName => event => {
        setCategory({...category, [variableName]: event.target.value})
    }
    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`/category/${props.category.id}`, category)
            .then(() => {
                props.setShow(false);
                addToast("Category updated successfully", {
                    appearance: "success",
                })
            })
    }

    return (
        <Modal size="lg"
               show={props.show}
               onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" value={category.name}
                                      onChange={handleChange("name")}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={6} placeholder="Enter Description" value={category.description}
                                      onChange={handleChange("description")}/>
                    </Form.Group>
                    <Form.Control as="select" value={category.mainCategory} onChange={handleChange("mainCategory")}>
                        <option value={""}>---</option>
                        {mainCategories.map(mainCategory =>
                            <option key={mainCategory}
                                    value={mainCategory}>{mainCategory}
                            </option>
                        )}
                    </Form.Control>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>Close</Button>
                    <Button variant="primary" type={"submit"}>Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}