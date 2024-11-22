# Service Center - README

## Overview
The Service Center is a part of a multi-functional project designed to deliver seamless services through a robust backend, admin dashboard, and mobile application. This service is built using Laravel and integrates modern DevOps practices for efficient deployment and management.

---
## Pre-Requisites

Ensure you have the following installed:

Node.js v18 or higher

Yarn or npm (for dependency management)

Docker (for containerization)

PostgreSQL database

GitHub CLI (optional, for managing CI pipelines)


---
## Features
- Built on **Laravel Framework**.
- Uses **Prisma** as the ORM for database operations.
- Includes **Node.js** for running scripts and managing assets.
- Designed with **Next.js** for efficient UI rendering.
- Follows a microservices architecture with a focus on modularity.
- Implements **GitHub Actions** for CI/CD workflows.
- Uses **Docker** for containerization and **Kubernetes** for orchestration.
- Provides enhanced user management via an admin dashboard.

---

## Architecture
### Components:
1. **Service Center Backend** (Laravel):
   - Core business logic and API endpoints.
2. **Admin Dashboard** (Laravel):
   - Manage users, track activities, and configure settings.
3. **Mobile Application** (Flutter):
   - User-friendly interface for end-users.
4. **Database Management**:
   - Powered by Prisma ORM for efficient database operations.

### DevOps Pipeline:
- **Continuous Integration** with GitHub Actions:
  - Builds and tests the application.
  - Pushes Docker images to **Docker Hub**.
- **Continuous Deployment**:
  - Transfers Docker images to **Amazon ECR**.
  - Deploys services to **Amazon EKS**.

---

## Docker Configuration
### Base Image
- Uses `node:18-alpine` for minimal image size and performance.

### Key Steps in the Dockerfile:
1. **Install Dependencies**:
   - Installs necessary Node.js libraries and Prisma CLI.
2. **Copy Files**:
   - Includes all essential files such as:
     - `node_modules`
     - `package.json`
     - `public` folder (for assets).
     - `prisma` directory (for ORM schema and migrations).
3. **Build Application**:
   - Executes `yarn build` or `npm run build` for production-ready builds.
4. **Runtime Image**:
   - Minimizes runtime footprint by copying only the required files.
   - Ensures secure, non-root user execution.

---

## Prisma Integration
- **Prisma Client Generation**:
  - Automatically generated during the build process using `npx prisma generate`.
- **Schema Inclusion**:
  - Prisma schema is included to manage database migrations and configurations.
- **Optional Database Migration**:
  - Can apply migrations during runtime using `npx prisma migrate deploy` (if needed).

---

## Deployment
### CI/CD Workflow
- **GitHub Actions**:
  - Automates the build, test, and deployment process.
  - Pushes Docker images to a repository (Docker Hub/ECR).

### Kubernetes Orchestration
- **EKS Cluster**:
  - Manages containerized services.
- **Ingress Controller**:
  - Provides external access to the services.
- **Helm Charts**:
  - Simplifies Kubernetes resource management.

---

## Local Development
### Prerequisites
- **Node.js** (v18 or higher)
- **Docker** (latest version)
- **Prisma CLI** (installed globally)

### Steps:
1. Clone the repository.
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Start the development server:
   ```bash
   yarn dev
   ```
5. Run database migrations (if necessary):
   ```bash
   npx prisma migrate dev
   ```

---

## Project Goals
1. Modular design for easy scalability.
2. Efficient CI/CD pipeline for rapid iteration.
3. Comprehensive ORM for seamless database management.
4. Secure and performance-optimized deployments.

---

## Contributors
- **DevOps Team**: Managed CI/CD pipelines and Kubernetes deployments.
- **Backend Developers**: Developed Laravel APIs and Prisma integrations.
- **Frontend Developers**: Built the Next.js and Flutter interfaces.

---

For further information or issues, feel free to reach out to the team or raise an issue on the GitHub repository.

