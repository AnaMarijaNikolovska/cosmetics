import React, {useContext, useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import {navigate} from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {authContext, decodeUsernameFromAuthentication} from "../../components/AuthContext";

export default function AddItems() {
    const {auth} = useContext(authContext);
    const [cosmetics, setCosmetics] = useState({
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
        seller: decodeUsernameFromAuthentication(auth)
    });

    const [cosmeticPicture, setCosmeticPicture] = useState(null);

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get("category")
            .then(res => {
                setCategories(res.data);
            })
    }, [])

    const handleDrop = event => {
        let file = event.target.files[0];
        setCosmeticPicture(file);
    }

    const handleChange = variableName => event => {
        setCosmetics({...cosmetics, [variableName]: event.target.value})
    }
    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("cosmeticDto", new Blob([JSON.stringify({...cosmetics})], {
            type: "application/json"
        }));
        formData.append("cosmeticPicture", cosmeticPicture);

        axios.post("/cosmetics", formData)
            .then(response => {
                navigate(`/cosmetics/${response.data.id}`)
                    .then(() => window.location.reload())
            })
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Enter Name" value={cosmetics.name}
                                  onChange={handleChange("name")}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder="Enter Description" value={cosmetics.description}
                                  onChange={handleChange("description")}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={cosmetics.categoryId} onChange={handleChange("categoryId")}>
                        <option value={0}>---</option>
                        {categories && categories.length > 0 && categories.map(category =>
                            <option key={category.id}
                                    value={category.id}>{category.name}
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type={"number"} placeholder="Enter Price" value={cosmetics.price}
                                  onChange={handleChange("price")}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Picture</Form.Label>
                    <Form.File onChange={handleDrop}/>
                </Form.Group>

                <Button variant="primary" type="submit" className={"mt-3"}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}