import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import CartPageSkeleton from "./CartPageSkeleton";
import TotalSkeleton from "./TotalSkeleton";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const userToken = localStorage.getItem("token");
      const cartData = await getData("cart", userToken);
      localStorage.setItem("cartID", cartData.cart._id)
      setTotalPrice(cartData.cart.totalPrice.toFixed(2));
      setProducts(cartData.cart.products);
      setFetching(false);
    };
    fetchCart();
  }, []);

  return (
    <div className="bg-[#f1f1ef] py-6 px-3 md:px-8 xl:px-40 2xl:px-80 md:py-12">
        <div className="bg-white px-8 py-20">
          <div className="container mx-auto px-6">
            <h1 className="text-center text-[#212529] text-5xl xl:text-6xl mb-6">Cart</h1>
          </div>
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-8">
            <div className="grow border-[1px] border-[#e6e6e6]">
              <div className="bg-[#f1f1ef] text-[#979a9b] py-5 px-5 text-2xl font-medium">
                <p>Cart Items</p>
              </div>
              {fetching ? (
                <CartPageSkeleton />
              ) : (
                products.map((product, index) => {
                  return (
                    <div className="flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0 justify-between items-center border-[1px] border-t-0 px-6 py-3 border-[#e6e6e6] relative" key={index}>
                      <div className="flex flex-col sm:flex-row space-x-3 items-center lg:w-[40%]">
                        <div className="mb-3 sm:mb-0">
                          <img className="w-[75px]" src={product.productID.images[0]} alt="" />
                        </div>
                        <p className="text-[#212529] text-sm sm:text-base">{product.productID.name}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#212529] text-sm sm:text-base">Price: {product.productID.price}EGP</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#212529] text-sm sm:text-base">Quantity: {product.quantity}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#212529] text-sm sm:text-base">Subtotal: {(product.productID.price * product.quantity).toFixed(2)}EGP</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="border-[1px] border-[#e6e6e6] flex flex-col justify-between">
              <div className="mb-8">
                <div className="bg-[#f1f1ef] text-[#979a9b] py-5 px-5 text-2xl font-medium">
                  <p className="text-center">Cart Total</p>
                </div>
                {fetching ? (
                  <TotalSkeleton />
                ) : (
                  <>
                    <div className="flex justify-between space-x-2 px-8 py-2 text-[#979a9b] font-semibold">
                      <p className="text-lg">Total</p>
                      <p className="text-lg">{totalPrice}EGP</p>
                    </div>
                  </>
                )}
              </div>
              <Link to="/payment-type" className="bg-accent hover:bg-secondary font-semibold text-center text-white duration-300 px-6 py-2">
                Choose Payment Type
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CartPage