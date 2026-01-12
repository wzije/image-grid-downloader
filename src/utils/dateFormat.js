export const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const dateObj = new Date(dateString + "T00:00:00");

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};
