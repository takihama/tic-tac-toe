import React, { useEffect, useState } from 'react';
import { Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import Field from './Field';
import StartRestartButton from './StartRestartButton';

import { checkWinner } from '../utils/checkWinner';
import { minimax } from '../utils/minimax';

const INITIAL_BOARD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const getActivePlayer = players => players.find(player => player.active);

const Game = () => {
  const [gameBoard, setGameBoard] = useState(INITIAL_BOARD);
  const [gameMode, setGameMode] = useState('singlePlayer');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const [players, setPlayers] = useState();

  const onStartGame = () => {
    switch (gameMode) {
      case 'singlePlayer': {
        setPlayers([
          {
            symbol: 'x',
            type: 'human',
            active: true,
          },
          {
            symbol: 'o',
            type: 'computer',
            active: false,
          },
        ]);
        break;
      }
      case 'twoPlayers': {
        setPlayers([
          {
            symbol: 'x',
            type: 'human',
            active: true,
          },
          {
            symbol: 'o',
            type: 'human',
            active: false,
          },
        ]);
        break;
      }
      default: {
        break;
      }
    }
    setGameBoard(INITIAL_BOARD);
    setGameStarted(true);
    setGameFinished(false);
    setGameResult(null);
  };

  const onChangeGameMode = mode => {
    setGameMode(mode);
  };

  const playMove = (x, y) => {
    if (!gameStarted || gameFinished) return;
    
    // if square has already a value, return
    if (gameBoard[y][x]) return;

    const turnPlayer = getActivePlayer(players);

    const newGameBoard = gameBoard.map((row, rowIdx) =>
      rowIdx !== y
        ? row
        : row.map((col, colIdx) => (colIdx !== x ? col : turnPlayer.symbol))
    );

    const result = checkWinner(newGameBoard, turnPlayer.symbol);
    if (result) {
      setGameFinished(true);
      setGameResult(result);
    }

    setGameBoard(newGameBoard);
  };

  const onSquareClick = (x, y) => {
    playMove(x, y);
  };

  // when a player plays a move -> updates turn
  useEffect(() => {
    if (!gameStarted || gameFinished) return;
    const changeTurn = players =>
      players.map(player => ({
        ...player,
        active: !player.active,
      }));

    setPlayers(prevState => changeTurn(prevState));
  }, [gameBoard]);

  // when the turn changes -> computer plays?
  useEffect(() => {
    if (!gameStarted && !gameFinished) return;

    const turnPlayer = getActivePlayer(players);

    if (turnPlayer.type === 'computer') {
      const { move } = minimax(gameBoard, true, turnPlayer.symbol);

      playMove(move[1], move[0]);
    }
  }, [players]);

  return (
    <Stack h="full" align="center" justify="center">
      {!gameStarted && (
        <>
          <StartRestartButton value="Start" handleOnClick={onStartGame} />
          <RadioGroup onChange={onChangeGameMode} value={gameMode}>
            <Stack direction="row">
              <Radio value="singlePlayer">Single player</Radio>
              <Radio value="twoPlayers">2 players</Radio>
            </Stack>
          </RadioGroup>
        </>
      )}

      {gameFinished && (
        <Stack align="center" justify="center">
          <Heading fontSize="4xl">
            {gameResult !== 'tie' ? getActivePlayer(players).symbol : ''}{' '}
            {gameResult}
          </Heading>
        </Stack>
      )}

      {gameStarted && (
        <>
          <Heading fontSize="4xl">
            {/* {getActivePlayer(players).symbol}'s turn */}
          </Heading>
          <Field field={gameBoard} handleOnSquareClick={onSquareClick} />
          <StartRestartButton value="Restart" handleOnClick={onStartGame} />
        </>
      )}
    </Stack>
  );
};

export default Game;
