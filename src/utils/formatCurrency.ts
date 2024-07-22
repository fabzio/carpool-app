export const formatCurrency = (value: number): string => {
  const simbol = "S/.";

  return value ? `${simbol} ${Number(value).toFixed(2)}` : "";
};
