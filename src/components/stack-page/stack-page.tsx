import styles from './stack-page.module.css'
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { Stack } from '../../utils/stack';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

let stack = new Stack<string>();

export const StackPage: React.FC = () => {

  const [newElem, setNewElem] = useState<string>('');

  const [addDisabled, setAddDisabled] = useState(true);

  const [delDisabled, setDelDisabled] = useState(true);

  const [arr, setArr] = useState<string[]>([]);

  const [isMethod, setIsMethod] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNewElem('');
      setAddDisabled(true);
      return
    }
    setNewElem(e.target.value);
    setAddDisabled(false);
  }

  const animateMethod = async () => {
    setIsMethod(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsMethod(false);
  }

  const addNewElement = async () => {
    stack.push(newElem);
    setArr(stack.get());
    setNewElem('');
    setAddDisabled(true);
    setDelDisabled(false);
    animateMethod();

  }

  const deleteTopElement = async () => {
    await animateMethod();
    stack.pop();
    setArr(stack.get());
    if (stack.getSize() <= 0) {
      setDelDisabled(true);
    }
  }

  const clearStack = async () => {
    stack.clear();
    setArr(stack.get());
    setDelDisabled(true);
    setNewElem('');
    setAddDisabled(true);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.controlPanel}>
        <div className={styles.main}>
          <Input
            placeholder="Введите число"
            extraClass={styles.input}
            type='text'
            maxLength={4}
            isLimitText
            value={newElem}
            onChange={handleChange}
          />
          <Button
            text='Добавить'
            extraClass={styles.button}
            onClick={addNewElement}
            disabled={addDisabled}
          />
          <Button
            text='Удалить'
            extraClass={styles.button}
            onClick={deleteTopElement}
            disabled={delDisabled}
          />
        </div>
        <Button
          text='Очистить'
          extraClass={styles.button}
          onClick={clearStack}
          disabled={delDisabled}
        />
      </div>
      {
        (
          <div className={styles.circles}>
            {arr.map((elem, id) => {
              return <Circle
                letter={elem}
                key={id}
                state={(isMethod && id === arr.length - 1) ? ElementStates.Changing : ElementStates.Default}
                index={id}
                head={id === arr.length - 1 ? 'top' : ''}
              />
            })}
          </div>
        )
      }
    </SolutionLayout>
  );
};
