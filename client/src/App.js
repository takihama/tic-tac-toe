import React, { useState } from 'react';
import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import Field from './components/Field';
import StartRestartButton from './components/StartRestartButton';

const INITIAL_TURN = 'X';
const INITIAL_FIELD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const App = () => {
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [field, setField] = useState(INITIAL_FIELD);
  const [turn, setTurn] = useState(INITIAL_TURN);

  const onStartGame = () => {
    setHasGameStarted(true);
    setField(INITIAL_FIELD);
    setTurn(INITIAL_TURN);
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

  return (
    <Container bg="primary.300" h="100vh">
      {!hasGameStarted && (
        <Stack h="full" align="center" justify="center">
          <StartRestartButton value="Start" handleOnClick={onStartGame} />
        </Stack>
      )}

      {hasGameStarted && (
        <Stack h="full" align="center" justify="center">
          <Heading fontSize="4xl">{turn}'s turn</Heading>
          <Field field={field} handleOnSquareClick={onSquareClick} />
          <StartRestartButton value="Restart" handleOnClick={onStartGame} />
        </Stack>
      )}
    </Container>
  );
};

export default App;
