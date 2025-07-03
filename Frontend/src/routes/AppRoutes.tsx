import { Routes, Route, Navigate } from 'react-router-dom';
import BookList from '../pages/BookList';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import BorrowBook from '../pages/BorrowBook';
import BorrowSummary from '../pages/BorrowSummary';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/create-book" element={<AddBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
      <Route path="/borrow/:bookId" element={<BorrowBook />} />
      <Route path="/borrow-summary" element={<BorrowSummary />} />
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}
