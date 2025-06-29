"use client";

import ExpenseForm from "./ExpenseForm";
import ExpenseDetail from "./ExpenseDetail";

import { useState, useEffect } from "react";
import { CgInfo, CgTrash, CgClose } from "react-icons/cg";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenses = async () => {
    const res = await fetch("/api/expenses");
    const { data } = await res.json();

    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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

        <ExpenseForm />
      </div>
      {expenses.length === 0 && (
        <p className="text-gray-500">Belum ada pengeluaran tercatat</p>
      )}

      <div className="pt-4">
        {expenses.map((expen) => (
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
