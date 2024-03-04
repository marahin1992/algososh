import styles from './list-page.module.css'
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { Stack } from '../../utils/stack';
import { delay } from '../../utils/delay';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { LinkedList } from '../../utils/linked-list';
import { ArrowIcon } from '../ui/icons/arrow-icon';

export enum ListLoading {
  addHead ='addHead',
  delHead ='delHead',
  addTail ='addTail',
  delTail ='delTail',
  idAdd ='idAdd',
  idDel ='idDel',
}


let linkedList = new LinkedList<string>();

export const ListPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState<ListLoading | null>(null)

  const [stateArr, setStateArr] = useState<ElementStates[]>([])
  
  const [newElem, setNewElem] = useState<string>('');

  const [index, setIndex] = useState<number | ''>('');

  const [editedElement, setEditedElement] = useState<{ value: string | undefined; state: ElementStates; id: number | null; head: boolean }>({ value: undefined, state: ElementStates.Changing, id: null, head: true })

  const [addDisabled, setAddDisabled] = useState(true);

  const [delDisabled, setDelDisabled] = useState(true);

  const [idAddDisabled, setIdAddDisabled] = useState(true);

  const [idDelDisabled, setIdDelDisabled] = useState(true);

  const [arr, setArr] = useState<string[]>([]);

  const disableAll = () => {
    setAddDisabled(true);
    setDelDisabled(true);
    setIdAddDisabled(true);
    setIdDelDisabled(true);
  }

  const handleChangeNewElement = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNewElem('');
      setAddDisabled(true);
      setIdAddDisabled(true);
      return
    }
    setNewElem(e.target.value);
    setAddDisabled(false);
    if (index !== '') {
      setIdAddDisabled(false);
    }
  }

  const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIndex('');
      setIdAddDisabled(true);
      setIdDelDisabled(true);
      return
    }
    setIndex(Number(e.target.value));
    if (Number(e.target.value) >= 0 && Number(e.target.value) <= arr.length - 1){
      if (!addDisabled) {setIdAddDisabled(false);};
      if (!delDisabled) {setIdDelDisabled(false);};
    }
  }


  const addInHead = async () => {
    setIsLoading(ListLoading.addHead);
    disableAll();
    linkedList.prepend(newElem);
    setEditedElement({...editedElement, value: newElem, id: 0, head: true});
    setNewElem('');
    setIndex('');
    await delay(DELAY_IN_MS);
    setArr(linkedList.print());
    setEditedElement({...editedElement, value: undefined, id: null, head: true});
    setStateArr(linkedList.print().map((el, id) => {return (id === 0) ? ElementStates.Modified : ElementStates.Default}))
    await delay(DELAY_IN_MS);
    setStateArr(arr.map((el, id) => {return ElementStates.Default}))
    
    setAddDisabled(true);
    setDelDisabled(false);
    setIsLoading(null);
  }

  const addInTail = async () => {
    setIsLoading(ListLoading.addTail);
    disableAll();
    linkedList.append(newElem);
    setEditedElement({...editedElement, value: newElem, id: arr.length - 1, head: true});
    setNewElem('');
    setIndex('');
    await delay(DELAY_IN_MS);
    setArr(linkedList.print());
    setEditedElement({...editedElement, value: undefined, id: null, head: true});
    setStateArr(linkedList.print().map((el, id) => {return (id === arr.length) ? ElementStates.Modified : ElementStates.Default}))
    await delay(DELAY_IN_MS);
    setStateArr(arr.map((el, id) => {return ElementStates.Default}))
    setAddDisabled(true);
    setDelDisabled(false);
    setIsLoading(null);

  }

  const deleteHead = async () => {
    setIsLoading(ListLoading.delHead);
    disableAll();
    linkedList.deleteHead();
    setEditedElement({...editedElement, value: arr[0], id: 0, head: false});
    setArr(arr.map((el,id) => {return id === 0 ? '' : el}));
    await delay(DELAY_IN_MS);
    setEditedElement({...editedElement, value: undefined, id: null, head: true});
    setArr(linkedList.print());
    setDelDisabled(false);
    if (linkedList.getSize() <= 0) {
      setDelDisabled(true);
    }
    setIsLoading(null);
  }

  const deleteTail = async () => {
    setIsLoading(ListLoading.delTail);
    disableAll();
    linkedList.deleteTail();
    setEditedElement({...editedElement, value: arr[arr.length - 1], id: arr.length - 1, head: false});
    setArr(arr.map((el,id) => {return id === arr.length - 1 ? '' : el}));
    await delay(DELAY_IN_MS);
    setEditedElement({...editedElement, value: undefined, id: null, head: true});
    setArr(linkedList.print());
    setDelDisabled(false);
    if (linkedList.getSize() <= 0) {
      setDelDisabled(true);
    }
    setIsLoading(null);
  }

  const handleAddByIndex = async () => {
    if (index === '' || index > arr.length - 1) {
      alert('введите корректный индекс');
      return
    }
    setIsLoading(ListLoading.idAdd);
    disableAll();
    let elem = newElem;
    let elemId = index;
    
    linkedList.addByIndex(newElem,index);
    setNewElem('');
    setIndex('');

    for (let i = 0; i <= index; i++) {
      setStateArr(stateArr.map((el,id) => {return id <= i - 1 ? ElementStates.Changing : el}));
      setEditedElement({...editedElement, value: elem, id: i, head: true});
      await delay(DELAY_IN_MS);
    }
    setEditedElement({...editedElement, value: undefined, id: null, head: true});
    setArr(linkedList.print());
    setStateArr(linkedList.print().map((el, id) => {return id === elemId ? ElementStates.Modified : ElementStates.Default}));
    await delay(DELAY_IN_MS);
    setStateArr(stateArr.map(() => {return ElementStates.Default}));
    setDelDisabled(false);
    setIsLoading(null);
  }

  const handleDeleteByIndex = async () => {
    if (index === '' || index > arr.length - 1) {
      alert('введите корректный индекс');
      return
    }
    setIsLoading(ListLoading.idDel);
    disableAll();
    linkedList.deleteByIndex(index);

    for (let i = 0; i <= index; i++) {
      setStateArr(stateArr.map((el,id) => {return id <= i ? ElementStates.Changing : el}));
      await delay(DELAY_IN_MS);
    }
    setEditedElement({...editedElement, value: arr[index], id: index, head: false});
    setArr(arr.map((el,id) => {return id === index ? '' : el}));
    await delay(DELAY_IN_MS);

    setArr(linkedList.print());
    setStateArr(linkedList.print().map(() => {return ElementStates.Default}));
    setEditedElement({...editedElement, value: undefined, id: null, head: false});


    setIndex('');


    setDelDisabled(false);
    if (linkedList.getSize() <= 0) {
      setDelDisabled(true);
    }
    setIsLoading(null);
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
            isLoader={isLoading === ListLoading.addHead ? true : false}
          />
          <Button
            text='Добавить в tail'
            extraClass={styles.button}
            onClick={addInTail}
            disabled={addDisabled}
            isLoader={isLoading === ListLoading.addTail ? true : false}
          />
          <Button
            text='Удалить из head'
            extraClass={styles.button}
            onClick={deleteHead}
            disabled={delDisabled}
            isLoader={isLoading === ListLoading.delHead ? true : false}
          />
          <Button
            text='Удалить из tail'
            extraClass={styles.button}
            onClick={deleteTail}
            disabled={delDisabled}
            isLoader={isLoading === ListLoading.delTail ? true : false}
          />
        </div>
        <div className={styles.main}>
          <Input
            placeholder="Введите индекс"
            extraClass={styles.input}
            type='number'
            min={0}
            max={arr.length - 1}
            value={index?.toString()}
            onChange={handleChangeIndex}
          />
          <Button
            text='Добавить по индексу'
            extraClass={styles.button}
            onClick={handleAddByIndex}
            disabled={idAddDisabled}
            isLoader={isLoading === ListLoading.idAdd ? true : false}
          />
          <Button
            text='Удалить по индексу'
            extraClass={styles.button}
            onClick={handleDeleteByIndex}
            disabled={idDelDisabled}
            isLoader={isLoading === ListLoading.idDel ? true : false}
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
                  state={stateArr[id] ? stateArr[id] : ElementStates.Default}
                  index={id}
                  head={(editedElement.id === id && editedElement.head === true)
                    ? (<Circle letter={editedElement.value} isSmall={true} state={editedElement.state}/>) 
                    : (id === 0 ? 'head' : '')}
                  tail={(editedElement.id === id && editedElement.head === false)
                    ? (<Circle letter={editedElement.value} isSmall={true} state={editedElement.state}/>) 
                    : (id != 0 && id === arr.length - 1 ? 'tail' : '')}
                />)
                : (<div className={styles.circleContainer} key={id}>
                  <ArrowIcon/>
                  <Circle
                    letter={elem}
                    key={id}
                    state={stateArr[id] ? stateArr[id] : ElementStates.Default}
                    index={id}
                    head={(editedElement.id === id && editedElement.head === true)
                      ? (<Circle letter={editedElement.value} isSmall={true} state={editedElement.state}/>) 
                      : (id === 0 ? 'head' : '')}
                    tail={(editedElement.id === id && editedElement.head === false)
                      ? (<Circle letter={editedElement.value} isSmall={true} state={editedElement.state}/>) 
                      : (id != 0 && id === arr.length - 1 ? 'tail' : '')}
                  />
                </div>)
            })}
          </div>
        )
      }
    </SolutionLayout>
  );
};
