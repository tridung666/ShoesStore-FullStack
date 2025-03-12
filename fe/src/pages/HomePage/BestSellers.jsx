import React from "react";
import SambaOG from '../../assets/BestSeller/SambaOG.png';
import AdidasStanSmith from '../../assets/BestSeller/AdidasStanSmith.png';
import NikeAir from '../../assets/BestSeller/NikeAir.png';
import Vans from '../../assets/BestSeller/Vans.png';

const products = [
  { id: 1, name: "Samba OG", color: "Cream White", price: 55, image: SambaOG },
  { id: 2, name: "Adidas Stan Smith", color: "Black", price: 55, image: AdidasStanSmith },
  { id: 3, name: "Vans", color: "Black", price: 55, image: Vans },
  { id: 4, name: "Nike Air", color: "Blue", price: 55, image: NikeAir },
];

const BestSellers = () => {
  return (
   
    <div className="max-w-screen-2xl mx-auto px-16 py-20 ">
      <h2 className="text-5xl font-bold text-black flex justify-center py-10">
        Best Sellers 🔥
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Explore our exclusive collection of stylish sneakers.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 justify-center">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white text-center flex flex-col items-center max-w-sm w-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-contain rounded-md"
            />
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.color}</p>
            <p className="text-lg font-bold mt-2">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
            </p>
            <button className="mt-3 bg-gray-100 text-black py-2 rounded-md hover:bg-gray-300 transition px-6">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default BestSellers;
