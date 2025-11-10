import axios from "axios";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props){
    const [numOfCartItem , setNumOfCartItem] = useState(0)
    const [totalPrice , setTotalPrice] = useState(0)
    const [cartId , setCartId] = useState(null)

    // **FIXED: Get token from localStorage directly (no import needed)**
    function getHeaders() {
        const currentToken = localStorage.getItem("userToken");
        return {
            token: currentToken
        };
    }

    // Check if user is authenticated
    function isAuthenticated() {
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.error("Please login first");
            return false;
        }
        return true;
    }

    // to add product on cart 
    async function addProductToCart(productId){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                { headers: getHeaders() } // **FIXED: Use getHeaders()**
            );
            
            setCartId(response.data.data._id)
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            toast.success(response.data.message)
            return response;
        } catch (error) {
            console.log("Add to cart error:", error);
            toast.error(error.response?.data?.message || "Failed to add product to cart")
            return error;
        }
    }

    // to get and put data on cart component
    async function getCartProduct(){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: getHeaders() // **FIXED: Use getHeaders()**
            });
            
            setCartId(response.data.data._id)
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response;
        } catch (error) {
            console.log("Get cart error:", error);
            // Return empty data structure to prevent undefined errors
            return { 
                data: { 
                    data: { 
                        products: [],
                        _id: null,
                        totalCartPrice: 0
                    },
                    numOfCartItems: 0,
                    status: "error"
                }
            };
        }
    }

    // remove product from cart component and database
    async function deleteProduct(productId){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: getHeaders() // **FIXED: Use getHeaders()**
            });
            
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response;
        } catch (error) {
            console.log("Delete error:", error);
            return error;
        }
    }

    // update cart
    async function updateCartItem(productId, count){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count
            }, {
                headers: getHeaders() // **FIXED: Use getHeaders()**
            });
            
            setCartId(response.data.data._id)
            setTotalPrice(response.data.data.totalCartPrice)
            console.log(response);
            return response;
        } catch (error) {
            console.log("Update cart error:", error);
            return error;
        }
    }
    
    // method of btn to clear cart
    async function clearCart(){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: getHeaders() // **FIXED: Use getHeaders()**
            });
            
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response;
        } catch (error) {
            console.log("Clear cart error:", error);
            return error;
        }
    }    

    // online payment
    async function onlinePayment(shippingAddress){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`, {
                shippingAddress
            }, {
                headers: getHeaders() // **FIXED: Use getHeaders()**
            });
            
            console.log(response.data.session.url);
            window.location.href = response.data.session.url;
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response;
        } catch (error) {
            console.log("Online payment error:", error);
            return error;
        }
    }

    // cash on delivery
    async function cashPayment(shippingAddress){
        if (!isAuthenticated()) return;
        
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
                shippingAddress
            }, {
                headers: getHeaders() // **FIXED: Use getHeaders()**
            });
            
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            // redirect to home
            window.location.href = "http://localhost:5174/"
            console.log(response.data.session.url);
            return response;
        } catch (error) {
            console.log("Cash payment error:", error);
            return error;
        }
    }

    return <CartContext.Provider value={{
        addProductToCart, 
        onlinePayment, 
        cashPayment, 
        getCartProduct, 
        deleteProduct, 
        updateCartItem, 
        clearCart, 
        numOfCartItem, 
        totalPrice
    }}>
        {props.children}
    </CartContext.Provider>
}