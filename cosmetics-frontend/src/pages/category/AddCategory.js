import React, {useState} from "react";
import axios from "../../components/AxiosConfig"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";
import {useToasts} from "react-toast-notifications";

export default function AddCategory() {
    const {addToast} = useToasts();
    const mainCategories = ["LIPS", "EYES", "FACE", "HAIRCARE", "SKINCARE", "FORHIM", "OTHER"]
    const [category, setCategory] = useState({
        name: "",
        description: "",
        mainCategory: "",
    })
    const handleChange = variableName => event => {
        setCategory({...category, [variableName]: event.target.value})
        console.log(category);
    }
    const handleSubmit = event => {
        event.preventDefault();
        console.log(category);
        axios.post("/category", category)
            .then(response => {
                navigate(`/category/${response.data.id}`)
                    .then(() => window.location.reload())
                addToast("Category successfully created", {appearance: "success"})
            })
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
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

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Main Category</Form.Label>
                    <Form.Control as="select" onChange={handleChange("mainCategory")}>
                        <option value={""}>---</option>
                        {mainCategories.map(mainCategory =>
                            <option key={mainCategory}
                                    value={mainCategory}>{mainCategory}
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}