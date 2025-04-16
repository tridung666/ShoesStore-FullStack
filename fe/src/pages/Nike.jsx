import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProductsByBrand } from "../services/productbybranch"; // Import hàm gọi API

const Nike = () => {
  const [sort, setSort] = useState("high");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNikeProducts = async () => {
      try {
        const data = await fetchProductsByBrand("Nike");  // Lấy sản phẩm Nike
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch Nike products");
      } finally {
        setLoading(false);
      }
    };

    fetchNikeProducts();
  }, []);

  const sorted = [...products].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Nike</h1>
        <div>
          Price sort:
          <select
            className="border rounded px-2 py-1 ml-2"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="high">High-Low</option>
            <option value="low">Low-High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sorted.map((p, index) => (
          <ProductCard key={index} {...p} />
        ))}
      </div>
    </div>
  );
};

export default Nike;
