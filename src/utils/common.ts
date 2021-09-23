const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getFullDate = (date: string) => {
  const originalDate = new Date(date);
  const formattedDate = `${
    months[originalDate.getMonth()]
  } ${originalDate.getDate()}, ${originalDate.getFullYear()}`;
  return formattedDate;
};

export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
