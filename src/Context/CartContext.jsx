import axios from "axios";
import { createContext, useState} from "react";
import toast from "react-hot-toast";




export let CartContext = createContext();


export default function CartContextProvider(props){


    const [numOfCartItem , setNumOfCartItem] = useState(0)
    const [totalPrice , setTotalPrice] = useState(0)
    const [cartId , setCartId] = useState(null)

    let headers={
        token : localStorage.getItem("userToken")
    }

    // to add product on cat 
    async function addProductToCart(productId){
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{headers}).then((response)=>{
            // console.log(response.data);
            setCartId(response.data.data._id)
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            toast.success(response.data.message)

            return response;
        }).catch((error)=>{
            // console.log(error);
            toast.error(response.data.message)

            return error;
        })
    }

    // to get and  put data on cart component
    async function getCartProduct(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers
        }).then((response)=>{
            setCartId(response.data.data._id)
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            // console.log(response);
            return response
        }).catch((error)=>{
            // console.log(error)
            return error
        })
    }

    // remove product  from card component and data base
    async function deleteProduct(productId){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((response)=>{
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            // console.log(response);
            
            return response
        }).catch((error)=>{

            return error
        })
    }

    // update cart
    async function updateCartItem(productId,count){
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
        },{
            headers
        }).then((response)=>{
            setCartId(response.data.data._id)
            setTotalPrice(response.data.data.totalCartPrice)
            console.log(response);
            
            return response
        }).catch((error)=>{

            return error
        })
    }

    
    // method of btn to clear cart
    async function clearCart(){
        return await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers
        }).then((response)=>{
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            // console.log(response);
            
            return response
        }).catch((error)=>{

            return error
        })
    }    

    // online payment
    async function onlinePayment(shippingAddress){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,{
            shippingAddress
        },{
            headers
        }).then((response)=>{
            console.log(response.data.session.url);
            window.location.href=response.data.session.url
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            return response
        }).catch((error)=>{

            return error
        })
    }

    // cash on delivery
    async function cashPayment(shippingAddress){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
            shippingAddress
        },{
            headers
        }).then((response)=>{
            setNumOfCartItem(response.data.numOfCartItems)
            setTotalPrice(response.data.data.totalCartPrice)
            //redirect to home
            window.location.href="http://localhost:5174/"
            console.log(response.data.session.url);
            return response
        }).catch((error)=>{

            return error
        })
    }


    return <CartContext.Provider value={{addProductToCart,onlinePayment,cashPayment, getCartProduct , deleteProduct , updateCartItem , clearCart , numOfCartItem , totalPrice}}>
        {props.children}
    </CartContext.Provider>
}