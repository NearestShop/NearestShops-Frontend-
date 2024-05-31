import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";
import ProductsGrid from "./ProductsGrid";
import SkeletonGrid from "./SkeletonGrid";

const Recommended = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getData("products/recommended", userToken);
      if (response.status === "success") {
        setProducts(response.data.products);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto px-4 pb-24">
      <h3 className="text-center font-semibold text-3xl mb-8">Recommended For You</h3>
      {loading ? <SkeletonGrid /> : <ProductsGrid products={products} /> }
    </section>
  )
}

export default Recommended