import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import ProtectedRoutes from './Components/protectedRoutes/protectedRoutes';
import ProtectedAuthentication from './Components/ProtectedAuthentication/ProtectedAuthentication';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import AllOrders from './Components/AllOrders/AllOrders';
import Checkout from './Components/Checkout/Checkout';
import { Offline } from 'react-detect-offline';
function App() {
  const queryClient = new QueryClient()
  let routers=createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      {index:true,element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"login",element:<ProtectedAuthentication><Login/></ProtectedAuthentication>},
      {path:"register",element:<ProtectedAuthentication><Register/></ProtectedAuthentication>},
      {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"allOrders",element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      {path:"checkout",element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
      {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"productdetails/:id",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"*",element:<NotFound/>},
    ]
  }])
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}></RouterProvider>
      <Offline>
        <div className=" text-white fixed bottom-1 left-1 bg-red-900 px-3 py-2 rounded-lg "> YOU ARE OFFLINE!</div>
      </Offline>
      <Toaster/>
      </QueryClientProvider>
    </>
  );
}

export default App
