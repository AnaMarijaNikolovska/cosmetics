import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import LogIn from "./pages/user/LogIn";
import {Router} from "@reach/router";
import Register from "./pages/user/Register";
import UserDetails from "./pages/user/UserDetails";
import CategoryDetails from "./pages/category/CategoryDetails";
import AddCategory from "./pages/category/AddCategory";
import AddItems from "./pages/items/AddItems";
import ItemDetails from "./pages/items/ItemDetails";
import Home from "./components/Home";
import {authContext, decodeUsernameFromAuthentication} from "./components/AuthContext";
import axios from "./components/AxiosConfig";
import ProtectedRoute from "./components/ProtectedRoute";
import MainCategoryDetails from "./pages/category/MainCategoryDetails";
import ShoppingCart from "./pages/user/ShoppingCart";

function App() {
    const [loggedUser, setLoggedUser] = useState(null);
    const {auth} = useContext(authContext);

    useEffect(() => {
        if (auth) {
            const username = decodeUsernameFromAuthentication(auth);
            axios.get(`user/${username}`)
                .then(res => {
                    setLoggedUser(res.data)
                })
        }
    }, [auth])

    return (
        <div className="App">
            <Header loggedUser={loggedUser}/>
            <div className={"container mt-4"}>
                <Router>
                    <LogIn path={"/login"}/>
                    <Register path={"/register"}/>
                    <UserDetails path={"user/:username"}/>
                    <CategoryDetails loggedUser={loggedUser} path={"/category/:categoryId"}/>
                    <MainCategoryDetails path={"/main-category/:mainCategory"}/>
                    <ProtectedRoute component={AddCategory} path={"/category/add"}/>
                    <ProtectedRoute component={AddItems} path={"/cosmetics/add"}/>
                    <ProtectedRoute component={ShoppingCart} loggedUser={loggedUser} path={"/shopping-cart"}/>
                    <ItemDetails path={"/cosmetics/:cosmeticId"} loggedUser={loggedUser}/>
                    <Home path={"/"}/>
                </Router>
            </div>
        </div>
    );
}


export default App;
