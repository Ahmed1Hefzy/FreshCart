import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import CounterContextProvider from './Context/CounterContext.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import CartContextProvider from './Context/CartContext.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';




createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <CartContextProvider>
  <TokenContextProvider>
  <CounterContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CounterContextProvider>
  </TokenContextProvider>
  </CartContextProvider>
  </Provider>
,
)
