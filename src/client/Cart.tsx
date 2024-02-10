import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

interface CartItem {name: string; price: number; qty: number;}

function updateCartItemQuantity(itemId: string, newQuantity: number) {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || '{}');
    if (cartItems[itemId]) {
        if (newQuantity == 0) {
            delete cartItems[itemId];
        } else {
            cartItems[itemId].qty = newQuantity;
        }
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
}

function Cart() {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{"logged_in": false}');

    if (!userInfo['logged_in']) {
        window.location.href = "/login";
    }

    const [cartItems, setCartItems] = useState<Record<string, CartItem>>(JSON.parse(sessionStorage.getItem("cartItems") || '{}'));
    function handleQuantityChange(itemId: string, event: React.ChangeEvent<HTMLInputElement>) {
        const newQuantity = parseInt(event.target.value);
        updateCartItemQuantity(itemId, newQuantity);
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || '{}');
        setCartItems(cartItems);
    }

    const handleOrder = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || '{}');
        const orderDetails = {
            "username": userInfo["username"],
            "items": cartItems
        }

        const response = await axios.post("/api/order", orderDetails);
        console.log(response.data);
        sessionStorage.setItem("cartItems", JSON.stringify({}));
        window.location.href = "/order";
    };
    
    // Calculate the total value of the items in the cart
    const totalValue = Object.values(cartItems).reduce((total, item) => {return total + item.qty * item.price;}, 0);
        
    return (
        <div>
            <Header />
            <div className="cart-container">
            {Object.entries(cartItems).map(([itemId, item]) => (
                <div key={itemId} className="cart-item">
                <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>
                <div className="cart-item-quantity">
                    <input type="number" min="0" value={item.qty} onChange={(event) => handleQuantityChange(itemId, event)} />
                </div>
                </div>
            ))}
            </div>
            <div className="cart-containter-2">
                {totalValue ? (
                    <div className="cart-total">
                        <p>Total: ${totalValue.toFixed(2)}</p>
                        <button className="checkout-btn" onClick={handleOrder}>Order</button>
                    </div>
                ) : (
                    <p>Nothing in Cart!</p>
                )}
            </div>
            <Footer/>
        </div>
    );
}
export default Cart;