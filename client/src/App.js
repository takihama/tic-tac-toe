import React, { useState } from 'react';
import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

const INITIAL_TURN = 'X';
const INITIAL_FIELD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const Square = ({ value, handleOnSquareClick }) => {
  return (
    <Button bg="purple.500" w="100px" h="100px" onClick={handleOnSquareClick}>
      <Text fontSize="6xl">{value}</Text>
    </Button>
  );
};

const App = () => {
  const [field, setField] = useState(INITIAL_FIELD);
  const [turn, setTurn] = useState(INITIAL_TURN);

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
      <Stack h="full" align="center" justify="center">
        <Heading fontSize="4xl">{turn}'s turn</Heading>
        {field.map((row, rowIdx) => (
          <Stack key={rowIdx} direction="row">
            {row.map((cell, colIdx) => (
              <Square
                key={colIdx}
                value={cell}
                handleOnSquareClick={() => onSquareClick(colIdx, rowIdx)}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
