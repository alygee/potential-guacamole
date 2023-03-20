import React from 'react';
import {
  initializeReactContainer,
  container,
  render,
  element,
} from '../domManipulators';
import { Link } from 'react-router-dom';
import { ToggleRouterButton } from '../../src/CustomerSearch/ToggleRouterButton';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ children }) => <div id="Link">{children}</div>),
}));

describe('ToggleRouterButton', () => {
  const queryParams = { a: '123', b: '234' };

  beforeEach(() => {
    initializeReactContainer();
  });

  it('renders a Link', () => {
    // render(<ToggleRouterButton queryParams={queryParams} />);
    //expect(container.firstChild).toEqual(element('#Link'));
  });
});
