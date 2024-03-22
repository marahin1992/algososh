import styles from './string.module.css'
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ChangeEvent } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { reverseString } from '../../utils/string';
import { delay } from '../../utils/delay';
import { DELAY_IN_MS } from '../../constants/delays';

export type StringElement = {
  value: string;
  type: ElementStates;
}

export const StringComponent: React.FC = () => {

  const [disabled, setDisabled] = useState(true);

  const [arr, setArr] = useState<StringElement[]>([]);

  const [str, setStr] = useState('');

  const [isLoader, setIsLoader] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStr(e.target.value);
    if (e.target.value === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoader(true);
    let objectArr = str.split('').map((elem): StringElement => { return {value: elem, type: ElementStates.Default}} );
    let result: StringElement[][] = [];
    if (objectArr.length > 1) {
      result = await reverseString(objectArr);
    } else {
      setArr([...objectArr]);
    }
    for (let i = 0; i < result.length; i++) {
      await delay(DELAY_IN_MS);
      setArr(result[i]);
    }
    setIsLoader(false);
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
        <Button 
          extraClass={styles.button}
          text='Развернуть' 
          type='submit' 
          disabled={disabled} 
          isLoader={isLoader}
        />
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
