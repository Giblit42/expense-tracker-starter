import { useState } from 'react'
import { formatCategory, formatCurrency, formatDate } from './format.js'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }
  const sortedTransactions = [...filteredTransactions].sort((a, b) => b.date.localeCompare(a.date));

  const handleDeleteClick = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  const clearFilters = () => {
    setFilterType("all");
    setFilterCategory("all");
  };

  return (
    <section className="panel transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <label>
            <span className="visually-hidden">Filter by type</span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </label>
          <label>
            <span className="visually-hidden">Filter by category</span>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{formatCategory(cat)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="empty">
          {transactions.length === 0 ? (
            <p>No transactions yet. Add one above to start tracking.</p>
          ) : (
            <>
              <p>No transactions match these filters.</p>
              <button type="button" className="button-quiet" onClick={clearFilters}>Clear filters</button>
            </>
          )}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col" className="col-date">Date</th>
              <th scope="col">Description</th>
              <th scope="col" className="col-category">Category</th>
              <th scope="col" className="col-amount">Amount</th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(t => (
              <tr key={t.id}>
                <td className="col-date">{formatDate(t.date)}</td>
                <td>
                  <span className="row-description">{t.description}</span>
                  <span className="row-meta">{formatCategory(t.category)}, {formatDate(t.date)}</span>
                </td>
                <td className="col-category">
                  <span className="category-tag">{formatCategory(t.category)}</span>
                </td>
                <td className={`col-amount ${t.type === "income" ? "is-income" : "is-expense"}`}>
                  {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                </td>
                <td className="col-action">
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteClick(t)}
                    aria-label={`Delete ${t.description}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TransactionList
