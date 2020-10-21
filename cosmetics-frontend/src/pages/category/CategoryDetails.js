import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import {Button} from "react-bootstrap";

export default function CategoryDetails(props) {
    console.log(props)
    const [category, setCategory] = useState(null)
    useEffect(() => {
        axios.get(`/category/${props.categoryId}`)
            .then(response => setCategory(response.data))
    }, [])
    return (
        <div>
            {category != null && <div>
                <p>{category.name}</p>
                <p>{category.description}</p>
            </div>}
            <Button> Edit Category
            </Button>
        </div>
    )
}