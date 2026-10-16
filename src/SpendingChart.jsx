import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts'
import { formatCategory, formatCurrency } from './format.js'

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
    <section className="panel spending-chart">
      <h2>Where your money went</h2>
      {data.length === 0 ? (
        <p className="empty">No spending yet. Expenses you add will show up here by category.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 44 + 8}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 72, bottom: 4, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={104}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCategory}
            />
            <Tooltip
              formatter={value => [formatCurrency(value), "Spent"]}
              labelFormatter={formatCategory}
              cursor={{ className: "chart-cursor" }}
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                color: "var(--ink)",
              }}
            />
            <Bar dataKey="total" barSize={18} radius={[0, 9, 9, 0]} isAnimationActive={false}>
              <LabelList dataKey="total" position="right" offset={10} formatter={formatCurrency} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart
