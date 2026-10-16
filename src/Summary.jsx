import { formatCurrency } from './format.js'

// Banknote-style guilloche: overlapping wavy rings drawn once at module load.
const ROSETTE_PATHS = Array.from({ length: 14 }, (_, ring) => {
  const points = [];
  for (let step = 0; step <= 360; step++) {
    const t = (step / 360) * Math.PI * 2;
    const r = 112 + 26 * Math.sin(9 * t + ring * 0.45) + 8 * Math.cos(27 * t);
    points.push(`${(160 + r * Math.cos(t)).toFixed(1)},${(160 + r * Math.sin(t)).toFixed(1)}`);
  }
  return `M${points.join('L')}Z`;
});

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const spentShare = totalIncome > 0 ? Math.min(totalExpenses / totalIncome, 1) : 1;
  const spentPercent = Math.round(spentShare * 100);

  return (
    <section className="note" aria-label="Balance">
      <svg className="note-rosette" viewBox="0 0 320 320" aria-hidden="true">
        {ROSETTE_PATHS.map((d, i) => <path key={i} d={d} />)}
      </svg>

      <p className="note-label">Balance</p>
      <p className={`note-balance${balance < 0 ? " is-negative" : ""}`}>{formatCurrency(balance)}</p>

      <div className="note-meter">
        <div
          className="meter"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={spentPercent}
          aria-label="Share of income spent"
        >
          <span style={{ '--spent': spentShare }} />
        </div>
        <p className="meter-caption">
          {totalIncome > 0
            ? `You've spent ${spentPercent}% of your income.`
            : "Add income to see how much of it you've spent."}
        </p>
      </div>

      <dl className="note-totals">
        <div>
          <dt>Income</dt>
          <dd>{formatCurrency(totalIncome)}</dd>
        </div>
        <div>
          <dt>Spent</dt>
          <dd>{formatCurrency(totalExpenses)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary
