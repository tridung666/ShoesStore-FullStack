import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";
import { useGetProductsByBrandQuery } from "../redux/apis/productApi"; // ✅ Import đúng

import { useState } from "react";

const BrandProducts = () => {
  const { brand } = useParams();
  const { data: products = [], isLoading, error } = useGetProductsByBrandQuery(brand); // ✅ Dùng RTK query
  const [sort, setSort] = useState("high");

  const sorted = [...products].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Failed to fetch products</div>;

  return (
    <PageWrapper>
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700 capitalize">{brand}</h1>
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
    </PageWrapper>
  );
};

export default BrandProducts;
