import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../redux/apis/productApi";
import { handleAddToCart } from "../redux/actions/cartActions";
import { useUpdateCartMutation } from "../redux/apis/cartApi";
import PageWrapper from "../components/PageWrapper";
import {
  useGetReviewsByProductQuery,
  useCreateReviewMutation,
} from "../redux/apis/reviewApi";
import { toast } from "react-toastify";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl select-none ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          role="button"
          aria-label={`${star} star`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  const [updateCart] = useUpdateCartMutation();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // State for review
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // Fetch product reviews
  const {
    data: reviews = [],
    refetch: refetchReviews,
    isLoading: isLoadingReviews,
  } = useGetReviewsByProductQuery(id);

  const [createReview, { isLoading: isCreatingReview }] = useCreateReviewMutation();

  const sizes = product?.size || [];
  const colors = product?.color || [];

  const handleAddToCartClick = async () => {
    if (!selectedSize) return toast.error("Please select a size!");
    if (!selectedColor) return toast.error("Please select a color!");
    if (!product) return toast.error("Product is not ready!");

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
        user?._id
      );
      toast.success("Added to cart successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding to cart.");
    }
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    if (!user) return toast.error("You need to log in to review!");
    if (!product || !product._id) return toast.error("Product not selected or loading!");
    if (!reviewText.trim()) return toast.error("Please enter your review!");

    try {
      await createReview({
        product: product._id,
        rating: reviewRating,
        comment: reviewText,
      }).unwrap();

      setReviewText("");
      setReviewRating(0);
      refetchReviews();
      toast.success("Review submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit review!");
    }
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error fetching product</div>;

  return (
    <PageWrapper>
      <div className="p-10 flex flex-col md:flex-row gap-6"> {/* giảm gap từ 10 xuống 6 */}
  {/* Left: Description */}
  <div className="w-full md:w-1/3 flex flex-col justify-center px-4"> {/* tăng width lên 1/3 */}
    <h2 className="text-2xl font-bold mb-4">Product Description</h2>
    <p className="text-base text-gray-700 leading-relaxed">{product.description}</p> {/* tăng line-height */}
  </div>

  {/* Center: Image */}
  <div className="w-full md:w-1/3 flex items-center justify-center px-4"> {/* width 1/3 */}
    <img
      src={product.image}
      alt={product.name}
      className="max-h-[400px] object-contain rounded border border-gray-300 p-2 shadow-lg"
    />
  </div>

  {/* Right: Options */}
  <div className="w-full md:w-1/3 flex flex-col gap-4 px-4"> {/* width 1/3 */}
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <p className="text-2xl">${product.price?.toFixed(2)}</p>

    {/* Color */}
    <div>
      <h3 className="mb-2">Color</h3>
      <div className="flex gap-2 flex-wrap">
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

    {/* Size */}
    <div>
      <h3 className="mb-2">Size</h3>
      <div className="grid grid-cols-5 gap-2"> {/* tăng số cột size lên 5 */}
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

    {/* Quantity */}
    <div className="w-1/3">
      <h3 className="mb-2">Qty</h3>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") {
            setQuantity("");
          } else {
            const num = Number(val);
            if (!isNaN(num) && num > 0) setQuantity(num);
          }
        }}
        onBlur={() => {
          if (quantity === "" || quantity < 1) setQuantity(1);
        }}
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


      {/* --- Review Section --- */}
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
        {isLoadingReviews ? (
          <div>Loading reviews...</div>
        ) : (
          <div>
            {reviews.length === 0 && <div>No reviews yet.</div>}
            {reviews.map((rv) => (
              <div key={rv._id} className="border-b py-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{rv.user?.name || "User"}</span>
                  <span className="text-yellow-500">
                    {"★".repeat(rv.rating)}{"☆".repeat(5 - rv.rating)}
                  </span>
                </div>
                <div>{rv.comment}</div>
                <div className="text-xs text-gray-400">{new Date(rv.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

        {user && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Write your review</h3>
            <div className="flex items-center gap-2 mb-2">
              <span>Rating:</span>
              <StarRating rating={reviewRating} setRating={setReviewRating} />
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full border rounded p-2 mb-2"
              rows={3}
              placeholder="Write your review..."
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={handleSubmitReview}
              disabled={isCreatingReview}
            >
              {isCreatingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
        {!user && <div className="mt-4 text-gray-500">You need to log in to submit a review.</div>}
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
