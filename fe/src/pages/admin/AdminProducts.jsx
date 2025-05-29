import { useState } from 'react';
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from '../../redux/apis/productApi.jsx';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaUsers, FaClipboardList } from "react-icons/fa";
import { toast } from 'react-toastify';

const ProductManager = () => {
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Lưu file ảnh upload (File object)
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    size: '',
    color: '',
    price: '',
    description: '',
    stock: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Xử lý chọn file ảnh
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      ...product,
      size: product.size.join(', '),
      color: Array.isArray(product.color) ? product.color.join(', ') : product.color,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || ''
    });
    setImageFile(null); // reset file khi edit
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Xoá sản phẩm thành công!");
    } catch {
      toast.error("Lỗi khi xoá sản phẩm");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = new FormData();
  payload.append('name', formData.name);
  payload.append('brand', formData.brand);
  payload.append('size', formData.size.split(',').map(s => s.trim()).join(',')); // backend parse
  payload.append('color', formData.color.split(',').map(c => c.trim()).join(','));
  payload.append('price', Number(formData.price));
  payload.append('stock', Number(formData.stock));
  payload.append('description', formData.description);

  if (imageFile) {
    payload.append('image', imageFile);
  }

  try {
    if (editingId) {
      // Truyền 1 object {id, formData} đúng như api slice đã chỉnh
      await updateProduct({ id: editingId, formData: payload }).unwrap();
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      await createProduct(payload).unwrap();
      toast.success("Tạo sản phẩm mới thành công!");
    }
    setFormData({ name: '', brand: '', size: '', color: '', price: '', description: '', stock: '' });
    setImageFile(null);
    setEditingId(null);
  } catch {
    toast.error("Lỗi khi lưu sản phẩm");
  }
};


  if (isLoading) return <div className="p-10">Đang tải sản phẩm...</div>;
  if (error) return <div className="p-10 text-red-600">Lỗi tải sản phẩm</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8 drop-shadow">Product Management</h1>

        {/* Menu admin */}
        <div className="flex justify-center space-x-6 mb-10">
          <button onClick={() => navigate('/admin/account')} className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-primary hover:text-white transition">
            <FaUsers /> User Management
          </button>
          <button onClick={() => navigate('/admin/orders')} className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-primary hover:text-white transition">
            <FaClipboardList /> Order Management
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto space-y-4 border border-green-100" encType="multipart/form-data">
          <h2 className="text-2xl font-bold text-green-600 mb-2">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
            <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand (Nike, Adidas, Vans)" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
            <input name="size" value={formData.size} onChange={handleChange} placeholder="Sizes (e.g. 38, 39, 40)" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
            <input name="color" value={formData.color} onChange={handleChange} placeholder="Colors (e.g. Red, Blue, Black)" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
            <input name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
            <input type="file" onChange={handleImageChange} accept="image/*" className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary md:col-span-2" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary md:col-span-2" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-primary hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition">
              {editingId ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h2 className="text-xl font-bold text-green-600 mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-green-100 text-green-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-green-50 transition">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.brand}</td>
                    <td className="p-3">${p.price}</td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => handleEdit(p)} className="p-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white transition" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 rounded-full bg-red-500 hover:bg-red-700 text-white transition" title="Delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-gray-400">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
