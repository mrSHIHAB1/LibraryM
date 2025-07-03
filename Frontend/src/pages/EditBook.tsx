import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../controllers/bookController';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditBook() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

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
        ...book,
        description: book.description ?? '',
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

  if (isLoading) return <div>Loading book...</div>;
  if (isError) return <div>Failed to load book data.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} required className="border p-2 w-full" onChange={handleChange} />
        <input type="text" name="author" value={formData.author} required className="border p-2 w-full" onChange={handleChange} />
        <select name="genre" value={formData.genre} required className="border p-2 w-full" onChange={handleChange}>
          <option value="FICTION">FICTION</option>
          <option value="NON_FICTION">NON_FICTION</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="HISTORY">HISTORY</option>
          <option value="BIOGRAPHY">BIOGRAPHY</option>
          <option value="FANTASY">FANTASY</option>
        </select>
        <input type="text" name="isbn" value={formData.isbn} required className="border p-2 w-full" onChange={handleChange} />
        <textarea name="description" value={formData.description} className="border p-2 w-full" onChange={handleChange} />
        <input type="number" name="copies" value={formData.copies} required className="border p-2 w-full" onChange={handleChange} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Book</button>
      </form>
    </div>
  );
}
