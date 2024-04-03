import { reverseString } from "./string";
import { ElementStates } from "../types/element-states";
global.structuredClone = (val) => {
  return JSON.parse(JSON.stringify(val))
}

describe('Разворот строки', () => {
  test('Чётное количество символов', async () => {
    expect(await reverseString([{ value: '1', type: ElementStates.Default }, { value: '2', type: ElementStates.Default }])).toEqual([[{ value: '1', type: ElementStates.Default }, { value: '2', type: ElementStates.Default }],
      [{ value: '1', type: ElementStates.Changing }, { value: '2', type: ElementStates.Changing }],
      [{ value: '2', type: ElementStates.Modified }, { value: '1', type: ElementStates.Modified }]
      ])
  });
  test('Нечётное количество символов', async () => {
    expect(await reverseString([{ value: '1', type: ElementStates.Default }, { value: '2', type: ElementStates.Default }, { value: '3', type: ElementStates.Default }])).toEqual([[{ value: '1', type: ElementStates.Default }, { value: '2', type: ElementStates.Default }, { value: '3', type: ElementStates.Default }],
      [{ value: '1', type: ElementStates.Changing }, { value: '2', type: ElementStates.Default }, { value: '3', type: ElementStates.Changing }],
      [{ value: '3', type: ElementStates.Modified }, { value: '2', type: ElementStates.Modified }, { value: '1', type: ElementStates.Modified }]
      ])
  });
  test('Один символ', async () => {
    expect(await reverseString([{ value: '1', type: ElementStates.Default }])).toEqual([[{ value: '1', type: ElementStates.Default }],
      [{ value: '1', type: ElementStates.Changing }],
      [{ value: '1', type: ElementStates.Modified }]
      ])
  });
  test('Пустая строка', async () => {
    expect(await reverseString([])).toEqual([])
  });
})
