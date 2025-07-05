import { useGetBorrowSummaryQuery } from '../controllers/borrowController';

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  // Safely extract the array
  const summary = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) return <div className="text-center py-10 text-lg">Loading summary...</div>;
  if (isError) return <div className="text-center py-10 text-lg text-red-500">Failed to load borrow summary.</div>;
  if (summary.length === 0) return <div className="text-center py-10 text-lg text-gray-500">No borrow summary available.</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">📖 Borrow Summary</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gradient-to-r from-slate-700 to-gray-800

 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Book Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {summary.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4">{item.book?.title || 'N/A'}</td>
                <td className="px-6 py-4">{item.book?.isbn || 'N/A'}</td>
                <td className="px-6 py-4">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
