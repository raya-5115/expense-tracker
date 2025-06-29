export default function ExpenseDetail({ expense }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {expense.title}
          </h2>
          <p className="text-sm text-gray-600">Pembelian</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(expense.amount)}
          </p>
          <p className="text-sm text-blue-500">Total pengeluaran</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-lg font-medium text-green-600 capitalize">
            {expense.category}
          </p>
          <p className="text-sm text-green-500">Kategori</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-lg font-medium text-amber-600">
            {formatDate(expense.date)}
          </p>
          <p className="text-sm text-amber-500">Tanggal pembelian</p>
        </div>
      </div>
    </div>
  );
}
