import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";

export default function ItemDetails(props){

    console.log(props)
    const [cosmetics, setCosmetics] = useState(null)
    useEffect(() => {
        axios.get(`/cosmetics/${props.cosmeticsId}`)
            .then(response => setCosmetics(response.data))
    }, [])

    return(
        <div>
            {cosmetics != null && <div>
                <p>{cosmetics.name}</p>
                <p>{cosmetics.description}</p>
                <p>{cosmetics.price}</p>
                <p>{cosmetics.numberOfAvailable}</p>
                <p>{cosmetics.picture}</p>
                <p>{cosmetics.category}</p>
            </div>}
        </div>
    )
}