SHOPEZY 🛒

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application built for learning and development purposes.

---

Overview

SHOPEZY is an online shopping platform that allows users to browse products, search and filter items by category, manage a shopping cart, and securely authenticate using login and registration features.

The application is built using the MERN stack and follows a client-server architecture with a React frontend and a Node.js/Express backend connected to MongoDB.

---

Features

- User Registration & Login
- Product Listing with Images
- Product Search Functionality
- Category-Based Product Filtering
- Add to Cart Functionality
- Cart Item Counter
- Responsive Product Display
- REST API Integration
- MongoDB Database Connectivity

---

Project Structure

```text
SHOPEZY/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

Technologies Used

Frontend
- React.js
- Axios
- JavaScript
- HTML5
- CSS3

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

Tools
- Git
- GitHub


---

Installation

Clone the Repository
```bash
git clone <repository-url>
```

Install Frontend Dependencies
```bash
cd client
npm install
```

Install Backend Dependencies
```bash
cd ../server
npm install
```

---

Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

Run the Application

Start Backend
```bash
cd server
node server.js
```

Start Frontend
```bash
cd client
npm start
```

---

Application URLs

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---

Important Notes

- `.env` is excluded using `.gitignore`
- `node_modules` is not pushed to GitHub
- Clean MERN structure:
  - client → frontend
  - server → backend
- Project is ready for deployment

---

Future Enhancements

- Product Details Page
- Checkout System
- Order Management
- Admin Dashboard
- Payment Gateway Integration
- Reviews & Ratings

---

Author

**Bejjanki Nikhith**

---

License

This project is created for educational and learning purposes.
