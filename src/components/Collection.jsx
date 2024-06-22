import { useEffect, useState } from "react";
import { getData } from "../Services/apiCalls";
import { useParams, Link } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import SkeletonGrid from "./SkeletonGrid";
import ReactPaginate from "react-paginate";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { type } = useParams();

  useEffect(() => {
    document.title = `Nearest Shops | Collection`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getData("category");
      if (response.status === "success") {
        setCategories(response.data.categories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await getData(`products?category=${category}`);
      console.log(response);
      setNumberPages(response.pagesCount);
      if (response.status === "success") {
        setProducts(response.data.products);
        setLoading(false);
      }
    };
    fetchCollection();
  }, [category]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo(0, 0);
  };

  return (
    <section className="container mx-auto px-6 py-20 minHeight">
      <h1 className="text-4xl font-[500] mb-8">Collection</h1>
      {loading ? (
        <SkeletonGrid />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="">Showing {products.length} Items</p>
            <select onChange={(e) => setCategory(e.target.value)} className="border p-2 outline-none" name="" id="">
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <ProductsGrid products={products} />
        </>
      )}
    </section>
  );
};

export default Collection;
