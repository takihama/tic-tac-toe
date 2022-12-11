import React, { useEffect, useState } from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import Field from './Field';
import StartRestartButton from './StartRestartButton';

import { checkWinner } from '../utils/checkWinner';
import minimax from '../utils/minimax';
import { getOpponent, SYMBOLS } from '../utils/getOpponent';
import { getRandomPlayer } from '../utils/getRandomPlayer';

const INITIAL_FIELD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const Game = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [field, setField] = useState(INITIAL_FIELD);
  const [turn, setTurn] = useState();
  const [gameResult, setGameResult] = useState(null);

  const onStartGame = () => {
    const randPlayer = getRandomPlayer();
    setHasGameStarted(true);
    setField(INITIAL_FIELD);
    setTurn(randPlayer);
    setGameResult(null);
  };

  const onSquareClick = (x, y) => {
    // if square has already a value, return
    if (field[y][x]) return;

    setField(prevField =>
      prevField.map((row, rowIdx) =>
        rowIdx !== y
          ? row
          : row.map((col, colIdx) => (colIdx !== x ? col : turn))
      )
    );

    setTurn(prevState => getOpponent(prevState));
  };

  useEffect(() => {
    // if game not started, no need to check for game result
    if (!hasGameStarted) return;

    const result = checkWinner(field, turn);
    if (result) {
      setGameResult(result);
    }
  }, [hasGameStarted, field]);

  useEffect(() => {
    if (!hasGameStarted || gameResult || turn !== SYMBOLS.O) return;
    
    const { move } = minimax(field, true, turn);
    if (move === null) return;

    setField(
      field.map((row, rowIdx) =>
        rowIdx !== move[0]
          ? row
          : row.map((col, colIdx) => (colIdx !== move[1] ? col : turn))
      )
    );

    setTurn(prevState => getOpponent(prevState));
  }, [field, turn]);

  return (
    <Stack h="full" align="center" justify="center">
      {gameResult && (
        <Stack align="center" justify="center">
          <Heading fontSize="4xl">
            {gameResult}
          </Heading>
        </Stack>
      )}
      {!hasGameStarted && (
        <StartRestartButton value="Start" handleOnClick={onStartGame} />
      )}
      {hasGameStarted && (
        <>
          <Heading fontSize="4xl">{turn}'s turn</Heading>
          <Field field={field} handleOnSquareClick={onSquareClick} />
          <StartRestartButton value="Restart" handleOnClick={onStartGame} />
        </>
      )}
    </Stack>
  );
};

export default Game;
