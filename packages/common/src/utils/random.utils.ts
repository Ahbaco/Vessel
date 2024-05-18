import { customAlphabet } from "nanoid";

const normalAlphabet = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
  12,
);

const symbolsAlphabet = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz!@#$%^&*()",
  12,
);

export const randomString = (max = 36, symbols = false) => {
  const size = Math.floor(Math.random() * (max - 12 + 1)) + 12;

  if (symbols) {
    return symbolsAlphabet(size);
  }

  return normalAlphabet(size);
};
