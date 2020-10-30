import React from 'react';
import DefaultButton from './DefaultButton';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

describe('DefaultButton', () => {
  const props = {
    children: 'ふがふが',
    onClick: jest.fn(),
  };
  it('onClickが呼ばれるか', () => {
    const { getByTestId } = render(<DefaultButton {...props} />);

    fireEvent.click(getByTestId('defaultButton'));

    expect(props.onClick).toHaveBeenCalled();
  });
});
