import { useState, useEffect } from "react";
import { getData, deleteData } from "../Services/apiCalls";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/SwipeableDrawer";
import CartSkeleton from "./CartSkeleton";

const Cart = () => {
  const [openCart, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");

  const toggleCart = (openStatus) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(openStatus);
  };

  const removeFromCart = async (id) => {
    const response = await deleteData(`cart/${id}`, userToken);
    setOpen(false);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getData("cart", userToken);
      setCartItems(cartData.cart.products);
      setLoading(false);
    };
    fetchCart();
  }, [openCart]);
  return (
    <>
      <i onClick={toggleCart(true)} className="fa-solid fa-cart-shopping hover:text-secondary duration-200 cursor-pointer md:text-2xl"></i>
      <Drawer anchor="right" open={openCart} onClose={toggleCart(false)} onOpen={toggleCart(true)}>
        <div className="w-screen h-full md:max-w-screen-sm flex flex-col p-3">
          <div className="flex justify-between border-b-[1px] border-[#dddddd] mb-6">
            <p className="text-xl text-[#212529] pb-3">Shopping Cart</p>
            <button className="pb-3" onClick={toggleCart(false)}>
              <i className="fa-solid fa-x text-2xl text-[#212529] hover:text-accent duration-200"></i>
            </button>
          </div>
          <div className="grow">
            {loading ? (
              <CartSkeleton />
            ) : cartItems.length === 0 ? (
              <p className="text-xl font-semibold text-center">Cart Empty</p>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div>
                  {cartItems.map((item) => (
                    <div key={item._id} className="border-b-[1px] border-[#dddddd] flex items-center justify-between p-3">
                      <div className="flex items-center gap-4">
                        <img className="size-[60px] object-cover" src={item.productID.images[0]} alt="" />
                        <div>
                          <p className="text-[#212529]">{item.productID.name}</p>
                          <p className="text-[#212529]">{item.productID.price}EGP</p>
                          <p className="text-[#212529]">{item.quantity} Pieces</p>
                        </div>
                      </div>
                      <div>
                        <i onClick={() => removeFromCart(item.productID.id)} className="fa-solid fa-x text-xl hover:text-[#B23B3B] duration-200 cursor-pointer"></i>
                      </div>
                    </div>
                  ))}
                </div>
                <Link onClick={() => setOpen(false)} className="text-center bg-accent hover:bg-secondary duration-200 py-3 text-white font-semibold" to="/cart">View Cart</Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
