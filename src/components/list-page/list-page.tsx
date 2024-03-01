import styles from './list-page.module.css'
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { Stack } from '../../utils/stack';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { LinkedList } from '../../utils/linked-list';
import { ArrowIcon } from '../ui/icons/arrow-icon';


let linkedList = new LinkedList<string>();

export const ListPage: React.FC = () => {

  const [newElem, setNewElem] = useState<string>('');

  const [index, setIndex] = useState<number | null>(null);

  const [editedElement, setEditedElement] = useState<{ value: string | null; state: ElementStates; id: number | null }>({ value: null, state: ElementStates.Changing, id: null })

  const [addDisabled, setAddDisabled] = useState(true);

  const [delDisabled, setDelDisabled] = useState(true);

  const [arr, setArr] = useState<string[]>([]);

  const [isMethod, setIsMethod] = useState(false);

  const handleChangeNewElement = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNewElem('');
      setAddDisabled(true);
      return
    }
    setNewElem(e.target.value);
    setAddDisabled(false);
  }

  const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIndex(null);
      setAddDisabled(true);
      return
    }
    setIndex(Number(e.target.value));
    setAddDisabled(false);
  }

  const animateMethod = async () => {
    setIsMethod(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsMethod(false);
  }

  const addInHead = async () => {
    linkedList.prepend(newElem);
    setArr(linkedList.print());
    setNewElem('');
    setAddDisabled(true);
    setDelDisabled(false);
    animateMethod();

  }

  const addInTail = async () => {
    linkedList.append(newElem);
    setArr(linkedList.print());
    setNewElem('');
    setAddDisabled(true);
    setDelDisabled(false);
    animateMethod();

  }

  const deleteHead = async () => {
    await animateMethod();
    linkedList.deleteHead();
    setArr(linkedList.print());
    if (linkedList.getSize() <= 0) {
      setDelDisabled(true);
    }
  }

  const deleteTail = async () => {
    await animateMethod();
    linkedList.deleteTail();
    setArr(linkedList.print());
    if (linkedList.getSize() <= 0) {
      setDelDisabled(true);
    }
  }


  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controlPanel}>
        <div className={styles.main}>
          <Input
            placeholder="Введите значение"
            extraClass={styles.input}
            type='text'
            maxLength={4}
            isLimitText
            value={newElem}
            onChange={handleChangeNewElement}
          />
          <Button
            text='Добавить в head'
            extraClass={styles.button}
            onClick={addInHead}
            disabled={addDisabled}
          />
          <Button
            text='Добавить в tail'
            extraClass={styles.button}
            onClick={addInTail}
            disabled={addDisabled}
          />
          <Button
            text='Удалить из head'
            extraClass={styles.button}
            onClick={deleteHead}
            disabled={delDisabled}
          />
          <Button
            text='Удалить из tail'
            extraClass={styles.button}
            onClick={deleteTail}
            disabled={delDisabled}
          />
        </div>
        <div className={styles.main}>
          <Input
            placeholder="Введите индекс"
            extraClass={styles.input}
            type='number'
            min={0}
            value={index?.toString()}
            onChange={handleChangeIndex}
          />
          <Button
            text='Добавить по индексу'
            extraClass={styles.button}
            onClick={deleteTail}
            disabled={addDisabled}
          />
          <Button
            text='Удалить по индексу'
            extraClass={styles.button}
            onClick={deleteTail}
            disabled={delDisabled}
          />
        </div>
      </div>
      {
        (
          <div className={styles.circles}>
            {arr.map((elem, id) => {

              return (id === 0)
                ? (<Circle
                  letter={elem}
                  key={id}
                  state={(isMethod && id === arr.length - 1) ? ElementStates.Changing : ElementStates.Default}
                  index={id}
                  head={id === 0 ? 'head' : ''}
                  tail={id != 0 && id === arr.length - 1 ? 'tail' : ''}
                />)
                : (<div className={styles.circleContainer} key={id}>
                  <ArrowIcon/>
                  <Circle
                    letter={elem}
                    key={id}
                    state={(isMethod && id === arr.length - 1) ? ElementStates.Changing : ElementStates.Default}
                    index={id}
                    head={id === 0 ? 'head' : ''}
                    tail={id != 0 && id === arr.length - 1 ? 'tail' : ''}
                  />
                </div>)
            })}
          </div>
        )
      }
    </SolutionLayout>
  );
};
