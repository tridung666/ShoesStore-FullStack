import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Adidas = () => {
  const [sort, setSort] = useState("high");

  const products = [
    { name: "Classic Chuck", color: "White", price: 65 },
    { name: "Air Max", color: "Red", price: 120 },
    { name: "Nike React", color: "Blue", price: 140 },
    { name: "Adidas NMD", color: "Grey", price: 130 },
    { name: "New Balance", color: "Orange", price: 125 },
  ];

  const sorted = [...products].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Adidas</h1>
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

export default Adidas;
