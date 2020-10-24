import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import axios from "../components/AxiosConfig";
import Form from "react-bootstrap/Form";

export default function EditItem(props) {

    console.log(props.cosmetic);
    const [cosmetics, setCosmetics] = useState({
        name: props.cosmetic.name ?? "",
        description: props.cosmetic.description ?? "",
        price: props.cosmetic.price ?? 0,
        categoryId: props.cosmetic.category.id ?? 0,
        seller: props.cosmetic.seller.username
    })
    const [cosmeticPicture, setCosmeticPicture] = useState(null);

    const handleChange = variableName => event => {
        setCosmetics({...cosmetics, [variableName]: event.target.value})
    }

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get("category")
            .then(res => {
                setCategories(res.data);
            })
    }, [])

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("cosmeticDto", new Blob([JSON.stringify({...cosmetics})], {
            type: "application/json"
        }));
        formData.append("cosmeticPicture", cosmeticPicture);

        axios.put(`/cosmetics/${props.cosmeticid}`, formData)
            .then(() => {
                props.onHide();
            })
    }

    const handleDrop = event => {
        let file = event.target.files[0];
        setCosmeticPicture(file);
    }

    return (
        <div>
            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" value={cosmetics.name}
                                          onChange={handleChange("name")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={6} placeholder="Enter Description"
                                          value={cosmetics.description}
                                          onChange={handleChange("description")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={cosmetics.categoryId}
                                          onChange={handleChange("categoryId")}>
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
                            <Form.Control placeholder="Enter Price" value={cosmetics.price} type={"number"}
                                          onChange={handleChange("price")}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Picture</Form.Label>
                            <Form.File onChange={handleDrop}/>
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => props.onHide}>Close</Button>
                        <Button variant="primary" type={"submit"}>Save changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}