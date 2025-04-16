// services/admin.js

// API để lấy danh sách người dùng
export const fetchUsers = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (err) {
      throw new Error("Error fetching users: " + err.message);
    }
  };
  
  // API để xoá người dùng
  export const deleteUser = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return await response.json();
    } catch (err) {
      throw new Error("Error deleting user: " + err.message);
    }
  };
  