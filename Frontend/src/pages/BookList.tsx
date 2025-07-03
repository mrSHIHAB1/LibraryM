import { useGetBooksQuery, useDeleteBookMutation } from '../controllers/bookController';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BookList() {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  // Extract books array safely
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

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Failed to load books.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Genre</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Copies</th>
            <th className="border px-4 py-2">Availability</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.genre}</td>
              <td className="border px-4 py-2">{book.isbn}</td>
              <td className="border px-4 py-2">{book.copies}</td>
              <td className="border px-4 py-2">{book.available ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link to={`/edit-book/${book._id}`} className="text-blue-500">Edit</Link>
                <button onClick={() => handleDelete(book._id)} className="text-red-500">Delete</button>
                <Link to={`/borrow/${book._id}`} className="text-green-500">Borrow</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
