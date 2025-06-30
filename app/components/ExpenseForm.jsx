"use client";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CgAddR, CgCloseR, CgClose } from "react-icons/cg";

export default function ExpenseForm({ onExpenseAdded }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchExpenses = async () => {
    const res = await fetch("/api/expenses");
    const { data } = await res.json();

    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !amount.floatValue) {
      alert("Hayoo abis beli berapa banyak?");
      return;
    }

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        amount: amount.floatValue,
        category,
        date,
      }),
    });

    if (response.ok) {
      setTitle("");
      setAmount({});
      setCategory("");
      setDate("");
      setShowForm(false);
      fetchExpenses();

      // Panggil callback untuk refresh data di parent component
      if (onExpenseAdded) {
        onExpenseAdded();
      }
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-6"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? <CgCloseR /> : <CgAddR />}
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Tambah Pengeluaran</h1>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <CgClose />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Abis beli apa nih??"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
                allowNegative={false}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Spill dong berapa"
                value={amount.formattedValue || ""}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  console.log("Nominal yang dipilih:", floatValue);
                  setAmount(values);
                }}
              />

              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan">Makanan</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>

              <input
                type="date"
                placeholder="kapan belinya?"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Tambahkan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
