import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./Context/AppContext";
import { useEffect } from "react";
import { getData } from "./Services/apiCalls";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Contact from "./components/Contact";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Collection from "./components/Collection";
import Product from "./components/Product";
import ForgotPassword from "./components/ForgotPassword";
import OTP from "./components/OTP";
import ResetPassword from "./components/ResetPassword";
import CartPage from "./components/CartPage";
import PaymentType from "./components/PaymentType";
import CashOnDelivery from "./components/CashOnDelivery";
import PayOnline from "./components/PayOnline";
import Search from "./components/Search";
import Chatbot from "./components/Chatbot";

function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));
  const { setUserData } = useAppContext();

  useEffect(() => {
    if(loggedIn) {
      const token = localStorage.getItem("token");
      getData("users", token).then((response) => {
        if(response.status === "success") {
          setUserData({
            name: response.data.user.name,
            email: response.data.user.email,
            phone: response.data.user.phone,
            height: response.data.user.height,
            weight: response.data.user.weight,
            address: response.data.user.address,
            role: response.data.user.role,
            avatar: response.data.user.photo,
            wishlist: response.data.user.wishlist,
            loggedIn: true,
          });
        }
      });
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:name" element={<Product />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-type" element={<PaymentType />} />
          <Route path="/cash-on-delivery" element={<CashOnDelivery />} />
          <Route path="/pay-online" element={<PayOnline />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer autoClose={2500} theme="dark" newestOnTop={true} />
    </>
  );
}

export default App;
