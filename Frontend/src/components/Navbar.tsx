import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'All Books', path: '/books' },
    { name: 'Add Book', path: '/create-book' },
    { name: 'Borrow Summary', path: '/borrow-summary' },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-700 to-gray-800
 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">📚 Library</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-gray-200 transition duration-200 ${
                location.pathname === item.path ? 'border-b-2 border-white' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
