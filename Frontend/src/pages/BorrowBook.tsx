import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBorrowBookMutation } from '../controllers/borrowController';
import { toast } from 'react-toastify';

export default function BorrowBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [borrowBook] = useBorrowBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({ book: bookId, quantity, dueDate }).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error) {
      toast.error('Failed to borrow book.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          min={1}
          required
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-full"
          placeholder="Quantity"
        />
        <input
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">Borrow</button>
      </form>
    </div>
  );
}
