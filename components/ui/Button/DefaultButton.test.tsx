import React from 'react';
import DefaultButton from './DefaultButton';
// import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('DefaultButton', () => {
  const props = {
    children: 'ほげほげ',
    onClick: jest.fn(),
  };
  it('onClickが呼ばれるか', () => {
    const { getByTestId } = render(<DefaultButton {...props} />);

    fireEvent.click(getByTestId('defaultButton'));

    expect(props.onClick).toHaveBeenCalled();
  });
  it('snapShot', () => {
    const tree = renderer.create(<DefaultButton {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
