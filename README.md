# 📚 Online Book Store

An **Online Book Store** web application designed to provide a simple and convenient platform for browsing and managing books online. The project provides a structured backend API for managing book/product information and is designed to support the development of both customer and administrator interfaces.

## 📌 Project Overview

The Online Book Store aims to simplify the process of discovering and managing books through a web-based application.

Users can browse available books and view information such as:

* 📖 Book title
* 📝 Book description
* 💰 Price
* 🏷️ Discount
* 📂 Category
* 🖼️ Book cover image

The project also includes a backend REST API developed using **Node.js and Express.js** for handling book/product-related operations.

## 🎯 Objectives

The main objectives of this project are:

1. To develop an easy-to-use online platform for books.
2. To allow users to browse available books and their details.
3. To organize books into different categories.
4. To provide book information through REST APIs.
5. To implement CRUD operations for managing book data.
6. To create a foundation for an administrator and customer-based book store system.

## ✨ Features

### 👤 Customer Side

* Browse available books
* View book details
* View book prices and discounts
* Browse books by category
* View book cover images
* Search and explore available books

### 🔐 Admin Side

The planned administrator functionality can include:

* Add new books
* View existing books
* Update book information
* Delete books
* Manage prices and discounts
* Manage book categories

### ⚙️ Backend

* REST API
* CRUD operations
* Express.js routing
* JSON-based product storage
* API validation
* Modular backend structure

## 🛠️ Technology Stack

| Technology   | Purpose                      |
| ------------ | ---------------------------- |
| HTML         | Web page structure           |
| CSS          | Styling and layout           |
| JavaScript   | Frontend functionality       |
| Node.js      | Backend runtime              |
| Express.js   | REST API development         |
| JSON         | Product/book data storage    |
| MongoDB      | Planned database integration |
| Git & GitHub | Version control              |

> **Note:** The current repository backend uses JSON-based storage. MongoDB can be integrated as the project's database layer as development progresses.

## 🏗️ Project Structure

```text
prototypeBookStore/
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── schema/
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── products.json
│   └── README.md
│
├── http request/
│
└── README.md
```

## 🔄 System Workflow

```text
                ┌──────────────────┐
                │      Customer    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Online Book    │
                │      Store       │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Frontend/UI    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   REST API       │
                │ Express.js       │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Book/Product     │
                │ Data             │
                └──────────────────┘
```

## 📚 Book Data

Each book/product can contain the following information:

```json
{
  "title": "Clean Code",
  "description": "Best practices for writing clean and maintainable software.",
  "price": 899,
  "discount": 2,
  "category": "technology",
  "image": "book-cover-url"
}
```

## 🔌 API Operations

The backend is designed around REST API operations.

| Operation | HTTP Method | Purpose                 |
| --------- | ----------- | ----------------------- |
| Create    | POST        | Add a new book          |
| Read      | GET         | Retrieve books          |
| Update    | PUT/PATCH   | Update book information |
| Delete    | DELETE      | Remove a book           |

These operations provide the basic CRUD functionality required for managing book records.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Naseem-Ansari123/prototypeBookStore.git
```

### 2. Navigate to the Project

```bash
cd prototypeBookStore
```

### 3. Navigate to Backend

```bash
cd backend
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

```bash
node index.js
```

Depending on the project configuration, the server will start on the configured localhost port.

## 🧪 Testing the API

API requests can be tested using tools such as:

* Postman
* Thunder Client
* VS Code REST Client
* Browser for GET requests

Example:

```http
GET /products
```

The API should return the available book/product records.

## 🗃️ Database

The current backend implementation uses a JSON file for storing product information.

The project can be extended by integrating **MongoDB** to provide:

* Persistent database storage
* Better data management
* Scalable book records
* Database queries
* Improved administration
* Customer/order data management

## 🔮 Future Scope

Future versions of the Online Book Store can include:

* 🔐 User registration and login
* 👨‍💼 Admin authentication
* 🛒 Shopping cart
* 💳 Online payment integration
* 📦 Order management
* 🚚 Order tracking
* ⭐ Book ratings and reviews
* 🔍 Advanced book search
* 🏷️ Category and filter system
* ❤️ Wishlist
* 📧 Email notifications
* 📊 Admin dashboard
* 🗄️ Full MongoDB integration
* 📱 Responsive mobile-friendly design

## 👨‍💻 Project Team

**Kuber Yadav**
**Ansari Naseem**

## 👩‍🏫 Guide / Mentor

**Shubhangi Mainkar**

## 🎓 Project Type

**Academic Web Development Project**

### Project Title

**Online Book Store**

## 📄 License

This project is developed for educational and academic purposes.

---

⭐ If you find this project useful, consider giving the repository a star.
