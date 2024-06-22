import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../Services/apiCalls";
import { useAppContext } from "../Context/AppContext";

import image from "/assets/loginImage.svg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const list = ["الإسكندرية", "الإسماعيلية", "أسوان", "أسيوط", "الأقصر", "البحيرة", "البحر الأحمر", "الجيزة", "الدقهلية", "السويس", "الشرقية", "الغربية", "الفيوم", "القاهرة", "القليوبية", "المنوفية", "المنيا", "الوادي الجديد", "بني سويف", "بورسعيد", "جنوب سيناء", "دمياط", "سوهاج", "شمال سيناء", "قنا", "كفر الشيخ", "مطروح"];

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const { userData, setUserData } = useAppContext();
  const navigate = useNavigate();

  const regNumbers = /^[0-9]+$/;
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !passwordConfirm || !height || !weight || !address) {
      return toast.error("Please fill all the fields");
    }
    if (!phone.match(regNumbers)) {
      return toast.error("Phone number should only contain numbers");
    }
    if (phone.length !== 11) {
      return toast.error("Enter a valid phone number.");
    }
    if (!email.match(regEmail)) {
      return toast.error("Enter a valid email address");
    }
    if (password.length < 8) {
      return toast.error("Password should be atleast 8 characters long");
    }
    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }
    if (!height.match(regNumbers)) {
      return toast.error("Height should only contain numbers");
    }
    if (height >= 270 || height <= 50) {
      return toast.error("Enter a valid height");
    }
    if (!weight.match(regNumbers)) {
      return toast.error("Weight should only contain numbers");
    }
    if (weight >= 300 || weight <= 10) {
      return toast.error("Enter a valid weight");
    }
    toast.info("Registering...");
    let response = await postData("auth/register", { name, phone, email, password, passwordConfirm, height, weight, address });
    if (response.status === "success") {
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
      toast.success("Registered Successfully");
      navigate("/");
    } else {
      toast.error(response.response.data.message);
    }
  };

  return (
    <section className="flex items-center justify-center px-6 py-20">
      <div className="lg:flex items-stretch shadow-xl bg-white rounded-lg overflow-hidden">
        <div className="hidden basis-1/2 bg-primary p-8 lg:flex items-center justify-normal">
          <img src={image} alt="" />
        </div>
        <div className="basis-1/2 p-8">
          <h1 className="text-2xl xl:text-3xl font-bold text-center mb-8 text-secondary">Welcome To Nearest Shops !</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col grow">
              <label className="text-secondary font-semibold text-lg mb-2" htmlFor="name">
                Name
              </label>
              <input onChange={(e) => setName(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="text" id="name" />
            </div>
            <div className="flex flex-col grow">
              <label className="text-secondary font-semibold text-lg mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input onChange={(e) => setPhone(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="text" id="phone" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input onChange={(e) => setEmail(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="text" id="email" />
          </div>
          <div className="flex flex-col">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={(e) => setPassword(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="password" id="password" />
          </div>
          <div className="flex flex-col">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input onChange={(e) => setPasswordConfirm(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="password" id="confirmPassword" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col grow">
              <label className="text-secondary font-semibold text-lg mb-2" htmlFor="height">
                Height <span className="text-sm font-[400]">(in cm)</span>
              </label>
              <input onChange={(e) => setHeight(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="text" id="height" />
            </div>
            <div className="flex flex-col grow">
              <label className="text-secondary font-semibold text-lg mb-2" htmlFor="weight">
                Weight <span className="text-sm font-[400]">(in kg)</span>
              </label>
              <input onChange={(e) => setWeight(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="text" id="weight" />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="weight">
              Government
            </label>
            <select onChange={(e) => setAddress(e.target.value)} className="w-full border-2 p-2 text-xl outline-none" name="" id="">
              <option value="none"></option>
              {list.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleRegister} className="bg-secondary hover:bg-accent duration-200 text-white py-2 px-8 rounded-xl block mx-auto">
            Sign Up
          </button>
          <div className="mt-12">
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
