# AI-Powered Full-Stack Developer Portfolio

A personal developer portfolio built to showcase my projects, technical skills, and experience as a junior full-stack web developer.

The application combines a React frontend with a Node.js and Express backend, MySQL database integration, secure administrator authentication, and email notifications.

## Features

- **Responsive portfolio:** Introduction, about, skills, experience, and project sections.
- **Project showcase:** Dedicated project pages with detailed information.
- **Contact form:** Visitors can send messages directly through the portfolio.
- **Email notifications:** New contact submissions trigger Gmail notifications.
- **Admin authentication:** Protected administrator login using JWT and bcrypt.
- **Admin dashboard:** View, search, filter, and manage contact messages.
- **Message management:** Mark messages as read or unread.
- **API protection:** Rate limiting on public contact submissions.

## Technologies Used

### Frontend
- React
- Vite
- React Router
- Axios
- React Icons
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- MySQL2
- JSON Web Tokens (JWT)
- bcryptjs
- Nodemailer
- Express Rate Limit

### Development Tools
- Git and GitHub
- ESLint
- Nodemon
- AI-assisted development tools

## Project Structure

```text
ai-developer-portfolio/
├── public/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

Make sure you have installed:

- Node.js (version 22 or later recommended)
- npm
- MySQL Server

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/tahirou-hama/ai-developer-portfolio.git
cd ai-developer-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root using `.env.example` as your template.

```bash
cp .env.example .env
```

On Windows PowerShell, you can also run:

```powershell
Copy-Item .env.example .env
```

Update the `.env` file with your own database credentials, administrator configuration, and Gmail SMTP credentials.

Never commit your actual `.env` file.

### 4. Configure MySQL

Create a MySQL database named:

```sql
CREATE DATABASE ai_portfolio;
```

Configure the database connection using the environment variables in `.env`.

Make sure the required database tables are created before running the application.

### 5. Start the application

Start the backend:

```bash
npm run server:dev
```

In a separate terminal, start the frontend:

```bash
npm run dev
```

Open the local Vite URL displayed in your terminal, usually:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:5000
```

API health check:

```text
http://localhost:5000/api/health
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the Express backend |
| `npm run server:dev` | Start the backend with Nodemon |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

## Environment Variables

Refer to `.env.example` for the required configuration.

The application uses environment variables for database access, administrator authentication, email notifications, and optional AI integration.

## Future Improvements

- Reconnect the AI assistant when API access is available.
- Add automated backend and frontend tests.
- Improve deployment and production configuration.
- Expand portfolio project demonstrations.

## Author

**Tahirou Moussa Hama**

Junior Full-Stack Web Developer

GitHub: [tahirou-hama](https://github.com/tahirou-hama)

---

This project is part of my ongoing journey in full-stack web development, combining practical software engineering, database management, secure API development, and AI-assisted development workflows.