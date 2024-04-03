import React from 'react';
import renderer from 'react-test-renderer';

import { Circle } from "./circle";
import { ElementStates } from '../../../types/element-states';

it('Кружок без буквы рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с буквой рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю"/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с head рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" head='Рис'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с react-элементом в head рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" head={<Circle/>}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с tail рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" tail='Рис'/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с react-элементом в tail рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" tail={<Circle/>}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с index рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" index={7}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок с пропом isSmall ===  true рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" isSmall={true}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок в состоянии default рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" state={ElementStates.Default}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок в состоянии changing рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" state={ElementStates.Changing}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Кружок в состоянии modified рендерится без ошибок', () => {
  const tree = renderer
    .create(<Circle letter="Ю" state={ElementStates.Modified}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

