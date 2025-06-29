"use client";

import { useState, useEffect } from "react";
import { CgInfo } from "react-icons/cg";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

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

    await fetch("/api/expenses/[id", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchExpenses();
  };

  return (
    <div>
      <h1>Pengeluaran</h1>
      {expenses.length === 0 && (
        <p className="text-gray-500">Belum ada pengeluaran tercata</p>
      )}

      <div>
        {expenses.map((expen) => (
          <div key={expen.id}>
            <p>{expen.title}</p>
            <p>{expen.amount}</p>
            <button onClick={() => setShowDetail(showDetail)}>
              <CgInfo />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
