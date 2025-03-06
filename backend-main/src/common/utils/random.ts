export const randomTokenId = (numbering: number): string => {
  return String(
    Number(new Date().getTime().toString()) +
      Math.floor(Math.random() * 10000000) +
      String(numbering).padStart(8, '0'),
  );
};
