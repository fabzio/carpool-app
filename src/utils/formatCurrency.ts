export const formatCurrency = (value: number | undefined): string => {
  const simbol = "S/.";

  return value ? `${simbol} ${Number(value).toFixed(2)}` : "";
};
