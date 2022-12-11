import { Button, Text } from "@chakra-ui/react";

const Square = ({ value, handleOnSquareClick }) => {
  return (
    <Button bg="purple.500" w="100px" h="100px" onClick={handleOnSquareClick}>
      <Text fontSize="6xl">{value}</Text>
    </Button>
  );
};

export default Square;
