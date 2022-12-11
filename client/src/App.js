import React from 'react';
import { Container } from '@chakra-ui/react';
import Game from './components/Game';

const App = () => {
  return (
    <Container bg="primary.300" h="100vh">
      <Game />
    </Container>
  );
};

export default App;
