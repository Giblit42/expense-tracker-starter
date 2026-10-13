import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

function SpendingChart({ transactions }) {
  const totalsByCategory = {};
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    totalsByCategory[t.category] = (totalsByCategory[t.category] || 0) + t.amount;
  }

  const data = Object.entries(totalsByCategory)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-chart">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, bottom: 0, left: 0 }}>
            <CartesianGrid horizontal={false} stroke="#eee" />
            <XAxis type="number" tickFormatter={value => `$${value}`} tick={{ fontSize: 12, fill: "#888" }} />
            <YAxis type="category" dataKey="category" width={100} tick={{ fontSize: 13, fill: "#333" }} />
            <Tooltip formatter={value => [`$${value}`, "Spent"]} cursor={{ fill: "#f5f5f5" }} />
            <Bar dataKey="total" fill="#d9534f" barSize={20} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
