import styles from './queue-page.module.css'
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { Stack } from '../../utils/stack';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Queue } from '../../utils/queue';
import { Loader } from '../../types/loaders';

let queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {

  const [newElem, setNewElem] = useState<string>('');

  const [head, setHead] = useState<number | null>(null);

  const [tail, setTail] = useState<number | null>(null);

  const [addDisabled, setAddDisabled] = useState(true);

  const [delDisabled, setDelDisabled] = useState(true);

  const [arr, setArr] = useState<(string | null)[]>(queue.elements());

  const [isEnqueue, setIsEnqueue] = useState(false);

  const [isDequeue, setIsDequeue] = useState(false);

  const [isLoader, setIsLoader] = useState<Loader | null>(null);

  useEffect(() => {
    queue.clear();
    setArr(queue.elements());
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNewElem('');
      setAddDisabled(true);
      return
    }
    if (queue.isFull()) {
      setNewElem(e.target.value);
      setAddDisabled(true);
      return
    }
    setNewElem(e.target.value);
    setAddDisabled(false);
  }

  const animateDequeue = async () => {
    setIsDequeue(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsDequeue(false);
  }

  const animateEnqueue = async () => {
    setIsEnqueue(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsEnqueue(false);
  }

  const addElement = async () => {
    setIsLoader(Loader.Add);
    setDelDisabled(true);
    queue.enqueue(newElem);
    setArr(queue.elements());
    setHead(queue.getHead());
    setTail(queue.getTail());
    setNewElem('');
    setAddDisabled(true);    
    await animateEnqueue();
    setDelDisabled(false);
    setIsLoader(null);

  }

  const deleteElement = async () => {
    setIsLoader(Loader.Del);
    setDelDisabled(true);
    await animateDequeue();
    queue.dequeue();
    setHead(queue.getHead());
    setTail(queue.getTail());
    setArr(queue.elements());    
    if (queue.isEmpty()) {
      setTail(null);
      setHead(null);
    } else {
      setDelDisabled(false);
    }
    setIsLoader(null);
  }

  const clearQueue = async () => {
    queue.clear();
    setArr(queue.elements());
    setDelDisabled(true);
    setNewElem('');
    setAddDisabled(true);
    setTail(null);
    setHead(null);
  }

  return (
    <SolutionLayout title="Очередь">
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
            onClick={addElement}
            disabled={addDisabled}
            isLoader={isLoader === Loader.Add ? true : false}
          />
          <Button
            text='Удалить'
            extraClass={styles.button}
            onClick={deleteElement}
            disabled={delDisabled}
            isLoader={isLoader === Loader.Del ? true : false}
          />
        </div>
        <Button
          text='Очистить'
          extraClass={styles.button}
          onClick={clearQueue}
          disabled={delDisabled}
        />
      </div>
      {
        (
          <div className={styles.circles}>
            {arr.map((elem, id) => {
              return <Circle
                letter={elem || ''}
                key={id}
                state={((isEnqueue && ((tail && id === tail - 1) || (arr[arr.length - 1] && tail === 0 && id === arr.length - 1))) || (isDequeue && id === head)) 
                  ? ElementStates.Changing 
                  : ElementStates.Default}
                index={id}
                head={id === head ? 'head' : ''}
                tail={((tail && id === tail - 1) || (arr[arr.length - 1] && tail === 0 && id === arr.length - 1)) 
                  ? 'tail' 
                  : ''}
              />
            })}
          </div>
        )
      }
    </SolutionLayout>
  );
};
