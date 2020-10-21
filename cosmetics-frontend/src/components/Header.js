import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "./AxiosConfig";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "@reach/router";


export default function Header() {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        axios.get("/category")
            .then(response => {
                setCategories(response.data)
            })
    }, [])
    return (
        <div>
            <Navbar
                style={{background: "linear-gradient(90deg, rgba(51, 255, 192, 1) 0%, rgba(51, 255, 250, 1) 50%, rgba(107, 255, 200, 1) 100%"}}>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        {categories != null && categories.length > 0 && categories.map(category =>
                            <NavDropdown.Item key={category.id}> {category.name} </NavDropdown.Item>)}
                        <NavDropdown.Divider/>
                        <Link to={"/category/add"}> Add Category</Link>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    )
}