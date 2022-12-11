const checkCol = (field, colIdx, symbol) => {
  const col = field.map(row => row[colIdx]);
  return col.every(cell => cell === symbol);
};

const checkRow = (field, rowIdx, symbol) => {
  const row = field[rowIdx];
  return row.every(cell => cell === symbol);
};

const checkMainDiag = (field, symbol) => {
  let colIdx = 0;
  const mainDiag = field.reduce(
    (diag, currRow) => diag.concat(currRow[colIdx++]),
    []
  );
  return mainDiag.every(cell => cell === symbol);
};

const checkAntiDiag = (field, symbol) => {
  let colIdx = -1;
  const antiDiag = field.reduce(
    (diag, currRow) => diag.concat(currRow.at(colIdx--)),
    []
  );
  return antiDiag.every(cell => cell === symbol);
};

const checkHasWin = (field, symbol) => {
  return (
    checkMainDiag(field, symbol) ||
    checkAntiDiag(field, symbol) ||
    checkCol(field, 0, symbol) ||
    checkCol(field, 1, symbol) ||
    checkCol(field, 2, symbol) ||
    checkRow(field, 0, symbol) ||
    checkRow(field, 1, symbol) ||
    checkRow(field, 2, symbol)
  );
};

export const checkWinner = field => {
  if (checkHasWin(field, 'X')) {
    return 'X';
  } else if (checkHasWin(field, 'O')) {
    return 'O';
  } else if (isFieldFull(field)) {
    return 'TIE';
  }
  return null;
};

export const isFieldFull = field => {
  return field.every(row => row.every(cell => cell));
};
