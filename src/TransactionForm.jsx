import { useState } from 'react'
import { formatCategory } from './format.js'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="panel add-transaction">
      <h2>Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="type-toggle">
          <legend className="visually-hidden">Type</legend>
          {["expense", "income"].map(option => (
            <label key={option} className={type === option ? "is-selected" : undefined}>
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={(e) => setType(e.target.value)}
              />
              {option === "expense" ? "Expense" : "Income"}
            </label>
          ))}
        </fieldset>

        <label className="field field-wide">
          <span>Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Amount</span>
          <div className="amount-input">
            <span aria-hidden="true">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </label>

        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{formatCategory(cat)}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="button-primary">
          Add {type}
        </button>
      </form>
    </section>
  );
}

export default TransactionForm
