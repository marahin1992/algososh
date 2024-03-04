import styles from './sorting-page.module.css'
import React, { MouseEventHandler, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from '../../types/direction';
import { SortingObject, bubbleSort, selectionSort } from '../../utils/sorting';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const SortingPage: React.FC = () => {

  const [disabled, setDisabled] = useState(false);

  const [sortType, setSortType] = useState('select');

  const [arr, setArr] = useState<SortingObject[]>([]);

  const [isLoader, setIsLoader] = useState({[Direction.Ascending]: false, [Direction.Descending]: false})

  

  function randomArr() {
    let length = Math.floor(Math.random() * (18 - 3) + 3);
    return [...Array(length)].map(() => Math.floor(Math.random() * 100))
  }

  function generateNewArr() {
    let newArr = randomArr();
    setArr([]);
    newArr.forEach((elem) => {
      setArr((arr) => [...arr, { value: elem, type: ElementStates.Default }])
    })
  }

  useEffect(() => {generateNewArr()}, []);

  function setDefaultState() {
    let defArr = [...arr];
    for (let i = 0; i < defArr.length; i++) {
      defArr[i].type = ElementStates.Default;
    }
    setArr(() => [...defArr]);
  }

  function radioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSortType(event.target.value);
  }

  async function SortArray(direction: Direction) {
    setDisabled(true);
    if (arr[0].type = ElementStates.Modified) {
      setDefaultState();
    }
    if (direction === Direction.Ascending) {
      setIsLoader({[Direction.Ascending]: true, [Direction.Descending]: false})
    } else {
      setIsLoader({[Direction.Ascending]: false, [Direction.Descending]: true})
    }
    let result: SortingObject[][] = []
    if (sortType === 'bubble') {
      result = await bubbleSort(arr, direction);
    } else {
      result = await selectionSort(arr, direction);
    }


    for (let i = 0; i < result.length; i++) {      
      setArr(result[i]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setDisabled(false);
    setIsLoader({[Direction.Ascending]: false, [Direction.Descending]: false})
  }

  function handleClick(direction: Direction) {
    SortArray(direction);
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controlPanel}>
        <div className={styles.radio}>
          <RadioInput
            label='Выбор'
            name='sortType'
            value='select'
            defaultChecked
            onChange={radioHandler}
          />
          <RadioInput
            label='Пузырёк'
            name='sortType'
            value='bubble'
            onChange={radioHandler}
          />
        </div>
        <div className={styles.direction}>
          <Button
            text='По возрастанию'
            sorting={Direction.Ascending}
            onClick={() => (handleClick(Direction.Ascending))}
            disabled={disabled}
            isLoader={isLoader[Direction.Ascending]}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Descending}
            onClick={() => (handleClick(Direction.Descending))}
            disabled={disabled}
            isLoader={isLoader[Direction.Descending]}
          />
        </div>
        <Button
          text='Новый массив'
          onClick={generateNewArr}
          disabled={disabled}
        />
      </div>
      {
        (
          <div className={styles.columns}>
            {arr.map((elem, id) => {
              return <Column index={elem.value} key={id} state={elem.type}
              />
            })}
          </div>
        )
      }
    </SolutionLayout>
  );
};
