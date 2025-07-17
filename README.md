# 🧪 Chemindex API

A scalable and secure RESTful API for managing chemical reagents and user access, built with **Node.js**, **Express**, and **MongoDB Atlas**, and fully documented with **OpenAPI 3.0 (Swagger)**.  
Designed for laboratory inventory management with modular architecture and role-based permissions.

---

## 📚 Table of Contents

- [📦 Features](#-features)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Technologies Used](#️-technologies-used)
- [🚀 Getting Started](#-getting-started)
- [📘 API Documentation (Swagger UI)](#-api-documentation-swagger-ui)
- [🐳 Docker Support](#-docker-support)
- [🧩 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📦 Features

- 🔐 JWT-based authentication and route protection
- 🧑‍💼 Role-based access control (admin & user)
- 🧪 CRUD operations for chemical reagents
- 👥 Admin capabilities for managing users and reagents
- 🧼 Input sanitization, validation, and escaping
- 📄 Modular and interactive API documentation via Swagger UI

---

## 🗂️ Project Structure

chemindex/
├── admin/(not commited)
├── config/
├── controllers/
├── database/
├── docs/ # Swagger/OpenAPI documentation
├── mid-admin/
├── mid-clean-inputs/
├── mid-functions/
├── mid-security/
├── models/
├── public/
├── routes/
├── tests/
├── utils/
├── views/
├── vSDLC-Docs/ # SDLC (not commited)
├── app.js
├── jest.config.js
├── package.json
└── README.md

---

## ⚙️ Technologies Used

- **Node.js** + **Express.js**
- **MongoDB Atlas** for cloud-hosted NoSQL database
- **JWT** (JSON Web Token) for secure authentication
- **Swagger UI + YAML** for API documentation
- **Jest** for unit testing
- **Docker** + **DockerHub** for containerization and deployment
- **GitHub Actions** for CI/CD
- **Custom middleware** for security, input sanitation, and access control

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (>= 18.x)
- MongoDB Atlas account (or local MongoDB instance)
- Docker (optional for containerized deployment)

### 📥 Clone the repository

```bash
git clone https://github.com/your-username/chemindex.git
cd chemindex
```

### Install dependencies

```bash
npm install
```

### Run locally in development mode

```bash
npm run dev
```

### API Documentation (Swagger UI)

Access the Swagger UI to explore and test the API:

UI Interface: http://localhost:3000/api-docs
Raw YAML: http://localhost:3000/api-docs/swagger.yaml
Bundled YAML: http://localhost:3000/api-docs/swagger-bundle.yaml

### Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests for new features, bug fixes, or improvements.

Fork the project
Create a feature branch (git checkout -b feature/my-feature)
Commit your changes (git commit -m 'feat: add new feature')
Push to the branch (git push origin feature/my-feature)

Open a Pull Request

### 📄 License

This project is licensed under the MIT License.

```

```
