import React from 'react';
import { createShallowRenderer, type } from './shallowHelpers';
import { App } from '../src/App';
// import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';

describe.skip('App', () => {
  let render, elementMatching;

  beforeEach(() => {
    ({ render, elementMatching } = createShallowRenderer());
  });

  it('initially shows the AppointmentsDayViewLoader', () => {
    render(<App />);
    expect(
      elementMatching(type(AppointmentsDayViewLoader))
    ).toBeDefined();
  });
});
