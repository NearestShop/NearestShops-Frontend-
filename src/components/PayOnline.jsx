import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { postData } from "../Services/apiCalls";


import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayOnline = () => {
  const { userData } = useAppContext();
  const [address, setAddress] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const cartID = localStorage.getItem("cartID");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const [state, setState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

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
    if (state.number === "" || state.expiry === "" || state.cvc === "" || state.name === "") {
      return toast.error("Please enter card details.");
    }
    if (state.number.length != 16) {
      return toast.error("Please enter a valid card number.");
    }
    if (state.expiry.length != 4) {
      return toast.error("Please enter a valid expiry date.");
    }
    if (state.cvc.length != 3) {
      return toast.error("Please enter a valid cvc.");
    }
    if (address === "" || address === "None") {
      return toast.error("Please enter address.");
    }
    if (long === "" || lat === "") {
      return toast.error("Please provide location.");
    }

    const numStr = state.number.toString();
    setCardNumber(numStr.replace(/(\d{4})(?=\d)/g, "$1-"));
    setCardHolder(state.name);
    const expStr = state.expiry.toString();
    setExpirationDate(expStr.replace(/(\d{2})(\d{2})/, "$1/$2"));
    setCvc(state.cvc);

    toast.info("Placing order...");
    const response = await postData(`orders/${cartID}`, { address, long, lat, paymentMethod: "online", cardInformation: { cardNumber, cardHolder, expirationDate, cvv: cvc } }, userToken);
    if (response) {
      toast.success("Order placed successfully");
      localStorage.removeItem("cartID");
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <section className="flex items-center justify-center px-6 py-20 minHeight">
      <div className="md:flex flex-col md:flex-row shadow-xl p-6 rounded-xl bg-primary lg:w-[760px] xl:w-[1000px]">
        <div className="hidden md:flex flex-col justify-center gap-4 pt-8 md:pt-0 border-t-2 md:border-t-0 border-accent md:pr-8 basis-1/2">
          <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
          <p className="bg-accent text-center text-white lg:w-[200px] lg:mx-auto py-2 text-xl font-medium">Pay Online</p>
        </div>
        <div className="flex flex-col gap-4 pb-8 md:pb-0 md:pl-8 md:border-l-2 border-accent basis-1/2">
          <div className="flex flex-col gap-4">
            <span className="font-medium text-xl">Card Number</span>
            <input type="number" name="number" className="outline-none p-2 rounded-xl " placeholder="Card Number" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} required />
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-medium text-xl">Name</span>
            <input type="text" name="name" className="outline-none p-2 rounded-xl " placeholder="Name" onChange={handleInputChange} onFocus={handleInputFocus} required />
          </div>
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col gap-4">
              <span className="font-medium text-xl">Expiration Date</span>
              <input type="number" name="expiry" className="outline-none p-2 rounded-xl " placeholder="Valid Thru" pattern="\d\d/\d\d" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} />
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-medium text-xl">CVC</span>
              <input type="number" name="cvc" className="outline-none p-2 rounded-xl " placeholder="CVC" pattern="\d{3,4}" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} required />
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-6">
            <span className="font-medium text-xl">Address</span>
            <input className="outline-none p-2 rounded-xl placeholder:text-black" onChange={(e) => setAddress(e.target.value)} type="text" value={address} />
          </div>
          <div className="flex flex-col gap-4 mb-6">
            <span className="font-medium text-xl">Current Location</span>
            <button onClick={handleLocation} className="bg-accent hover:bg-secondary outline-none duration-200 px-2 text-white mx-auto lg:w-[250px] py-2 text-lg font-medium">
              Press To Access Location
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={handleClick} className="bg-accent hover:bg-secondary outline-none duration-200 text-white w-[200px] py-2 text-lg font-medium">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayOnline;
