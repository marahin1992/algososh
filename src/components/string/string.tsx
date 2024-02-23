import styles from './string.module.css'
import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ChangeEvent } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';

type element = {
  value: string;
  type: ElementStates;
}

export const StringComponent: React.FC = () => {

  let objectArr: element[] = [];

  const [arr, setArr] = useState<element[]>([]);

  const [str, setStr] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStr(e.target.value);
  }

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async function delayedChange(item1: element, item2: element, item3?: element) {
    item1.type = ElementStates.Changing;
    item2.type = ElementStates.Changing;
    setArr(arr => [...objectArr]);
    await delay().then(() => {let temp = item1.value;
      item1.value = item2.value;
      item2.value = temp;
      item1.type = ElementStates.Modified;
      item2.type = ElementStates.Modified;
      if (item3) {
        item3.type = ElementStates.Modified;
      }})
      setArr(arr => [...objectArr]);

  }

  async function processArray(array: element[]) {
    for (let i = 0, j = array.length - 1; i < j; i++, j--) {
      if (j - i === 2) {
        await delayedChange(array[i], array[j], array[i+1]);
        
      } else {
        await delayedChange(array[i], array[j]);
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let symbolArr = str.split('');
    objectArr = symbolArr.map((elem): element => { return {value: elem, type: ElementStates.Default}} );
    setArr(objectArr)
    //console.log(objectArr);
    if (objectArr.length > 1) {
      processArray(objectArr);
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          extraClass={styles.input} 
          type='text' 
          maxLength={11} 
          isLimitText 
          value={str || ''} 
          onChange={handleChange}
        />
        <Button text="Развернуть" type='submit'/>
      </form>
      {
        (
          <div className={styles.circles}>
            {arr.map((elem, id) => {
              return <Circle letter={elem.value} key={id} state={elem.type}
              />})}
          </div>
        )
      }

     
    </SolutionLayout>
  );
};
