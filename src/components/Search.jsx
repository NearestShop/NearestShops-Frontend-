import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import ProductsGrid from "./ProductsGrid";
import SkeletonGrid from "./SkeletonGrid";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useParams();

  useEffect(() => {
    document.title = `Nearest Shops | ${query}`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await getData(`products/search?name=${query}`);
      setProducts(response.products);
      setLoading(false);
    };
    fetchCollection();
  }, []);

  return (
    <section className="container mx-auto px-6 py-20 minHeight">
      <h1 className="text-4xl font-[500] mb-8">Search Results</h1>
      {loading ? (
        <SkeletonGrid />
      ) : (
        <>
          {products.length === 0 ? (
            <p className="mb-6 text-lg font-medium">No Results Found</p>
          ) : (
            <>
              <p className="mb-6 text-lg font-medium">Showing {products.length} Items</p>
              <ProductsGrid products={products} />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Search;
