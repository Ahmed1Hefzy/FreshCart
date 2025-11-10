import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  let { getCartProduct, deleteProduct, updateCartItem, clearCart, totalPrice } = useContext(CartContext)

  // to call cartContext after component rendered , function to delete from cart
  async function getCart(){
    setLoading(true);
    try {
      let response = await getCartProduct();
      console.log(response?.data?.data?.products, "cart Data");
      
      // FIXED: Check if response and data exist before using them
      if (response?.data?.status === "success" && response.data.data?.products) {
        setCartItems(response.data.data.products)
      } else {
        setCartItems([])
        toast.error("Failed to load cart items")
      }
    } catch (error) {
      console.log("Get cart error:", error);
      setCartItems([])
      toast.error("Failed to load cart")
    } finally {
      setLoading(false);
    }
  }
  
  async function deleteItem(productId){
    try {
      let response = await deleteProduct(productId)
      console.log(response);

      // FIXED: Check if response exists and has data
      if (response?.data?.status === "success") {
        setCartItems(response.data.data.products)
        toast.success("Product removed from cart")
      }
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to remove product")
    }
  }

  // render update (count)
  async function updateProduct(productId, count){
    try {
      let response = await updateCartItem(productId, count)
      
      // FIXED: Check if response exists and has data
      if (response?.data?.status === "success") {
        setCartItems(response.data.data.products)
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("Failed to update quantity")
    }
  }

  // clear cart
  async function clearCartItems(){
    try {
      let response = await clearCart();
      
      // FIXED: Check if response exists and has data
      if (response?.data?.status === "success") {
        setCartItems([])
        toast.success("Cart cleared successfully")
      }
    } catch (error) {
      console.log("Clear cart error:", error);
      toast.error("Failed to clear cart")
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
      </div>
    )
  }

  return (
    <>
      <div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg px-12">
        <div className="text-right">
          <button 
            onClick={() => clearCartItems()} 
            className="bg-red-700 text-white px-2 py-3 rounded-md my-2"
            disabled={cartItems.length === 0}
          >
            Clear Cart
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-600">Your cart is empty</h2>
            <Link to="/products" className="text-main hover:underline mt-4 inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateProduct(item.product.id, item.count - 1 <= 0 ? 1 : item.count - 1)} 
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>{item.count}</span>
                      </div>
                      <button 
                        onClick={() => updateProduct(item.product.id, item.count + 1)} 
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span>{item.price} $</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span>{item.price * item.count} $</span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => deleteItem(item.product.id)} 
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-white border-b text-black text-center text-lg font-bold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">Total Price</td>
                <td className="p-4" colSpan={4}>{totalPrice} $</td>
                <td className="p-4" colSpan={5}>
                  <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">
                    Checkout
                  </button>
                  <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-green-700 dark:text-green-200" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <Link to="/checkout" state={{type:"Online Payment"}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Online
                        </Link>
                      </li>
                      <li>
                        <Link to="/checkout" state={{type:"Cash On Delivery"}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Cash
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}