export const getMinimumConsultationDateTime = () => {
  const date = new Date();

  date.setHours(date.getHours() + 1);

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};
