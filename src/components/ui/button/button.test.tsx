import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from "./button";

it('Кнопка с текстом рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button text="Надпись"/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кнопка без текста рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button disabled/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button isLoader = {true}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Нажатие на кнопку вызывает корректное действие', () => {
  window.alert = jest.fn();

      //Объявляем функцию калбек
  const handleClick = () => {
    alert('Нет войне!')
  }
      // Рендерим компонент
  render(<Button text="Наше мнение" onClick={handleClick}/>)

      // Находим элемент ссылки
    const button = screen.getByText("Наше мнение");

      // Имитируем нажатие на ссылку
  fireEvent.click(button);
      
      // Проверяем, что alert сработал с правильным текстом предупреждения
  expect(window.alert).toHaveBeenCalledWith('Нет войне!');
}); 