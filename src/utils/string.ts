import { StringElement } from "../components/string/string";
import { ElementStates } from "../types/element-states";



export async function reverseString(array: StringElement[]) {
  if (array.length === 0) {
    return []
  }
  let result: StringElement[][] = [structuredClone(array)];
  if (array.length === 1) {
    array[0].type = ElementStates.Changing;
    result.push(structuredClone(array));
    array[0].type = ElementStates.Modified;
    result.push(structuredClone(array));
  }
  for (let i = 0, j = array.length - 1; i < j; i++, j--) {
    array[i].type = ElementStates.Changing;
    array[j].type = ElementStates.Changing;
    result.push(structuredClone(array));
    let temp = array[i].value;
    array[i].value = array[j].value;
    array[j].value = temp;
    array[i].type = ElementStates.Modified;
    array[j].type = ElementStates.Modified;
    if (j - i === 2) {
      array[i+1].type = ElementStates.Modified;      
    }
    result.push(structuredClone(array));
  }
  return result;  
}