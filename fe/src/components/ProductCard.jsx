import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ _id, name, color, price, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={onCardClick}
      className="group bg-white p-4 border border-gray-100 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col items-center"
    >
      <div className="w-full h-48 mb-4 rounded-xl overflow-hidden flex items-center justify-center bg-white">
  <img
    src={image}
    alt={name}
    className="object-contain h-full transition-transform duration-300 group-hover:scale-105"
  />
</div>

      <h3 className="text-lg font-bold text-primary mb-1 text-center group-hover:text-primary transition">{name}</h3>
      <p className="text-sm text-gray-500 mb-2 text-center">{color}</p>
      <p className="text-xl font-semibold text-primary mb-2 text-center">${price}</p>
      <span className="inline-block px-4 py-1 bg-green-100 text-primary rounded-full text-xs font-medium shadow-sm mt-auto opacity-0 group-hover:opacity-100 transition">
        Xem chi tiết
      </span>
    </div>
  );
};

export default ProductCard;
