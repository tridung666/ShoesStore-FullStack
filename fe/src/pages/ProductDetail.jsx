import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../redux/apis/productApi"; // Import API hook
import { handleAddToCart } from "../redux/actions/cartActions"; // Import handleAddToCart
import PageWrapper from "../components/PageWrapper";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const dispatch = useDispatch(); // Sử dụng dispatch từ Redux

  // Fetching product details using Redux API hook
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Lấy danh sách kích thước từ product.size
  const sizes = product?.size || [];

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    // Gọi hàm handleAddToCart từ cartActions
    handleAddToCart(dispatch, productToAdd);
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error fetching product</div>;

  return (
    <PageWrapper>
      <div className="p-10 flex flex-col md:flex-row gap-10">
        {/* Left side - Product image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="bg-gray-100 p-4 w-full rounded"
          />
        </div>

        {/* Right side - Product details */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name || "Product Name"}</h1>
            <p className="text-2xl mt-2">${product.price || "0.00"}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Details</h3>
            <div className="border-t border-gray-300 pt-2">
              <p className="text-gray-700">
                {product.description || "No description available."}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-2">Color</h3>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 ${
                  selectedColor === "White"
                    ? "bg-green-700 text-white"
                    : "border border-gray-300"
                }`}
                onClick={() => setSelectedColor("White")}
              >
                White
              </button>
              {/* Thêm các màu khác nếu cần */}
            </div>
          </div>

          <div>
            <h3 className="mb-2">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`border border-gray-300 p-2 text-center ${
                    selectedSize === size ? "border-black" : ""
                  } hover:border-black`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-1/4">
              <h3 className="mb-2">Qty</h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <button
            className="bg-green-700 text-white py-3 w-full rounded"
            onClick={handleAddToCartClick} // Gọi hàm khi nhấn nút
          >
            Add to Cart
          </button>

          <button className="border border-gray-300 py-3 w-full rounded">
            Buy Now
          </button>

          <p className="text-center text-sm">Free shipping on orders</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
