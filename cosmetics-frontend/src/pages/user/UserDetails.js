import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";

export default function UserDetails() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get("/user/1").then(r => {
            setUser(r.data)
        })
    },[])

    return (
        <div>
            {user && <div>
                {user.name}
                {user.surname}
            </div>}
        </div>
    )
}