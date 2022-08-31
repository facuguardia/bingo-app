export const shuffle = a => {
  for (
    var j, x, i = a.length;
    i;
    j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x
  );
  return a;
};

export const getRandomNumber = (min, max, excepts = []) => {
  let number = null;

  while (number === null || excepts.includes(number)) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return number;
};

export const getRandomNumbers = (min, max, quantity) => {
  const array = new Array(max - min + 1).fill(null).map((k, i) => i + min);
  shuffle(array);
  return array.splice(0, quantity).sort();
};

export const isNumeric = n => n !== null && !isNaN(Number(n));

export const orderColumns = columns => {
  const ordered = [[], [], []];

  new Array(9).fill(null).forEach((k, colIndex) => {
    let one = columns[0][colIndex];
    let two = columns[1][colIndex];
    let three = columns[2][colIndex];

    if (isNumeric(one) && isNumeric(two) && isNumeric(three)) {
      [one, two, three] = [one, two, three].sort();
    } else if (isNumeric(one) && isNumeric(two)) {
      [one, two] = [one, two].sort();
    } else if (isNumeric(one) && isNumeric(three)) {
      [one, three] = [one, three].sort();
    } else if (isNumeric(two) && isNumeric(three)) {
      [two, three] = [two, three].sort();
    }

    ordered[0][colIndex] = one;
    ordered[1][colIndex] = two;
    ordered[2][colIndex] = three;
  });

  return ordered;
};

export const generateRow = (previousNumbers = []) => {
  const array = new Array(9).fill(null).map(i => i);
  const columns = getRandomNumbers(0, 8, 5);

  columns.forEach(colIndex => {
    const min = colIndex === 0 ? 1 : colIndex * 10;
    const max = colIndex === 0 ? 9 : colIndex === 8 ? min + 10 : min + 9;

    array[colIndex] = getRandomNumber(min, max, previousNumbers);
  });

  return array;
};

export const generateCard = quantity => {
  let globalNumbers = [];
  const card = [];

  for (let i = 0; i < quantity; i++) {
    const row1 = generateRow(globalNumbers);
    globalNumbers = [...globalNumbers, ...row1];
    const row2 = generateRow(globalNumbers);
    globalNumbers = [...globalNumbers, ...row2];
    const row3 = generateRow(globalNumbers);
    globalNumbers = [...globalNumbers, ...row3];
    card.push(orderColumns([row1, row2, row3]));
  }

  return card;
};
