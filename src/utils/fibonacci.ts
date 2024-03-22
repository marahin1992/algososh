export function getFibonacciNumber(index: number, memo: Record<number, number> = {0: 1, 1: 1}) {
  if (index < 0) {
    throw new Error('индекс не может быть менее 0');
  }
  if (!(index in memo)) {
    memo[index] = (getFibonacciNumber(index - 1, memo)[index -1]) + (getFibonacciNumber(index - 2, memo)[index - 2]);
  }
  return memo;
}