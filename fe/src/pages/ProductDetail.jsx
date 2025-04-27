import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../redux/apis/productApi";
import { handleAddToCart } from "../redux/actions/cartActions";
import { useUpdateCartMutation } from "../redux/apis/cartApi";
import PageWrapper from "../components/PageWrapper";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // ✅ Lấy user
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const [updateCart] = useUpdateCartMutation();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = product?.size || [];
  const colors = product?.color || [];

  const handleAddToCartClick = async () => {
    if (!selectedSize) return alert("❗ Bạn cần chọn size!");
    if (!selectedColor) return alert("❗ Bạn cần chọn màu sắc!");
    if (!product) return alert("❗ Sản phẩm chưa sẵn sàng!");

    try {
      await handleAddToCart(
        dispatch,
        {
          ...product,
          size: selectedSize,
          color: selectedColor,
          quantity,
        },
        updateCart,
        user?._id // ✅ Truyền userId từ Redux
      );
      alert("✅ Thêm vào giỏ hàng thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm vào giỏ hàng.");
    }
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error fetching product</div>;

  return (
    <PageWrapper>
      <div className="p-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="bg-gray-100 p-4 w-full rounded"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl">${product.price?.toFixed(2)}</p>

          <div>
            <h3 className="mb-2">Color</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 rounded-full capitalize ${
                    selectedColor === color
                      ? "bg-primary text-white"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`border border-gray-300 p-2 text-center rounded-full ${
                    selectedSize === size ? "border-primary bg-primary text-white" : ""
                  } hover:border-primary hover:bg-primary hover:text-white transition`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="w-1/4">
            <h3 className="mb-2">Qty</h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full border border-gray-300 p-2 rounded-full text-center"
            />
          </div>

          <button
            className="bg-primary text-white py-3 w-full rounded-full font-semibold text-lg shadow hover:bg-green-800 transition"
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
