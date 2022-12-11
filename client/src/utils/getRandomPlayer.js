import { SYMBOLS } from './getOpponent';

const players = [SYMBOLS.X, SYMBOLS.O];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomPlayer = () => players[getRandomNumber(1, 2) - 1];
