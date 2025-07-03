import { useGetBorrowSummaryQuery } from '../controllers/borrowController';

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();
  
  const summary = data?.data ?? []; // safely extract the array

  if (isLoading) return <div>Loading summary...</div>;
  if (isError) return <div>Failed to load borrow summary.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book Title</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.book.title}</td>
              <td className="border px-4 py-2">{item.book.isbn}</td>
              <td className="border px-4 py-2">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
