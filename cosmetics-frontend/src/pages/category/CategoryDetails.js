import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import {Button} from "react-bootstrap";
import EditCategory from "../../modals/EditCategory";
import {navigate} from "@reach/router";
import Card from "react-bootstrap/Card";
import CosmeticCard from "../../components/CosmeticCard";

export default function CategoryDetails(props) {
    const [category, setCategory] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [categoryCosmetics, setCategoryCosmetics] = useState(null);

    useEffect(() => {
        axios.get(`/category/${props.categoryId}`)
            .then(response => setCategory(response.data))

        axios.get(`/cosmetics/category/${props.categoryId}`)
            .then(res => {
                setCategoryCosmetics(res.data);
            })
    }, [showEditModal, props.categoryId])


    return (
        <div>
            {category != null && <Card>
                <Card.Title className={"mt-3"}><h2>Category Details</h2></Card.Title>
                <Card.Body>
                    <div className={"card-details"}>
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>

                    <div className={"row"}>
                        <hr style={{width: "80%"}}/>
                        {categoryCosmetics && categoryCosmetics.length > 0
                        && categoryCosmetics.map(cosmetic =>
                            <div key={cosmetic.id} className="col-md-4">
                                <CosmeticCard cosmeticId={cosmetic.id} picture={cosmetic.picture}
                                              name={cosmetic.name}
                                              description={cosmetic.description}/>
                            </div>)}
                    </div>

                    {props.loggedUser &&
                    <>
                        <Button className={"mr-3"} onClick={() => setShowEditModal(true)}> Edit Category </Button>
                        <Button variant={"success"} onClick={() => navigate("/cosmetics/add")}> Add Cosmetic </Button>
                    </>
                    }
                    {showEditModal === true &&
                    <EditCategory show={showEditModal} setShow={setShowEditModal} category={category}/>}
                </Card.Body>
            </Card>
            }
        </div>
    )
}