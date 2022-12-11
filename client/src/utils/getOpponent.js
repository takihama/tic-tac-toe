export const SYMBOLS = {
  X: 'x',
  O: 'o',
};

export const getOpponent = currPlayer =>
  currPlayer === SYMBOLS.X ? SYMBOLS.O : SYMBOLS.X;
