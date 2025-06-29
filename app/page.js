import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">💸 Expense Tracker</h1>

      <ExpenseTable />
      
    </main>
  );
}
