import React, {useContext, useEffect, useState} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import axios from "./AxiosConfig";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, navigate} from "@reach/router";
import {Button} from "react-bootstrap";
import {authContext} from "./AuthContext";


export default function Header(props) {
    const [categories, setCategories] = useState(null);
    const {setAuthData} = useContext(authContext);

    useEffect(() => {
        axios.get("/category")
            .then(response => {
                setCategories(response.data)
            })
    }, [])

    const logout = () => {
        setAuthData(null);
        navigate("/").then(() => window.location.reload())
    }


    return (
        <div>
            <Navbar
                style={{background: "linear-gradient(90deg, rgba(51, 255, 192, 1) 0%, rgba(51, 255, 250, 1) 50%, rgba(107, 255, 200, 1) 100%"}}>
                <Link to={"/"} className={"navbar-brand"}>Glowy Angels</Link>
                <Nav className="mr-auto">
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        {categories != null && categories.length > 0 && categories.map(category =>
                            <Link key={category.id} className={"dropdown-item"}
                                  to={`/category/${category.id}`}>{category.name} </Link>
                        )}
                        <NavDropdown.Divider/>
                        <Link to={"/category/add"} className={"dropdown-item"}> Add Category</Link>
                    </NavDropdown>
                </Nav>
                <Nav>
                    {props.loggedUser
                        ? <>
                            <NavDropdown alignRight title={props.loggedUser && props.loggedUser.username?.toUpperCase()}
                                         id="collasible-nav-dropdown">
                                <Link to={`/user/${props.loggedUser.username}`} className={"nav-link"}>Profile</Link>
                                <Link to={`/shopping-cart`} className={"nav-link"}>Shopping
                                    Cart
                                </Link>
                            </NavDropdown>
                            <Button variant={"link"} onClick={logout} className={"nav-link"}>
                                LOGOUT
                            </Button>
                        </>
                        : <>
                            <Link to={"/login"} className={"nav-link"}>Login</Link>
                            <Link to={"/register"} className={"nav-link"}>Register</Link>
                        </>}
                </Nav>
            </Navbar>
        </div>
    )
}