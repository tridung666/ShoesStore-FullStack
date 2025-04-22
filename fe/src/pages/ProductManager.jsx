import { useState } from 'react';
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from '../redux/apis/productApi.jsx';
import { useNavigate } from 'react-router-dom';
import PageWrapper from "../components/PageWrapper";


const ProductManager = () => {
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    size: '',
    color: '',
    price: '',
    description: '',
    image: '',
    stock: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      ...product,
      size: product.size.join(', ')
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
    } catch {
      alert("Lỗi khi xoá sản phẩm");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      size: formData.size.split(',').map(s => Number(s.trim())),
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    try {
      if (editingId) {
        await updateProduct({ id: editingId, ...payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      setFormData({ name: '', brand: '', size: '', color: '', price: '', description: '', image: '', stock: '' });
      setEditingId(null);
    } catch {
      alert("Lỗi khi lưu sản phẩm");
    }
  };

  if (isLoading) return <div className="p-10">Đang tải sản phẩm...</div>;
  if (error) return <div className="p-10 text-red-600">Lỗi tải sản phẩm</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Product Management</h1>

      {/* Menu admin */}
      <div className="flex space-x-6 mb-8 border-b pb-3">
        <button onClick={() => navigate('/admin')} className="text-blue-600 font-semibold hover:underline">User Management</button>
        <button onClick={() => navigate('/admin/products')} className="text-blue-600 font-semibold hover:underline">Product Management</button>
        <button onClick={() => navigate('/admin/orders')} className="text-blue-600 font-semibold hover:underline">Order Management</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 w-full" />
        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand (Nike, Adidas, Vans)" required className="border p-2 w-full" />
        <input name="size" value={formData.size} onChange={handleChange} placeholder="Sizes (e.g. 38, 39, 40)" required className="border p-2 w-full" />
        <input name="color" value={formData.color} onChange={handleChange} placeholder="Color" required className="border p-2 w-full" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="border p-2 w-full" />
        <input name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="border p-2 w-full" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required className="border p-2 w-full" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          {editingId ? 'Update' : 'Add'} Product
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.brand}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-blue-500 text-white">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
