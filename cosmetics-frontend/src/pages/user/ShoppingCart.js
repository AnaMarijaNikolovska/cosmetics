import React, {useEffect, useState} from "react";
import axios from "../../components/AxiosConfig";
import CosmeticMedia from "../../components/CosmeticMedia";
import StripeCheckout from "react-stripe-checkout";
import {useToasts} from "react-toast-notifications";
import EmptyCard from "../../assets/emptycart.png";

export default function ShoppingCart(props) {
    const [shoppingCart, setShoppingCart] = useState(null);
    const [hasDeletedCosmetic, setHasDeletedCosmetic] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const {addToast} = useToasts();
    const stripeToken = "pk_test_51Hep7GAcXXjP3fOBo6nOrb6aNj9HPzftp9k96dboudaxwzwlNIvxnZCkhz2F7UFgqsaLk20tEm4F2lJL9UoPggnh00nng2SU7w";

    useEffect(() => {
        if (props.loggedUser) {
            let totalAmount = 0;
            axios.get(`/user/${props.loggedUser.username}/shopping-cart`)
                .then(res => {

                    if (res.data.cosmetics && res.data.cosmetics.length > 0) {
                        res.data.cosmetics.forEach(cosmetic => totalAmount += cosmetic.price);
                        setTotalPrice(totalAmount);
                    }

                    setShoppingCart(res.data);
                    setHasDeletedCosmetic(false);
                })
        }
    }, [props.loggedUser, hasDeletedCosmetic]);

    let paymentRequest = {
        description: "",
        stripeEmail: "",
        stripeToken: "",
        username: "",
        amount: 0,
        isFromCart: true
    }

    const onToken = token => {
        paymentRequest = {
            description: `Total price for buying all products from shopping cart is ${totalPrice} EUR`,
            stripeEmail: props.loggedUser.email,
            stripeToken: token.id,
            username: props.loggedUser.username,
            amount: totalPrice * 100,
            isFromCart: true
        };
        axios.post("user/charge", paymentRequest)
            .then(() => {
                setHasDeletedCosmetic(true);
                addToast("successfully bought all items", {appearance: "success"});
            })
            .catch(err => addToast("error occured", {appearance: "warning"}))
    }


    return (
        <div>
            {props.loggedUser && <>
                <h3>Shopping Cart</h3>
                {shoppingCart && shoppingCart.cosmetics
                && shoppingCart.cosmetics.length > 0 ?
                    <>
                        {shoppingCart.cosmetics.map(cosmetic => <CosmeticMedia key={cosmetic.id}
                                                                               id={cosmetic.id}
                                                                               setHasDeletedCosmetic={() => setHasDeletedCosmetic(true)}
                                                                               username={props.loggedUser.username}
                                                                               title={cosmetic.name}
                                                                               picture={cosmetic.picture}
                                                                               description={cosmetic.description}
                                                                               price={cosmetic.price}/>)}
                        <h5>Total Price: {totalPrice} € </h5>
                        <StripeCheckout
                            className={"mb-3"}
                            amount={totalPrice * 100}
                            email={props.loggedUser.email}
                            description={`Total Price is ${totalPrice} EUR`}
                            name={props.loggedUser.name}
                            panelLabel={"Buy Now"}
                            currency="EUR"
                            label={"Buy Now"}
                            stripeKey={stripeToken}
                            token={onToken}
                        />
                    </>
                    : <div>
                        <img src={EmptyCard} alt={"empty cart"}/>
                    </div>}
            </>}
        </div>
    )
}