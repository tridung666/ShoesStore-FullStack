// Đã có loginUser ở đây...
export const loginUser = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  };
  
  // ➕ Thêm hàm registerUser
  export const registerUser = async (name, username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  };
  