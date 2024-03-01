import styles from './fibonacci-page.module.css'
import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ChangeEvent } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { getFibonacciNumber } from '../../utils/fibonacci';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export type StringElement = {
  value: string;
  type: ElementStates;
}

export const FibonacciPage: React.FC = () => {

  const [disabled, setDisabled] = useState(true);

  const [isLoader, setIsLoader] = useState(false);

  const [result, setResult] = useState<number[]>([]);

  const [fibIndex, setFibIndex] = useState<number>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setDisabled(true);
      setFibIndex(undefined);
      return
    }
    let index = Number(e.target.value)
    setFibIndex(index);
    if (index >= 0 && index <= 19) {
      
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);
    setIsLoader(true);
    console.log(styles.input);
    setResult([]);
    
    let fibResult = getFibonacciNumber(fibIndex!);
    
    
    for (let key in fibResult) {
      await delay(SHORT_DELAY_IN_MS);
      setResult(result => [...result, fibResult[key]]);
    }
    setDisabled(false);
    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          placeholder="Введите число"
          extraClass={styles.input} 
          type='number' 
          max={19} 
          min={0}
          isLimitText 
          value={fibIndex || undefined} 
          onChange={handleChange}
        />
        <Button 
          extraClass={styles.button}
          text={isLoader ? "" : "Рассчитать"} 
          type='submit' 
          disabled={disabled} 
          isLoader={isLoader}
        />
      </form>
      {
        (
          <div className={styles.container}>
            <div className={styles.circles}>
              {result.map((elem, id) => {
                return <Circle letter={elem.toString()} key={id} index={id}
              />})}
            </div>            
          </div>
        )
      }
     
    </SolutionLayout>
  );
};
