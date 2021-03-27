import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';

import {
  Appointment,
  AppointmentsDayView
} from '../src/AppointmentsDayView';

let customer;

describe('Appointment', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Jordan');
  });
});

describe('AppointmentsDayView', () => {
  let today;
  let appointments;
  let render, container, element, elements;

  beforeEach(() => {
    ({ render, container, element, elements } = createContainer());
    today = new Date();
    appointments = [
      {
        startsAt: today.setHours(12, 0),
        customer: { firstName: 'Ashley' }
      },
      {
        startsAt: today.setHours(13, 0),
        customer: { firstName: 'Jordan' }
      }
    ];
  });

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element('div#appointmentsDayView')).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(element('ol')).not.toBeNull();
    expect(element('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(elements('li')).toHaveLength(2);
    expect(elements('li')[0].textContent).toEqual('12:00');
    expect(elements('li')[1].textContent).toEqual('13:00');
  });

  it('initially shows a message saying there are not appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(elements('li > button')).toHaveLength(2);
    expect(elements('li > button')[0].type).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch('Jordan');
  });
});
