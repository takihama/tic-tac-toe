import React, { useEffect, useState } from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import Field from './Field';
import StartRestartButton from './StartRestartButton';

import { checkWinner } from '../utils/checkWinner';

const INITIAL_TURN = 'X';
const INITIAL_FIELD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const Game = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [field, setField] = useState(INITIAL_FIELD);
  const [turn, setTurn] = useState(INITIAL_TURN);
  const [gameResult, setGameResult] = useState(null);

  const onStartGame = () => {
    setHasGameStarted(true);
    setField(INITIAL_FIELD);
    setTurn(INITIAL_TURN);
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

    setTurn(prevState => (prevState === 'X' ? 'O' : 'X'));
  };

  useEffect(() => {
    // if game not started, no need to check for game result
    if (!hasGameStarted) return;

    const result = checkWinner(field);
    if (result) {
      setGameResult(result);
    }
  }, [hasGameStarted, field]);

  return (
    <Stack h="full" align="center" justify="center">
      {gameResult && (
        <Stack align="center" justify="center">
          <Heading fontSize="4xl">
            {gameResult !== 'TIE' ? gameResult + ' is the Winner' : gameResult}
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
