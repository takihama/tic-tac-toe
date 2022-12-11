import { Stack } from "@chakra-ui/react";
import Square from "./Square";

const Field = ({field, handleOnSquareClick}) => {
  return field.map((row, rowIdx) => (
    <Stack key={rowIdx} direction="row">
      {row.map((cell, colIdx) => (
        <Square
          key={colIdx}
          value={cell}
          handleOnSquareClick={() => handleOnSquareClick(colIdx, rowIdx)}
        />
      ))}
    </Stack>
  ))
};

export default Field;
