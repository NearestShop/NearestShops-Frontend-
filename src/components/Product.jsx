import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { getData, postData, deleteData } from "../Services/apiCalls";
import Skeleton from "@mui/material/Skeleton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const { name } = useParams();
  const { userData } = useAppContext();
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Nearest Shops | ${loading ? "Loading" : product.name}`;
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getData(`products/${name}`, userToken);
      if (response.status === "success") {
        setProduct(response.data.product);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const toggleWishlist = async () => {
    if(product.isInFavorites) {
      const response = await deleteData(`users/wishlist/${product._id}`, userToken);
      if(response.status === "success"){
        window.location.reload();
      }           
    }else{
      const response = await postData(`users/wishlist/${product._id}`, {}, userToken);
      console.log(response);
      if(response.status === "success"){
        window.location.reload();
      }
    }
  }

  const handleAddToCart = async () => {
    if (!userData.loggedIn) {
      navigate("/login");
      toast.error("Please login to add to cart");
      return;
    }
    const response = await postData("cart", { products: {productID: product._id, quantity: count}}, userToken);
    if(response.message === "Item Added to Cart"){
      toast.success("Item Added to Cart");
    }
  };

  return (
    <section className={`container mx-auto px-4 py-24 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center`}>
      {loading ? (
        <>
          <div className="basis-1/2 flex justify-end">
            <Skeleton variant="rectangle" width="60%" height={500} animation="wave" />
          </div>
          <div className="basis-1/2">
            <Skeleton variant="text" width="100px" animation="wave" />
            <Skeleton variant="text" width="300px" animation="wave" />
            <Skeleton variant="text" width="300px" animation="wave" />
            <Skeleton variant="text" width="500px" animation="wave" />
            <Skeleton variant="text" width="500px" animation="wave" />
          </div>
        </>
      ) : (
        <>
          <div className="basis-1/2 flex lg:justify-end">
            <img className="h-[350px] lg:h-[500px] sm:w-[80%] sm:mx-auto lg:mx-0 lg:w-[70%]" src={product.images[0]} alt={product.name} />
          </div>
          <div className="basis-1/2">
            <span className="text-[#b3b1b1] text-sm font-[300]">{product.category.name}</span>
            <h1 className="text-3xl font-semibold my-2">{product.name}</h1>
            <p className="text-[#b3b1b1] text-sm font-[300] mb-2">Rating: {product.rating}/5</p>
            <p className="font-semibold text-xl mb-2">
              ${product.price} <span className="text-sm font-normal text-[#b3b1b1]">& Free Shipping</span>
            </p>
            <p className="text-[#b3b1b1] font-[300] text-sm mb-2">{product.description}</p>
            <div className="mb-4 flex gap-4">
              {product.sizes.length > 0 && (
                <>
                  <h4 className="mb-1 font-semibold">Sizes</h4>
                  {product.sizes.map((size, index) => (
                    <div className="size-[30px] text-sm flex justify-center items-center border border-[#dddddd] hover:border-black text-[#b3b1b1] hover:text-black duration-200" key={index}>
                      {size.size}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex items-center mb-4">
              <button onClick={handleAddToCart} className="bg-secondary hover:bg-accent text-white text-sm duration-300 px-6 h-[40px] mr-8">Add To Cart</button>
              <button
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
                className="text-[#212529] border border-[#dddddd] hover:border-black text-lg size-[40px] block duration-200"
              >
                -
              </button>
              <span className="text-[#212529] border border-[#dddddd] hover:border-black text-lg size-[40px] flex justify-center items-center duration-200">{count}</span>
              <button onClick={() => setCount(count + 1)} className="text-[#212529] border border-[#dddddd] hover:border-black text-lg size-[40px] block duration-200">
                +
              </button>
            </div>
            {userData.loggedIn && <button onClick={toggleWishlist} className="bg-secondary hover:bg-accent text-white text-sm duration-300 px-6 h-[40px]">{product.isInFavorites ? "Remove From Wishlist" : "Add To Wishlist"}</button>}
          </div>
        </>
      )}
    </section>
  );
};

export default Product;
