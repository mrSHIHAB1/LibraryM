# 📚 Minimal Library Management System (Frontend)

A clean, responsive React frontend for managing a library — view, add, edit, delete, and borrow books seamlessly with a modern UI and smooth user experience.

---

## 🚀 Features

- Display a list of books with details (title, author, genre, ISBN, copies, availability)
- Add new books with a simple form
- Edit existing book details
- Delete books with confirmation prompts
- Borrow books with dedicated borrow actions
- Real-time UI updates using Redux Toolkit Query cache invalidation
- Loading spinners and error handling states
- Responsive design for all device sizes (mobile/tablet/desktop)
- Toast notifications for success and error feedback
- Fully typed with TypeScript for reliability and maintainability
- Built with React 18, React Router v6, Redux Toolkit Query, and Tailwind CSS

---

## 🛠️ Tech Stack

- React 18
- Redux Toolkit & Redux Toolkit Query
- React Router v6
- Tailwind CSS
- TypeScript
- React Toastify for notifications
- Axios (via fetchBaseQuery in RTK Query)

---
# 📚 Minimal Library Management System (Backend API)

A RESTful API backend for managing books and borrow operations in a library system. Provides endpoints to create, read, update, delete, and borrow books, designed for smooth integration with a React frontend.

---

## 🚀 Features

- CRUD operations for Books:
  - Create new books with details like title, author, genre, ISBN, copies, description, and availability
  - Retrieve all books or specific book by ID
  - Update book details
  - Delete books
- Borrowing functionality:
  - Borrow a book (creates borrow records)
  - View borrow summaries (total quantity borrowed per book)
- Validation and error handling
- JSON responses with consistent API design
- CORS enabled for frontend integration
- Built with Express.js and MongoDB 

---

## 🛠️ Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- dotenv for environment variables
- Cors middleware
- Nodemon for development

---



