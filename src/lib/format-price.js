export function formatBengaliNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "০";

  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(number);
}

export function formatPrice(value) {
  return `${formatBengaliNumber(value)} টাকা`;
}

export function formatPercent(value) {
  const number = Number(value);

  if (!Number.isFinite(number) || number === 0) {
    return "— ০.০%";
  }

  const arrow = number > 0 ? "▲" : "▼";

  return `${arrow} ${formatBengaliNumber(
    Math.abs(number)
  )}%`;
}

export function getPriceChangeColor(value) {
  const number = Number(value);

  if (!Number.isFinite(number) || number === 0) {
    return "badge-ghost";
  }

  return number > 0 ? "badge-success" : "badge-error";
}