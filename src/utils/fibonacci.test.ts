import { getFibonacciNumber } from "./fibonacci";

test('Число фибоначчи', () => {
  expect(getFibonacciNumber(3)).toEqual({'0':1, '1':1, '2': 2, '3':3})
})

describe('getFibonacciNumber', () => {
  //test('Индекс меньше нуля', () => {
  //    expect(getFibonacciNumber(-1)).toThrow(Error);
  //})
  test('Индекс 1', () => {
      expect(getFibonacciNumber(1)).toEqual({'0':1, '1':1});
  })
  test('Индекс 3', () => {
    expect(getFibonacciNumber(3)).toEqual({'0':1, '1':1, '2': 2, '3':3});
  })
  test('Индекс 10', () => {
    expect(getFibonacciNumber(7)).toEqual({'0':1, '1':1, '2': 2, '3':3, '4':5, '5':8, '6':13, '7':21});
  })
})