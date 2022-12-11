import { checkWinner } from './checkWinner';
import { getAvailableMoves } from './getAvailableMoves';

const SCORES = {
  X: 1,
  O: -1,
  TIE: 0,
};

const minimax = (field, isMaximizer, symbol = null, depth = Infinity) => {
  const gameResult = checkWinner(field);

  if (gameResult !== null || depth === 0) {
    return {
      move: null,
      moveScore: SCORES[gameResult],
    };
  }

  const availableMoves = getAvailableMoves(field);

  let bestMove = null;
  let bestMoveScore = isMaximizer ? -Infinity : Infinity;

  availableMoves.forEach(move => {
    // play move
    field[move[0]][move[1]] = isMaximizer ? 'X' : 'O';

    // get best move score
    const { moveScore } = minimax(field, !isMaximizer, depth - 1);

    // restore move
    field[move[0]][move[1]] = '';

    // update best move and best move score for maximizer or minimizer conditions
    if (
      (isMaximizer && moveScore > bestMoveScore) ||
      (!isMaximizer && moveScore < bestMoveScore)
    ) {
      bestMoveScore = moveScore;
      bestMove = move;
    }
  });

  return {
    move: bestMove,
    moveScore: bestMoveScore,
  };
};

export default minimax;
