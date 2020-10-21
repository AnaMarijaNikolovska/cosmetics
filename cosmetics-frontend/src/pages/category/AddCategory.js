import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {navigate} from "@reach/router";

export default function AddCategory(){
    const [category, setCategory] = useState({
        name:"",
        description:""
    })
    const handleChange = variableName => event =>{
        setCategory({...category, [variableName] :event.target.value})
    }
    const handleSubmit = event =>{
        event.preventDefault();
        axios.post("/category", category)
            .then(response => {
                navigate(`/category/${response.data.id}`)
                    .then(() => window.location.reload())
            })
    }
    return(
        <div>
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}