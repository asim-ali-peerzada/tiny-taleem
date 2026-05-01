import type { LearningItem } from "./english";

const numberWords: { [key: number]: string } = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Eleven",
  12: "Twelve",
  13: "Thirteen",
  14: "Fourteen",
  15: "Fifteen",
  16: "Sixteen",
  17: "Seventeen",
  18: "Eighteen",
  19: "Nineteen",
  20: "Twenty",
  30: "Thirty",
  40: "Forty",
  50: "Fifty",
};

const getNumberWord = (n: number): string => {
  if (numberWords[n]) return numberWords[n];
  if (n < 30) return `Twenty ${numberWords[n - 20]}`;
  if (n < 40) return `Thirty ${numberWords[n - 30]}`;
  if (n < 50) return `Forty ${numberWords[n - 40]}`;
  return n.toString();
};

const colors = [
  "#FF6B6B",
  "#4D96FF",
  "#FFD93D",
  "#6BCBFF",
  "#9B72AA",
  "#00FFF0",
  "#95CD41",
  "#E07C24",
  "#FF87CA",
  "#548CFF",
];

export const numbersData: LearningItem[] = Array.from(
  { length: 50 },
  (_, i) => {
    const n = i + 1;
    return {
      id: n,
      letter: n.toString(),
      word: getNumberWord(n),
      image: "", // Image removed as requested
      color: colors[i % colors.length],
    };
  },
);
