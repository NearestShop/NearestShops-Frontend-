import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { postData } from "../Services/apiCalls";

import cod from "/assets/COD.svg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CashOnDelivery = () => {
  const { userData } = useAppContext();
  const [address, setAddress] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const cartID = localStorage.getItem("cartID");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setAddress(userData.address);
  }, [userData]);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLong(long);
        setLat(lat);
      });
    }
  };

  const handleClick = async () => {
    if (address === "" || address === "None") {
      return toast.error("Please enter address.");
    }
    if (long === "" || lat === "") {
      return toast.error("Please provide location.");
    }
    toast.info("Placing order...");
    const response = await postData(`orders/${cartID}`, { address, long, lat, paymentMethod: "cash" }, userToken);
    if (response) {
      toast.success("Order placed successfully");
      localStorage.removeItem("cartID");
      navigate("/");
    }
  };

  return (
    <section className="flex items-center justify-center px-6 py-20 minHeight">
      <div className="md:flex flex-col md:flex-row shadow-xl p-6 rounded-xl bg-primary lg:w-[760px] xl:w-[1000px]">
        <div className="flex flex-col gap-4 pb-8 md:pb-0 md:pr-8 md:border-r-2 border-accent basis-1/2">
          <div className="flex flex-col gap-4 mt-24 mb-6">
            <span className="font-medium text-xl">Address</span>
            <input className="outline-none p-2 rounded-xl placeholder:text-black" onChange={(e) => setAddress(e.target.value)} type="text" value={address} />
          </div>
          <div className="flex flex-col gap-4 mb-12">
            <span className="font-medium text-xl">Current Location</span>
            <button onClick={handleLocation} className="bg-accent hover:bg-secondary outline-none duration-200 text-white mx-auto lg:w-[250px] py-2 text-lg font-medium">
              Press To Access Location
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={handleClick} className="bg-accent hover:bg-secondary outline-none duration-200 text-white w-[200px] py-2 text-lg font-medium">
              Place Order
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-4 pt-8 md:pt-0 border-t-2 md:border-t-0 border-accent md:pl-8 basis-1/2">
          <img className="size-[250px] lg:size-[400px]" src={cod} alt="" />
          <p className="bg-accent text-center text-white lg:w-[200px] lg:mx-auto py-2 text-xl font-medium">Cash On Delivery</p>
        </div>
      </div>
    </section>
  );
};

export default CashOnDelivery;
