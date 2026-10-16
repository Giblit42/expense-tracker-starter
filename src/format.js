const currencyFormatters = {
  whole: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
  cents: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }),
};

export function formatCurrency(value) {
  return (Number.isInteger(value) ? currencyFormatters.whole : currencyFormatters.cents).format(value);
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Dates are stored as "YYYY-MM-DD"; parse as local time so the day doesn't shift.
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return dateFormatter.format(new Date(year, month - 1, day));
}

export function formatCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
