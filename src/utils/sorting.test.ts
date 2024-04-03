import { Direction } from "../types/direction";
import { bubbleSort, selectionSort } from "./sorting";
import { ElementStates } from "../types/element-states";
global.structuredClone = (val) => {
  return JSON.parse(JSON.stringify(val))
}

describe('Сортировка пузырьком', () => {
  test('Массив из нескольких элементов', async () => {
    expect(await bubbleSort([{ value: 6, type: ElementStates.Default }, { value: 3, type: ElementStates.Default }, { value: 5, type: ElementStates.Default }], Direction.Ascending))
    .toEqual([[{ value: 6, type: ElementStates.Changing }, { value: 3, type: ElementStates.Changing }, { value: 5, type: ElementStates.Default }],
      [{ value: 3, type: ElementStates.Changing }, { value: 6, type: ElementStates.Changing }, { value: 5, type: ElementStates.Default }],
      [{ value: 3, type: ElementStates.Default }, { value: 6, type: ElementStates.Changing }, { value: 5, type: ElementStates.Changing }],
      [{ value: 3, type: ElementStates.Default }, { value: 5, type: ElementStates.Changing }, { value: 6, type: ElementStates.Changing }],
      [{ value: 3, type: ElementStates.Default }, { value: 5, type: ElementStates.Default }, { value: 6, type: ElementStates.Modified }],
      [{ value: 3, type: ElementStates.Changing }, { value: 5, type: ElementStates.Changing }, { value: 6, type: ElementStates.Modified }],
      [{ value: 3, type: ElementStates.Default }, { value: 5, type: ElementStates.Modified }, { value: 6, type: ElementStates.Modified }],
      [{ value: 3, type: ElementStates.Modified }, { value: 5, type: ElementStates.Modified }, { value: 6, type: ElementStates.Modified }],
      ])
  });
  test('Массив из одного элемента', async () => {
    expect(await bubbleSort([{ value: 7, type: ElementStates.Default }], Direction.Ascending)).toEqual([[{ value: 7, type: ElementStates.Modified }]])
  });
  test('Пустой массив', async () => {
    expect(await bubbleSort([], Direction.Ascending)).toEqual([])
  });
});

describe('Сортировка выбором', () => {
  test('Массив из нескольких элементов', async () => {
    expect(await selectionSort([{ value: 6, type: ElementStates.Default }, { value: 3, type: ElementStates.Default }, { value: 5, type: ElementStates.Default }], Direction.Ascending))
    .toEqual([[{ value: 6, type: ElementStates.Changing }, { value: 3, type: ElementStates.Changing }, { value: 5, type: ElementStates.Default }],
      [{ value: 6, type: ElementStates.Changing }, { value: 3, type: ElementStates.Default }, { value: 5, type: ElementStates.Changing }],
      [{ value: 3, type: ElementStates.Modified }, { value: 6, type: ElementStates.Default }, { value: 5, type: ElementStates.Default }],
      [{ value: 3, type: ElementStates.Modified }, { value: 6, type: ElementStates.Changing }, { value: 5, type: ElementStates.Changing }],
      [{ value: 3, type: ElementStates.Modified }, { value: 5, type: ElementStates.Modified }, { value: 6, type: ElementStates.Default }],
      [{ value: 3, type: ElementStates.Modified }, { value: 5, type: ElementStates.Modified }, { value: 6, type: ElementStates.Modified }],
      ])
  });
  test('Массив из одного элемента', async () => {
    expect(await selectionSort([{ value: 7, type: ElementStates.Default }], Direction.Ascending)).toEqual([[{ value: 7, type: ElementStates.Modified }]])
  });
  test('Пустой массив', async () => {
    expect(await selectionSort([], Direction.Ascending)).toEqual([])
  });
});

