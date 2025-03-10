---

# **Mebius E-Commerce Website**  
🚀 **Seamless Online Shopping Experience**  

## **📌 Overview**  
Mebius is a **full-fledged e-commerce platform** built using the **MERN stack**. It provides a **streamlined user interface, robust REST APIs, secure authentication, and an integrated payment gateway**, ensuring a smooth and secure shopping experience for customers.  

## **🔹 Features**  
✅ **User-friendly UI** – Clean and intuitive interface for easy navigation  
✅ **Secure Authentication** – Clerk Auth for user sign-up, login, and role-based access  
✅ **Product Management** – Add, edit, and delete products with images and details  
✅ **Shopping Cart** – Add, remove, and update cart items dynamically  
✅ **Checkout & Payment** – Secure payment processing using Stripe  
✅ **Order History** – Track past purchases and order status updates  
✅ **RESTful APIs** – Efficient backend services for seamless data flow  
✅ **Admin Dashboard** – Manage products, orders, and user roles  

## **🛠️ Tech Stack**  
- **Frontend:** React.js, Redux, JavaScript, Tailwind CSS  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB  
- **Authentication:** Clerk Auth  
- **Payment Gateway:** Stripe  
- **State Management:** Redux  
- **Other Tools:** Postman (API testing), GitHub, Vercel, Render (Deployment)  

## **🔧 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/VenuraDenethpriya/mebius-ecommerce.git
cd mebius-ecommerce
```

### **2️⃣ Install Dependencies**  

#### **Backend Setup**  
```bash
cd Backend
npm install
```

#### **Frontend Setup**  
```bash
cd ../Frontend
npm install
```

### **3️⃣ Configure Environment Variables**  
Create a `.env` file in the **backend** folder and add the following:  
```
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_auth_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### **4️⃣ Run the Application**  

#### **Start Backend**  
```bash
cd Backend
npm run dev
```

#### **Start Frontend**  
```bash
cd Frontend
npm run dev
```

## **🚀 Deployment**  
- **Frontend Deployment:** Vercel  
- **Backend Deployment:** Render

## **🛡️ Security Measures**
🔹 **Role-Based Access Control (RBAC)** – Admin and user roles  
🔹 **Data Validation with Zod** – Prevent invalid inputs  
🔹 **Payment Security** – Stripe encryption for transactions  

## **📜 API Endpoints**  

| Method | Endpoint | Description |
|--------|----------|------------|
| **POST** | `/api/products` | Add a new product (Admin) |
| **GET** | `/api/products` | Fetch all products |
| **GET** | `/api/products/:id` | Get product details |
| **PUT** | `/api/products/:id` | Update product details (Admin) |
| **DELETE** | `/api/products/:id` | Delete a product (Admin) |
| **POST** | `/api/auth/signup` | User registration |
| **POST** | `/api/auth/login` | User login |
| **POST** | `/api/orders` | Place an order |
| **GET** | `/api/orders/:id` | Fetch order details |
| **PUT** | `/api/orders/:id/status` | Update order status (Admin) |


## **📬 Contact**  
📩 **Venura Denethpriya**  
📧 [venurameedum@gmail.com](mailto:venurameedum@gmail.com)  
🌍 **Portfolio:** [venuraportfolio.vercel.app](https://venuraportfolio.vercel.app/)  
🔗 **LinkedIn:** [linkedin.com/in/venuradenethpriya](https://www.linkedin.com/in/venuradenethpriya/)  

---
