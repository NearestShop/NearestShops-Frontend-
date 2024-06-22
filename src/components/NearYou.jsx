import { useEffect, useState } from "react"
import { getData } from "../Services/apiCalls"
import { useAppContext } from "../Context/AppContext"
import ProductsGrid from "./ProductsGrid"
import SkeletonGrid from "./SkeletonGrid"

const NearYou = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { userData } = useAppContext()

    useEffect(() => {
        const fetchProducts = async () => {
          console.log(userData.government)
            const response = await getData(`products?government=${userData.government}`)
            console.log(response);
            if (response.status === "success") {
                setProducts(response.data.products)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    return (
        <section className="container mx-auto px-4 py-12">
            <h3 className="text-center font-semibold text-3xl mb-8">Products Near You</h3>
            {products.length === 0 && <h1 className="text-center font-semibold text-xl mb-8">No Products Near You</h1>}
            {loading ? <SkeletonGrid /> : <ProductsGrid products={products} />}
        </section>
    )
}

export default NearYou
