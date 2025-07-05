import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../controllers/bookController';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditBook() {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const book = response?.data;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'FICTION',
    isbn: '',
    description: '',
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || 'FICTION',
        isbn: book.isbn || '',
        description: book.description || '',
        copies: book.copies || 1,
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'copies' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id, ...formData }).unwrap();
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to update book.');
    }
  };

  if (isLoading) return <div className="text-center py-10 text-lg">Loading book...</div>;
  if (isError) return <div className="text-center py-10 text-lg text-red-500">Failed to load book data.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
        <input
          type="text"
          name="title"
          value={formData.title}
          required
          className="border p-2 w-full rounded"
          onChange={handleChange}
          placeholder="Book Title"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          required
          className="border p-2 w-full rounded"
          onChange={handleChange}
          placeholder="Author"
        />
        <select
          name="genre"
          value={formData.genre}
          required
          className="border p-2 w-full rounded"
          onChange={handleChange}
        >
          <option value="FICTION">FICTION</option>
          <option value="NON_FICTION">NON_FICTION</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="HISTORY">HISTORY</option>
          <option value="BIOGRAPHY">BIOGRAPHY</option>
          <option value="FANTASY">FANTASY</option>
        </select>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          required
          className="border p-2 w-full rounded"
          onChange={handleChange}
          placeholder="ISBN"
        />
        <textarea
          name="description"
          value={formData.description}
          className="border p-2 w-full rounded"
          onChange={handleChange}
          placeholder="Book Description"
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          required
          className="border p-2 w-full rounded"
          onChange={handleChange}
          placeholder="Number of Copies"
          min={1}
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
          Update Book
        </button>
      </form>
    </div>
  );
}
