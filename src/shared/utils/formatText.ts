export const formatStatusText = (status: string): string => {
  const result = status.replace("_", " ").toLowerCase();
  return result;
};
