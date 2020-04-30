export const formatCurrency = (currency: string) => (price?: number) =>
  `${new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
  }).format(price ?? 0)} ${currency}`;
