# 🧪 Chemindex API

A RESTful API for managing chemical reagents, user accounts, and administrative access — built with **Node.js**, **Express**, **mongoDB** and documented using **OpenAPI 3.0 (Swagger)**.

---

## 📌 Features

- 🔐 Secure authentication using JWT tokens
- 👥 Role-based access for users and administrators
- 🧪 Reagent creation, retrieval, update, and deletion
- 📊 Admin tools for managing users and all reagents in the system
- 📄 Swagger UI for complete and modular API documentation
- 🧼 Sanitization, validation, and escaping of all inputs

---

## 📂 Project Structure

chemindex/
.
├── README.md  
├── package.json  
├── app.js  
├── admin/  
├── controllers/  
├── config/  
├── database/  
├── docs/  
├── jest.config.js  
├── mid-admin/  
├── mid-clean-inputs/  
├── mid-functions/  
├── mid-security/  
├── models/  
├── public/  
├── route.csurf  
├── routes/  
├── tests/  
├── utils/  
├── views/  
└── vSDLC-Docs/

---

## 🛠️ Technologies Used

- **HTML + CSS + Vanilla JS**
- **Node.js + Express**
- **JSON Web Token (JWT)** for authentication
- **YAML + Swagger UI** for API documentation
- **Custom validators & sanitizers** for inputs
- **MongoDB Atlas** for persistent data storage
- **Jest** for unit testing
- **Git + GitHub + GitHub Actions** for version control and CI/CD pipeline
- **Docker + DockerHub** for containerized deployment and images version control

---

## 🚀 Getting Started

### 1. Clone the repository

### 2. Install dependencies

### 3. Run app locally

```bash
git clone https://github.com/your-username/chemindex.git
cd chemindex
npm install
npm run dev
```

📘 API Documentation (Swagger UI)
You can view and test all routes using the Swagger UI interface:

🧭 URL: http://localhost:3000/api-docs
📝 API Documentation: http://localhost:3000/api-docs/swagger.yaml
📊 Swagger Bundle: http://localhost:3000/api-docs/swagger-bundle.yaml

📄 License
This project is licensed under the MIT License.
