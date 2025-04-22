import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PageWrapper from "../components/PageWrapper";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axiosInstance.get(`/api/products/${id}`);
      setProduct(res.data);
    };
    fetchDetail();
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <PageWrapper>
    <div className="p-10 flex flex-col md:flex-row gap-10">
      <img src={product.image} alt={product.name} className="w-full md:w-[400px] rounded shadow" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">Brand: {product.brand}</p>
        <p className="text-gray-600">Color: {product.color}</p>
        <p className="text-lg text-green-700 font-semibold">${product.price}</p>
        <p className="text-gray-800">{product.description}</p>
        <p>Available Sizes: {product.size.join(", ")}</p>
        <p>Stock: {product.stock}</p>
        {/* Add to cart button can go here */}
      </div>
    </div>
    </PageWrapper>
  );
};

export default ProductDetail;
