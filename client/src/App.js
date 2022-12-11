import React, { useState } from 'react';
import { Button, Container, Stack, Text } from '@chakra-ui/react';

const INITIAL_FIELD = [
  ['x', '', ''],
  ['', 'o', 'o'],
  ['', 'x', ''],
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

  return (
    <Container bg="primary.300" h="100vh">
        <Stack h="full" align="center" justify="center">
          {field.map((row, rowIdx) => (
            <Stack key={rowIdx} direction="row">
              {row.map((cell, colIdx) => (
                <Square key={colIdx} value={cell} />
              ))}
            </Stack>
          ))}
        </Stack>
    </Container>
  );
};

export default App;
