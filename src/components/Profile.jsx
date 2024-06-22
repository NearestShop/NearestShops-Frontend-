import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BasicInfoOverlay from "./BasicInfoOverlay";
import UpdateAvatarOverlay from "./UpdateAvatarOverlay";
import UpdateAddressOverlay from "./UpdateAddressOverlay";
import UpdateMeasurementsOverlay from "./UpdateMeasurementsOverlay";
import UpdatePasswordOverlay from "./UpdatePasswordOverlay";

const Profile = () => {
  const { userData, setUserData } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    document.title = `Nearest Shops | ${userData.name}`;
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await getData("users/wishlist", localStorage.getItem("token"));
      setWishlist(response.data);
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getData("orders", localStorage.getItem("token"));
      setOrders(response.order);
      setLoading2(false);
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
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
    toast.success("Logged out successfully");
  };

  return (
    <section className="minHeight bg-[#f6f3ef] p-6">
      <div className="container mx-auto p-8 bg-white rounded-xl">
        <h1 className="text-center md:text-left font-semibold text-3xl mb-6">Basic Info</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative">
            <img className="size-[125px] rounded-full" src={userData.avatar} alt="profile picture" />
            <UpdateAvatarOverlay />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold mb-4">{userData.name}</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="flex flex-col md:flex-row items-center gap-2 ">
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
              </div>
              <BasicInfoOverlay />
            </div>
            <div className="flex items-center gap-2">
              <p>
                Password: <span>**********</span>
              </p>
              <UpdatePasswordOverlay />
            </div>
          </div>
        </div>
        <hr className="h-[2px] bg-[#f6f3ef] mb-6" />
        <h1 className="text-center md:text-left font-semibold text-3xl mb-6">Address</h1>
        <UpdateAddressOverlay />
        <hr className="h-[2px] bg-[#f6f3ef] mb-6" />
        <div className="flex flex-col md:flex-row justify-center md:justify-normal items-center gap-4 mb-6">
          <h1 className="text-center  font-semibold text-3xl ">User Measurements</h1>
          <UpdateMeasurementsOverlay />
        </div>
        <div className="flex items-center justify-center md:justify-normal gap-4 mb-6">
          <div className="flex items-center justify-center gap-2 bg-[#f6f3ef] hover:bg-accent hover:text-white duration-200 py-2 px-4 w-[100px] text-xl">
            <i className="fa-solid fa-weight-scale"></i>
            <p>{userData.weight}</p>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#f6f3ef] hover:bg-accent hover:text-white duration-200 py-2 px-4 w-[100px] text-xl">
            <i className="fa-solid fa-ruler-vertical"></i>
            <p>{userData.height}</p>
          </div>
        </div>
        <hr className="h-[2px] bg-[#f6f3ef] mb-6" />
        <h1 className="text-center md:text-left font-semibold text-3xl mb-6">Orders</h1>
        {loading2 ? (
          <p className="text-xl mb-6 font-medium">Loading...</p>
        ) : !orders || orders.length === 0 ? (
          <p className="mb-6">No Orders</p>
        ) : (
          <div className="flex flex-wrap gap-4 mb-6">
            {orders.map((order, index) => (
              <div className="bg-primary p-4" key={index}>
                <p className="capitalize font-medium text-lg">
                  Order Price: <span className="font-normal">{order.totalPrice.toFixed(2)}EGP</span>
                </p>
                <p className="capitalize font-medium text-lg">
                  Delivery Address: <span className="font-normal">{order.address}</span>
                </p>
                <p className="capitalize font-medium text-lg">
                  State: <span className="font-normal">{order.state}</span>
                </p>
                <p className="capitalize font-medium text-lg">
                  Order Date: <span className="font-normal">{order.createdAt.split("T")[0]}</span>
                </p>
                {/* <p className="capitalize font-medium text-lg">
                  Products:{" "}
                  {order.products.map((product, index) => (
                    <span key={index}>{product.productID.id},</span>
                  ))}
                </p> */}
              </div>
            ))}
          </div>
        )}
        <hr className="h-[2px] bg-[#f6f3ef] mb-6" />
        <h1 className="text-center md:text-left font-semibold text-3xl mb-6">Wishlist</h1>
        {loading ? (
          <p className="text-xl mb-6 font-medium">Loading...</p>
        ) : wishlist.length === 0 ? (
          <p className="mb-6">Wishlist Empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-2">
            {wishlist.map((product, index) => (
              <div key={index}>
                <div className="w-[300px] h-[366px] relative group">
                  <Link className="block h-full" to={`/product/${product.slug}`}>
                    <img className="w-full h-full" src={product.images[0]} alt={product.name} />
                  </Link>
                </div>
                <Link to={`/product/${index + 1}`}>
                  <div className="p-2">
                    <span className="text-[#b1adad] text-xs">{product.category.name}</span>
                    <h5 className="text-xl font-semibold my-2">{product.name}</h5>
                    <p className="text-xs font-semibold text-[#706e6e]">${product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <hr className="h-[2px] bg-[#f6f3ef] mb-6" />
        <div className="flex justify-center">
          <button onClick={handleLogout} className="bg-[#B23B3B] hover:bg-[#6b1d1d] duration-200 text-white py-2 px-12 font-semibold text-xl">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
