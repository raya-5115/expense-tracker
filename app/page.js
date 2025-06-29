import ExpenseForm from "./components/ExpenseForm"


export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">💸 Expense Tracker</h1>

      {/* Form untuk tambah pengeluaran */}
      <ExpenseForm />


    </main>
  )
}
