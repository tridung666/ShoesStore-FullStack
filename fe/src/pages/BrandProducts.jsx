import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";
import { useGetProductsByBrandQuery } from "../redux/apis/productApi";
import adidaslogo from "../assets/logo/adidas.png";
import nikelogo from "../assets/logo/nike.png";
import vanslogo from "../assets/logo/vans.png";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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

  if (isLoading) {
    // Skeleton loading simple
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded shadow p-4 h-72"></div>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Failed to fetch products
      </div>
    );

  return (
    <PageWrapper>
      <div className="bg-gray-50 w-full py-12">
        <div className="max-w-7xl mx-auto px-8 rounded-lg shadow-md bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 capitalize flex items-center gap-4">
              {brandLogos[brand.toLowerCase()] ? (
                <img
                  src={brandLogos[brand.toLowerCase()]}
                  alt={brand}
                  className="h-24 w-auto object-contain"
                />
              ) : (
                brand
              )}
            </h1>

            <div className="relative inline-block">
              <label
                htmlFor="priceSort"
                className="text-gray-900 font-semibold select-none mr-2"
              >
                Sort by price:
              </label>
              <select
                id="priceSort"
                className="border border-gray-400 rounded-md px-10 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
                aria-label="Sort products by price"
              >
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </select>
              <FaChevronDown
                className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={14}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {sorted.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-20">
                No products found.
              </div>
            ) : (
              sorted.map((p, index) => (
                <ProductCard
                  key={p._id || index}
                  {...p}
                  className="transition-transform hover:scale-[1.02] hover:shadow-lg"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BrandProducts;
