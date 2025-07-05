import { useState } from 'react';
import { useCreateBookMutation } from '../controllers/bookController';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'FICTION',
    isbn: '',
    description: '',
    copies: 1,
  });

  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

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
      await createBook(formData).unwrap();
      toast.success('Book added successfully!');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to add book.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" required className="border p-2 w-full" onChange={handleChange} />
        <input type="text" name="author" placeholder="Author" required className="border p-2 w-full" onChange={handleChange} />
        <select name="genre" required className="border p-2 w-full" onChange={handleChange}>
          <option value="FICTION">FICTION</option>
          <option value="NON_FICTION">NON_FICTION</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="HISTORY">HISTORY</option>
          <option value="BIOGRAPHY">BIOGRAPHY</option>
          <option value="FANTASY">FANTASY</option>
        </select>
        <input type="text" name="isbn" placeholder="ISBN" required className="border p-2 w-full" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange} />
        <input type="number" name="copies" placeholder="Copies" required className="border p-2 w-full" onChange={handleChange} />
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </div>
  );
}
