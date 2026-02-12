# CRUD_PROJECT

A full-stack CRUD application for managing contacts with authentication, built using **React.js**, **Node.js**, **Express**, and **PostgreSQL**.  
This project demonstrates a complete workflow from user registration/login to secure CRUD operations on contacts.

---

## **Features**

- User registration and login with **JWT authentication**
- Add, edit, delete, and view contacts
- Protected routes with token-based authentication
- Responsive UI built with **Tailwind CSS**
- API integration with frontend
- Persistent data storage using **PostgreSQL**

---

## **Tech Stack & Dependencies**

### **Frontend**
- React.js
- React Router DOM (`react-router-dom`)
- Tailwind CSS
- Fetch API for HTTP requests

##**dotenv**
PORT=5001
DATABASE_URL=postgresql://<DB_USERNAME>:<DB_PASSWORD>@localhost:5432/<DB_NAME>
JWT_SECRET=<YOUR_SECRET_KEY>


**Frontend Packages (package.json)**:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "tailwindcss": "^3.3.3"
  },
  "devDependencies": {
    "vite": "^4.5.0"
  }
}



