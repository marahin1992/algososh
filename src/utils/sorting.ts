import { Direction } from "../types/direction";
import { ElementStates } from "../types/element-states";

export type SortingObject = {
  value: number;
  type: ElementStates;
}

export async function bubbleSort(array: SortingObject[], direction: Direction) {
  let result: SortingObject[][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      array[j].type = ElementStates.Changing;
      array[j + 1].type = ElementStates.Changing;
      result.push(structuredClone(array));
      if (direction === Direction.Ascending) {
        if (array[j + 1].value < array[j].value) {
          let tmp = array[j].value;
          array[j].value = array[j + 1].value;
          array[j + 1].value = tmp;
          result.push(structuredClone(array));
        }
      } else {
        if (array[j + 1].value > array[j].value) {
          let tmp = array[j].value;
          array[j].value = array[j + 1].value;
          array[j + 1].value = tmp;
          result.push(structuredClone(array));
        }
      }

      array[j].type = ElementStates.Default;
      array[j + 1].type = ElementStates.Default;

    }
    array[(array.length - 1) - i].type = ElementStates.Modified;
    result.push(structuredClone(array));
  }
  return result;
}

export async function selectionSort(array: SortingObject[], direction: Direction) {
  let result: SortingObject[][] = [];
  for (let i = 0; i < array.length; i++) {
    let index = i;
    array[i].type = ElementStates.Changing;
    for (let j = i + 1; j < array.length; j++) {
      array[j].type = ElementStates.Changing;
      result.push(structuredClone(array));
      if (direction === Direction.Ascending) {
        if (array[j].value < array[index].value) {
          index = j;
        }
      } else {
        if (array[j].value > array[index].value) {
          index = j;
        }
      }
      array[j].type = ElementStates.Default;
    }
    let tmp = array[i].value;
    array[i].value = array[index].value;
    array[index].value = tmp;
    array[i].type = ElementStates.Modified;
    result.push(structuredClone(array));
  }
  return result;
}