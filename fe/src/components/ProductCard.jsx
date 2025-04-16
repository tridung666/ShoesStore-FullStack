const ProductCard = ({ name, color, price, image }) => {
  return (
    <div className="bg-white p-4 border rounded-lg shadow-md">
      {/* Hiển thị hình ảnh */}
      <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
      
      {/* Hiển thị tên sản phẩm */}
      <h3 className="text-xl font-semibold">{name}</h3>
      
      {/* Hiển thị màu sắc sản phẩm */}
      <p className="text-sm text-gray-500">{color}</p>
      
      {/* Hiển thị giá sản phẩm */}
      <p className="text-lg text-black">${price}</p>
      
      {/* Nút "Add to cart" */}
      <button className="w-full bg-gray-100 text-black py-2 mt-4 rounded-lg hover:bg-gray-300">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
