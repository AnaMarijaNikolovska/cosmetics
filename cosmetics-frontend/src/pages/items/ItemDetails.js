import React, {useContext, useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import Card from "react-bootstrap/Card";
import NoPhoto from "../../assets/nophoto.jpg";
import Button from "react-bootstrap/Button";
import EditItem from "../../modals/EditItem";
import {authContext, decodeUsernameFromAuthentication} from "../../components/AuthContext";
import StripeCheckout from 'react-stripe-checkout';
import {useToasts} from "react-toast-notifications";

export default function ItemDetails(props) {
    const {addToast} = useToasts();
    const {auth} = useContext(authContext);
    const loggedUsername = auth ? decodeUsernameFromAuthentication(auth) : null;

    let paymentRequest = {
        description: "",
        stripeEmail: "",
        stripeToken: "",
        username: "",
        amount: 0,
        isFromCart: false
    }

    const stripeToken = "pk_test_51Hep7GAcXXjP3fOBo6nOrb6aNj9HPzftp9k96dboudaxwzwlNIvxnZCkhz2F7UFgqsaLk20tEm4F2lJL9UoPggnh00nng2SU7w";
    const [cosmetic, setCosmetic] = useState(null);
    const [showUpdateCosmeticModal, setShowUpdateCosmeticModal] = useState(false);
    const [addedToShoppingCart, setAddedToShoppingCart] = useState(false);
    const [isInShoppingCart, setIsInShoppingCart] = useState(false);

    useEffect(() => {
        axios.get(`/cosmetics/${props.cosmeticId}`)
            .then(response => {
                setCosmetic(response.data);
                if (loggedUsername) {
                    axios.get(`user/${loggedUsername}/shopping-cart`)
                        .then(res => {
                            if (res.data.cosmetics) {
                                let item = res.data.cosmetics.find(cosmetic => cosmetic.id === response.data.id);
                                setIsInShoppingCart(!!item);
                            }
                        })
                }
            })
    }, [showUpdateCosmeticModal, props.cosmeticId, loggedUsername, addedToShoppingCart])

    const handleDelete = () => {
        axios.delete(`/cosmetics/${cosmetic.id}`)
            .then(() => {
                addToast("Bought successful", {
                    appearance: "success",
                })
            })
    }

    const addCosmeticToShoppingCart = () => {
        if (loggedUsername) {
            axios.put(`user/${loggedUsername}/shopping-cart`, null, {
                params: {
                    cosmeticId: cosmetic.id
                }
            })
                .then(() => {
                    setAddedToShoppingCart(true);
                })
        }
    }

    const onToken = token => {
        paymentRequest = {
            description: `Total price for buying ${cosmetic.name} is ${cosmetic.price} EUR`,
            stripeEmail: props.loggedUser.email,
            stripeToken: token.id,
            username: props.loggedUser.username,
            amount: cosmetic.price * 100,
            isFromCart: false
        };
        axios.post("user/charge", paymentRequest)
            .then(() => addToast(`successfully bought ${cosmetic.name}`, {appearance: "success"}))
    }

    return (
        <div>
            {cosmetic != null && <Card>
                <Card.Title className={"mt-3"}>Cosmetic Details</Card.Title>
                <Card.Body>
                    <div className={"row"}>
                        <div className={"col-md-5 right-border"}>
                            <Card.Img
                                src={cosmetic.picture
                                    ? ("data:image/png;base64," + cosmetic.picture)
                                    : NoPhoto}
                            >
                            </Card.Img>
                            <h4 className={"mt-2"}>by {cosmetic.seller.name} {cosmetic.seller.surname}</h4>
                            <h6> -- {cosmetic.category.name}</h6>
                        </div>

                        <div className={"col-md-7 card-details"}>
                            <h5>{cosmetic.name}</h5>
                            <p className={"mb-5"}>{cosmetic.description}</p>
                            <h6>Price: ${cosmetic.price}</h6>

                            <div className={"action-panel"}>
                                {loggedUsername && loggedUsername === cosmetic.seller.username ?
                                    <>
                                        <Button onClick={() => setShowUpdateCosmeticModal(true)}>Edit Cosmetic</Button>
                                        <Button variant={"danger"} className={"ml-3"} onClick={handleDelete}>Delete
                                            Cosmetic</Button>
                                    </>
                                    :
                                    props.loggedUser &&
                                    <>
                                        {!isInShoppingCart &&
                                        <Button variant={"success"} className={"mr-4"}
                                                onClick={addCosmeticToShoppingCart}>Add to shopping cart
                                        </Button>}

                                        <StripeCheckout
                                            className={"mb-3"}
                                            amount={cosmetic.price * 100}
                                            email={props.loggedUser.email}
                                            description={`Total Price is ${cosmetic.price} EUR`}
                                            name={props.loggedUser.name}
                                            panelLabel={"Buy Now"}
                                            currency="EUR"
                                            label={"Buy Now"}
                                            stripeKey={stripeToken}
                                            token={onToken}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </Card.Body>
                {showUpdateCosmeticModal &&
                <EditItem cosmeticid={cosmetic.id} cosmetic={cosmetic} show={showUpdateCosmeticModal}
                          onHide={() => setShowUpdateCosmeticModal(false)}/>}
            </Card>}
        </div>
    )
}