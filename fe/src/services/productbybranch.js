export const fetchProductsByBrand = async (brand) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/brand/${brand}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch products by brand: " + error.message);
    }
  };
  