import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { postData } from "../Services/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import image from "/assets/loginImage.svg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all the fields");
    }
    toast.info("Logging in...");
    const response = await postData("auth/login", { email, password });
    if (response.status === "success") {
      toast.success("Logged in successfully");
      setUserData({
        ...userData,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
        height: response.data.user.height,
        weight: response.data.user.weight,
        address: response.data.user.address,
        role: response.data.user.role,
        avatar: response.data.user.photo,
        wishlist: response.data.user.wishlist,
        government: response.data.user.government,
        loggedIn: true,
      });
      localStorage.setItem("token", response.token);
      navigate("/");
    }else{
      toast.error("Invalid Credentials");
    }
  };

  return (
    <section className="flex items-center justify-center px-6 py-20">
      <div className="md:flex items-stretch shadow-xl bg-white rounded-lg overflow-hidden">
        <div className="hidden basis-1/2 bg-primary p-8 md:flex items-center justify-normal">
          <img src={image} alt="" />
        </div>
        <div className="basis-1/2 p-8">
          <h1 className="text-2xl xl:text-3xl font-bold text-center mb-8 text-secondary">Welcome Back !</h1>
          <div className="flex flex-col">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input onChange={(e) => setEmail(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="email" id="email" />
          </div>
          <div className="flex flex-col">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={(e) => setPassword(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="password" id="password" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-8">
            <div>
              <input type="checkbox" id="remember" />
              <label className="text-secondary ml-2" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <Link to="/forgot-password" className="text-secondary">
              Forgot Password?
            </Link>
          </div>
          <button onClick={handleLogin} className="bg-secondary hover:bg-accent duration-200 text-white py-2 px-8 rounded-xl block mx-auto">
            Login
          </button>
          <div className="mt-12">
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="text-secondary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
