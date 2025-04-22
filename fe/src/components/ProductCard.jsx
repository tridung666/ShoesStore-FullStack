import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../redux/actions/cartActions";

const ProductCard = ({ _id, name, color, price, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCardClick = (e) => {
    if (e.target.tagName.toLowerCase() !== "button") {
      navigate(`/product/${_id}`);
    }
  };

  return (
    <div
      onClick={onCardClick}
      className="bg-white p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{color}</p>
      <p className="text-lg text-black">${price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(dispatch, { _id, name, price, image });
        }}
        className="w-full bg-gray-100 text-black py-2 mt-4 rounded-lg hover:bg-gray-300"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
