import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putData } from "../Services/apiCalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import image from "/assets/resetPassword.svg";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetToken = localStorage.getItem("resetToken");
  const navigate = useNavigate();

  const handleClick = async () => {
    if(password === ""){
      toast.error("Please Enter Password");
      return;
    }
    if(confirmPassword === ""){
      toast.error("Please Enter Confirm Password");
      return;
    }
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    toast.info("Updating...");
    let temp = await putData(`auth/resetpassword/${resetToken}`, { password });
    console.log(temp);
    if(temp.status === "success"){
      localStorage.removeItem("resetToken");
      toast.success("Password Updated Successfully");
      navigate("/login");
    }else{
      toast.error("Something went wrong please try again");
    }
  };


  return (
    <section className="flex items-center justify-center px-6 py-20">
      <div className="md:flex items-stretch 2xl:items-center shadow-xl bg-white rounded-lg overflow-hidden">
        <div className="hidden basis-1/2 bg-primary p-8 md:flex items-center justify-normal">
          <img src={image} alt="" />
        </div>
        <div className="basis-1/2 p-8">
          <h1 className="text-2xl xl:text-3xl font-semibold text-center mb-8 text-secondary">Reset Password</h1>
          <p className="mb-8 w-full md:w-[80%] xl:w-[60%] text-center xl:text-lg text-[#606060] mx-auto">Enter New Password</p>
          <div className="flex flex-col xl:w-[80%] 2xl:w-[70%] xl:mx-auto">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="email">
              Password
            </label>
            <input onChange={(e) => setPassword(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="password" id="password" />
          </div>
          <div className="flex flex-col xl:w-[80%] 2xl:w-[70%] xl:mx-auto">
            <label className="text-secondary font-semibold text-lg mb-2" htmlFor="email">
              Confirm Password
            </label>
            <input onChange={(e) => setConfirmPassword(e.target.value)} className="outline-none mb-4 bg-[#A69E97] text-secondary p-2 rounded-lg" type="password" id="confirmPassword" />
          </div>
          <button onClick={handleClick} className="bg-secondary hover:bg-accent duration-200 text-white py-2 px-8 rounded-xl block mx-auto">
            Send
          </button>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword