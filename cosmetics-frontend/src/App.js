import React from 'react';
import logo from './logo.svg';
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
import EditCategory from "./modals/EditCategory";
import EditItem from "./modals/EditItem";
import EditUser from "./modals/EditUser";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Header/>
            <Router>
                <LogIn path={"/login"}/>
                <Register path={"/register"}/>
                <UserDetails path={"user/:userId"}/>
                <CategoryDetails path={"/category/:categoryId"}/>
                <AddCategory path={"/category/add"}/>
                <AddItems path={"/cosmetics/add"}/>
                <ItemDetails path={"/cosmetics/:cosmeticsId"}/>
                <Home path={"/"}/>
            </Router>
        </div>
    );
}


export default App;
