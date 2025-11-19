# 🔹 Chemindex API

A free API-driven system for managing chemical reagents and user access, designed to streamline inventory management in resource-constrained Science laboratories in South America. Built with **Node.js**, **Express**, and **MongoDB**, ChemIndex offers a modular and fully documentated role-based authenticated system access control (**Swagger**).

---

## Table of Contents

- [Main Features](#-features)
- [Technologies](#️-technologies)
- [Getting Started](#-getting-started)
- [API Documentation (Swagger UI)](#-api-documentation-swagger-ui)

---

## Main Features

- JWT-based authentication and routes protection.
- Role-based access control (admin & user).
- CRUD operations for chemical reagents and users manegement.
- Admin capabilities for managing users and reagents.
- Input sanitization and validation.
- Security policies: rigid CSP and CSRF protection.
- Modular and interactive API documentation via Swagger UI.

---

## Note on Legacy Frontend Files

The remote repository includes `views`, `HTML`, and `CSS` files, which are no longer actively used in the backend. These files represent the initial frontend implementation (using view enginer) and are retained for historical reference, showcasing the project's early development. The corresponding frontend was developed separately using **React** and **Vite** and will be hosted on a distinct domain.

## Technologies Used

- **Node.js** + **Express.js** for backend.
- **MongoDB** for NoSQL database with **mongoose** as ODM.
- **JWT** (JSON Web Token) for secure authentication.
- **Swagger UI + YAML** for API documentation.
- **Jest** for unit and integration tests.
- **Docker** + **DockerHub** for containerization.
- **GitHub Actions** for CI/CD pipeline.
- **Custom middlewares** for security, input sanitation,
  and access control.
- **SonarQube** and **Snyk** as SAST.

---

## Getting Started

## Prerequisites

- Node.js (>= 18.x)
- MongoDB (or local MongoDB instance)
- Docker (optional for containerized deployment)

## Clone the repository and install dependencies

```bash
git clone https://github.com/devdartjs/chemindex.git
cd chemindex
npm install
```

## Run locally in containers (development mode)

```bash
docker compose --profile dev up --build -d
```

## Run tests

```bash
docker compose --profile stage up --build -d
npm run test:coverage
```

## API Documentation (Swagger UI)

Access the Swagger UI to explore and test the API:

UI Interface: http://localhost:3000/api-docs
Raw YAML: http://localhost:3000/api-docs/swagger.yaml
Bundled YAML: http://localhost:3000/api-docs/swagger-bundle.yaml

---
