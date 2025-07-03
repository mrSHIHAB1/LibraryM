import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/books" className="hover:text-gray-300">All Books</Link>
        <Link to="/create-book" className="hover:text-gray-300">Add Book</Link>
        <Link to="/borrow-summary" className="hover:text-gray-300">Borrow Summary</Link>
      </div>
    </nav>
  );
}
