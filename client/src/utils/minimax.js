import { checkWinner } from './checkWinner';
import { getAvailableMoves } from './getAvailableMoves';
import { getOpponent } from './getOpponent';

const SCORES_MAX = {
  win: 1,
  lose: -1,
  tie: 0,
};

const SCORES_MIN = {
  win: -1,
  lose: 1,
  tie: 0,
};

export const minimax = (field, isMaximizer, symbol, depth = Infinity) => {
  const gameResult = checkWinner(field, symbol);

  if (gameResult !== null || depth === 0) {
    return {
      move: null,
      moveScore: isMaximizer ? SCORES_MAX[gameResult] : SCORES_MIN[gameResult],
    };
  }

  const availableMoves = getAvailableMoves(field);

  let bestMove = null;
  let bestMoveScore = isMaximizer ? -Infinity : Infinity;

  availableMoves.forEach(move => {
    // play move
    field[move[0]][move[1]] = symbol;

    // get best move score
    const { moveScore } = minimax(
      field,
      !isMaximizer,
      getOpponent(symbol),
      depth - 1
    );

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
