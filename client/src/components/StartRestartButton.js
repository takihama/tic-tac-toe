import { Button } from "@chakra-ui/react";

const StartRestartButton = ({ value, handleOnClick }) => {
  return (
    <Button
      bg="purple.300"
      _hover={{ color: 'white', bg: 'purple.900' }}
      size="lg"
      onClick={handleOnClick}
    >
      {value}
    </Button>
  );
};

export default StartRestartButton;
