import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";
import { useGetProductsByBrandQuery } from "../redux/apis/productApi";
import adidaslogo from "../assets/logo/adidas.png";
import nikelogo from "../assets/logo/nike.png";
import vanslogo from "../assets/logo/vans.png";
import { useState } from "react";

const BrandProducts = () => {
  const { brand } = useParams();
  const { data: products = [], isLoading, error } = useGetProductsByBrandQuery(brand);
  const [sort, setSort] = useState("high");

  const brandLogos = {
    adidas: adidaslogo,
    nike: nikelogo,
    vans: vanslogo,
  };

  const sorted = [...products].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Failed to fetch products</div>;

  return (
    <PageWrapper>
      {/* Phần nền full width */}
      <div className="bg-gray-200 w-full py-12">
        {/* Phần nội dung giới hạn chiều rộng */}
        <div className="max-w-7xl mx-auto px-8 rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <h1 className="text-4xl font-extrabold text-gray-900 capitalize flex items-center gap-4">
              {brandLogos[brand.toLowerCase()] ? (
                <img
                  src={brandLogos[brand.toLowerCase()]}
                  alt={brand}
                  className="h-24 w-auto object-contain mr-4"
                />
              ) : (
                brand
              )}
            </h1>

            <div className="flex items-center space-x-4">
              <label
                htmlFor="priceSort"
                className="text-gray-900 font-semibold select-none"
              >
                Sort by price:
              </label>
              <select
                id="priceSort"
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {sorted.map((p, index) => (
              <ProductCard key={p._id || index} {...p} />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BrandProducts;
