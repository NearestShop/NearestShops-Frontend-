import { useState } from "react";
import { putData } from "../Services/apiCalls";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePasswordOverlay = () => {
  const { setUserData } = useAppContext();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (oldPassword === "" || newPassword === "" || newPasswordConfirm === "") {
      return toast.error("Please fill all fields");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 9 characters long");
    }
    if (newPassword !== newPasswordConfirm) {
      return toast.error("Passwords do not match");
    }
    
    toast.info("Updating...");
    setLoading(true);
    const response = await putData("users/updatepassword", { oldPassword, newPassword, newPasswordConfirm }, userToken);
    
    if (response.status === "success") {
      toast.success("Updated successfully Please Sign In again to continue");
      localStorage.removeItem("token");
      setUserData({
        name: "",
        email: "",
        phone: "",
        height: "",
        weight: "",
        address: "",
        role: "",
        avatar: "",
        wishlist: [],
        loggedIn: false,
      });
      navigate("/");
      setLoading(false);
      setOpen(false);
    }else{
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="">
        <i className="fa-solid fa-pen hover:text-accent duration-200  cursor-pointer text-xl"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 sm:p-12 shadow shadow-white rounded-xl w-[300px] sm:w-[450px]">
            <div className={`flex items-center justify-between mb-6`}>
              <h3 className="font-semibold text-2xl">Update Password</h3>
              <i className="fa-solid fa-x text-lg text-[#a3aab5] hover:text-black duration-300 cursor-pointer" onClick={() => setOpen(false)}></i>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-semibold text-lg">Old Password:</span>
              <input onChange={(e) => setOldPassword(e.target.value)} type="password" className="outline-none border border-primary p-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-semibold text-lg">New Password:</span>
              <input onChange={(e) => setNewPassword(e.target.value)} type="password" className="outline-none border border-primary p-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-semibold text-lg">Confirm New Password:</span>
              <input onChange={(e) => setNewPasswordConfirm(e.target.value)} type="password" className="outline-none border border-primary p-2 rounded-lg" />
            </div>
            <div className="flex justify-center">
              <button disabled={loading} onClick={handleUpdate} className="bg-accent hover:bg-secondary duration-200 px-12 py-2 text-white font-semibold text-lg">
                {loading ? "Updating" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePasswordOverlay;
