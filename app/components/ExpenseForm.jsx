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

export default function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

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

    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        amount: amount.floatValue,
        category,
        date,
      }),
    });
    setTitle("");
    setAmount({});
    setCategory("");
    setDate("");
    fetchExpenses();
  };

  return (
    <div>
      <h1>Pengeluaran</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Abis beli apa nih??"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
          allowNegative={false}
          className="border p-2 rounded"
          placeholder="Rp 100.000"
          value={amount.formattedValue || ""}
          onValueChange={(values) => {
            const { floatValue } = values;
            console.log("Nominal yang dipilih:", floatValue);
            setAmount(values);
          }}
        />
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger>
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
        />
        <button>Tambahkan</button>
      </form>
    </div>
  );
}
