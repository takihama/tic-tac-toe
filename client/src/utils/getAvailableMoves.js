export const getAvailableMoves = field => {
  const moves = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (!field[x][y]) {
        moves.push([x, y]);
      }
    }
  }
  return moves;
};
