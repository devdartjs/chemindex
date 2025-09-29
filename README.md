# ⚪ Chemindex API

A scalable and secure RESTful API for managing chemical reagents and user access, built with **Node.js**, **Express**, and **MongoDB Atlas**, and fully documented with **OpenAPI 3.0 (Swagger)**.  
Designed for laboratory inventory management with modular architecture and role-based permissions.

---

## 🔵 Table of Contents

- [📦 Features](#-features)
- [⚙️ Technologies Used](#️-technologies-used)
- [🧑‍💼 Getting Started](#-getting-started)
- [📘 API Documentation (Swagger UI)](#-api-documentation-swagger-ui)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🗂️ Project Structure](#️-project-structure)

---

## 🟠 Features

- 🔐 JWT-based authentication and route protection
- 🧑‍💼 Role-based access control (admin & user)
- ⚙️ CRUD operations for chemical reagents
- 👥 Admin capabilities for managing users and reagents
- 🧼 Input sanitization, validation, and escaping
- 📄 Modular and interactive API documentation via Swagger UI

---

## 🟡 Technologies Used

- **Node.js** + **Express.js**
- **MongoDB Atlas** for cloud-hosted NoSQL database
- **JWT** (JSON Web Token) for secure authentication
- **Swagger UI + YAML** for API documentation
- **Jest** for unit testing
- **Docker** + **DockerHub** for containerization and deployment
- **GitHub Actions** for CI/CD
- **Custom middleware** for security, input sanitation, and access control

---

## 🟣 Getting Started

## 🟡 Prerequisites

- Node.js (>= 18.x)
- MongoDB Atlas account (or local MongoDB instance)
- Docker (optional for containerized deployment)

## ⚪ Clone the repository

```bash
git clone https://github.com/your-username/chemindex.git
cd chemindex
```

## Install dependencies

```bash
npm install
```

## Run locally in development mode

```bash
npm run dev
```

## 🟤 API Documentation (Swagger UI)

Access the Swagger UI to explore and test the API:

UI Interface: http://localhost:3000/api-docs
Raw YAML: http://localhost:3000/api-docs/swagger.yaml
Bundled YAML: http://localhost:3000/api-docs/swagger-bundle.yaml

---

## ⚪ Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests for new features, bug fixes, or improvements.

Fork the project
Create a feature branch (git checkout -b feature/my-feature)
Commit your changes (git commit -m 'feat: add new feature')
Push to the branch (git push origin feature/my-feature)

Open a Pull Request

---

## ⚪ License

This project is licensed under the MIT License.

---

## 🟢 Project Structure

```bash

indexchem/
├── .env.development.local
├── .env.production.local
├── .gitattributes
├── .github/
│ └── workflows/
│ └── ci.yml
├── .gitignore
├── admin/
│ └── sign-up-admin.js
├── app.js
├── build.js
├── config/
│ ├── config.arcjet.js
│ └── config.env.js
├── controllers/
│ ├── reagents.controller.js
│ ├── users.auth.controller.js
│ ├── users.controller.js
│ └── admin/
│ ├── admin.controllers.js
│ ├── reagents.admin.controllers.js
│ └── users.admin.controllers.js
├── coverage/
│ └── lcov-report/ (HTML test coverage output)
├── database/
│ └── mongodb.js
├── docs/ # Swagger/OpenAPI documentation
│ ├── swagger.yaml
│ ├── swagger-bundle.yaml
│ ├── components/
│ │ └── security.yaml
│ └── paths/
│ ├── AdminRoutes.yaml
│ ├── ReagentsAdminRoutes.yaml
│ ├── ReagentsRoutes.yaml
│ ├── ReagentsStateRoutes.yaml
│ ├── UserAdminRoutes.yaml
│ ├── UsersAuthRoutes.yaml
│ └── UsersRoutes.yaml
├── fly.toml
├── jest.config.js
├── mid-admin/
│ └── permission.admin.js
├── mid-clean-inputs/
│ ├── escape/
│ │ ├── reagent.escape.js
│ │ └── user.escape.js
│ ├── sanitize/
│ │ ├── reagent.sanitize.js
│ │ └── user.sanitize.js
│ └── validate/
│ ├── reagents.validate.js
│ ├── schemas.validate.js
│ └── users.validate.js
├── mid-functions/
│ ├── creat.token.js
│ ├── error.handler.js
│ ├── permission.admin.js
│ └── redirectIfLoggedIn.js
├── mid-security/
│ ├── arcjet.middleware.js
│ ├── corp.middleware.js
│ ├── csp.middlewares.js
│ ├── csrf.create.token.js
│ ├── csrf.error.handler.js
│ └── users.authentication.js
├── models/
│ ├── reagents.model.js
│ └── user.model.js
├── package.json
├── package-lock.json
├── public/
│ ├── css/
│ │ ├── components/
│ │ │ └── button.css
│ │ ├── index.css
│ │ ├── login-signup/
│ │ │ ├── login.css
│ │ │ └── sign-up.css
│ │ ├── nav-hero-footer/
│ │ │ ├── footer.css
│ │ │ ├── hero.css
│ │ │ └── nav.css
│ │ ├── premium-form/
│ │ │ └── waiting-list.css
│ │ └── user-system/
│ │ ├── dashboard.css
│ │ ├── register.css
│ │ ├── search-update.css
│ │ └── system.css
│ └── images/
│ ├── ci.webp
│ ├── erlem.svg
│ ├── file.svg
│ ├── search-icon.svg
│ └── search-icon2.svg
├── README.md
├── route.csurf/
│ └── csurf.token.js
├── routes/
│ ├── reagents.routes.js
│ ├── reagents.state.routes.js
│ ├── users.auth.routes.js
│ ├── users.routes.js
│ └── admin/
│ ├── admin.routes.js
│ ├── reagents.admin.routes.js
│ └── users.admin.routes.js
├── swagger.js
├── tests/
│ ├── mid-functions/
│ │ └── error.handler.test.js
│ └── utils/
│ └── create.nonce.test.js
├── utils/
│ └── create-nonce.js
└── views/
├── 404.ejs
├── admin/
│ └── adminPage.ejs
├── dashboard-reagents.ejs
├── home.ejs
├── login.ejs
├── partials/
│ ├── footer.ejs
│ ├── head.ejs
│ └── navbar.ejs
├── register.ejs
├── search-update.ejs
├── sign-up.ejs
├── user-system.ejs
└── waiting-list.ejs

```

---

```

```
