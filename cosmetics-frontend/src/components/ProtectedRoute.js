import React, {useContext} from "react";
import {authContext} from "./AuthContext";
import {Redirect} from "@reach/router";

const ProtectedRoute = ({component: Component, ...props}) => {
    const {auth} = useContext(authContext)
    return (
        <div>
            {auth ? <Component {...props}/> : <Redirect to={"/login"} noThrow/>}
        </div>
    )
}

export default ProtectedRoute