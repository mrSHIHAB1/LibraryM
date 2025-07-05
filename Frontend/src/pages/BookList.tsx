import { useGetBooksQuery, useDeleteBookMutation } from '../controllers/bookController';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BookList() {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap();
        toast.success('Book deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete book!');
      }
    }
  };

  if (isLoading) return <div className="text-center py-10 text-lg">Loading books...</div>;
  if (isError) return <div className="text-center py-10 text-lg text-red-500">Failed to load books.</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">📚 Book List</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gradient-to-r from-slate-700 to-gray-800
 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Genre</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Copies</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Availability</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr key={book._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.genre}</td>
                <td className="px-6 py-4">{book.isbn}</td>
                <td className="px-6 py-4">{book.copies}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/borrow/${book._id}`}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
