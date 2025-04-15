const ProductCard = ({ name, color, price }) => (
    <div className="border p-4 text-center rounded shadow hover:shadow-lg">
      <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
        Image
      </div>
      <p className="mt-2 font-medium">{name}</p>
      <p className="text-gray-500 text-sm">{color}</p>
      <p className="font-bold mt-1">${price}</p>
      <button className="mt-2 border px-4 py-1 rounded hover:bg-gray-100">
        Add to cart
      </button>
    </div>
  );
  
  export default ProductCard;
  