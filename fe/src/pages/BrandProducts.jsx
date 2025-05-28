import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";
import { useGetProductsByBrandQuery } from "../redux/apis/productApi"; 
import { useState } from "react";

const BrandProducts = () => {
  const { brand } = useParams();
  const { data: products = [], isLoading, error } = useGetProductsByBrandQuery(brand);
  const [sort, setSort] = useState("high");

  const sorted = [...products].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Failed to fetch products</div>;

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 capitalize">{brand}</h1>

          <div className="flex items-center space-x-3">
            <label htmlFor="priceSort" className="text-gray-700 font-medium">
              Sort by price:
            </label>
            <select
              id="priceSort"
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="high">High to Low</option>
              <option value="low">Low to High</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sorted.map((p, index) => (
            <ProductCard key={p._id || index} {...p} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BrandProducts;
