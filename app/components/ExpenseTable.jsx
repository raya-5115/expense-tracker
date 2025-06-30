"use client";

import ExpenseForm from "./ExpenseForm";
import ExpenseDetail from "./ExpenseDetail";

import { useState, useEffect } from "react";
import { CgInfo, CgTrash, CgClose } from "react-icons/cg";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const fetchExpenses = async () => {
    const res = await fetch("/api/expenses");
    const { data } = await res.json();

    setExpenses(data);
  };

  const filterExpenses = () => {
    if (!expenses.length) {
      setFilteredExpenses([]);
      return;
    }

    if (selectedMonth === "all" && selectedYear === "all") {
      setFilteredExpenses(expenses);
      return;
    }

    const filtered = expenses.filter((expense) => {
      if (!expense.date) return false;

      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth() + 1;
      const expenseYear = expenseDate.getFullYear();

      const monthMatch =
        selectedMonth === "all" || expenseMonth === parseInt(selectedMonth);

      const yearMatch =
        selectedYear === "all" || expenseYear === parseInt(selectedYear);

      return monthMatch && yearMatch;
    });

    setFilteredExpenses(filtered);
  };

  const resetFilter = () => {
    setSelectedMonth("all");
    setSelectedYear("all");
    setFilteredExpenses(expenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [expenses, selectedMonth, selectedYear]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin mau hapus ini?");
    if (!confirmed) return;

    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchExpenses();
  };

  const handleShowDetail = (expense) => {
    setSelectedExpense(expense);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedExpense(null);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">Pengeluaran Tercatat</h1>

        <ExpenseForm onExpenseAdded={fetchExpenses} />
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mt-4 mb-4 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Bulan:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Bulan</option>
            <option value={1}>Januari</option>
            <option value={2}>Februari</option>
            <option value={3}>Maret</option>
            <option value={4}>April</option>
            <option value={5}>Mei</option>
            <option value={6}>Juni</option>
            <option value={7}>Juli</option>
            <option value={8}>Agustus</option>
            <option value={9}>September</option>
            <option value={10}>Oktober</option>
            <option value={11}>November</option>
            <option value={12}>Desember</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Tahun:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Tahun</option>
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={resetFilter}
          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition-colors"
        >
          Semua
        </button>
      </div>

      {filteredExpenses.length === 0 && expenses.length > 0 && (
        <p className="text-gray-500">
          Tidak ada pengeluaran di bulan/tahun yang dipilih
        </p>
      )}
      {expenses.length === 0 && (
        <p className="text-gray-500">Belum ada pengeluaran tercatat</p>
      )}

      <div className="pt-4">
        {filteredExpenses.map((expen) => (
          <div
            key={expen.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{expen.title}</p>
                <p className="text-blue-600 font-semibold">
                  Rp {expen.amount?.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {expen.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShowDetail(expen)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <CgInfo size={20} />
                </button>
                <button
                  onClick={() => handleDelete(expen.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <CgTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal untuk ExpenseDetail */}
      {showDetail && selectedExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md mx-4">
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Detail Pengeluaran</h2>
                <button
                  onClick={handleCloseDetail}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  <CgClose />
                </button>
              </div>
            </div>
            <ExpenseDetail expense={selectedExpense} />
            <div className="bg-white rounded-lg p-4 mt-4">
              <button
                onClick={handleCloseDetail}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
