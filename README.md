# 🎉 **J97 Store - Shoe E-commerce Web App** 👟

---

## 🛠️ **Full Usage Guide**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/j97-store.git
cd j97-store
```

---

### 2️⃣ Environment Setup

Before running the project, you need to configure environment variables for both backend and frontend.

#### 🗄️ **Backend (`be/.env`)**

Create a `.env` file in the `be` folder (you can copy from `.env.example` if available) and fill in the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_BASE_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
> ⚠️ **Note:** Replace the example values with your actual credentials.

#### 💻 **Frontend (`fe/.env`)**

Create a `.env` file in the `fe` folder and set the backend API endpoint:

```env
VITE_API_BASE_URL=http://localhost:5000
```
> ⚠️ **Note:** Make sure this URL matches your backend server address.

---

### 3️⃣ Install Dependencies & Run

#### 🗄️ Backend

```bash
cd be
npm install
npm start
```
> The backend server will run on `http://localhost:5000` by default.

#### 💻 Frontend

Open a new terminal window/tab:

```bash
cd fe
npm install
npm run dev
```
> The frontend will run on `http://localhost:5173` by default.

---

### 4️⃣ Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

### 5️⃣ Default Accounts

- **Admin/User accounts:** You may need to register a new account or seed the database depending on your backend implementation.

---

### 6️⃣ Additional Notes

- ✅ Make sure **MongoDB** is running and accessible from your backend.
- ✅ For image upload and chatbot features, ensure your **Cloudinary** and **Gemini API** credentials are valid.
- ✅ If deploying, update environment variables accordingly.

---

## 🚀 **Technologies Used**

- **Frontend:** React, Vite, Redux Toolkit, TailwindCSS, React Router, React Toastify
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary, Google Gemini API (chatbot)
- **Others:** Cloudinary (image upload), dotenv, morgan, cors

---

## ⚙️ **Environment & Configuration**

- `be/.env`: MongoDB URI, JWT secret, Cloudinary, Gemini API key, FRONTEND_BASE_URL
- `fe/.env`: VITE_API_BASE_URL (backend address)

---

## 🤝 **Contribution**

Pull requests and issues are always welcome!

---

© 2024 J97 Store