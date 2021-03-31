import React from 'react';
import 'whatwg-fetch';
import {
  fetchResponseOk,
  fetchResponseError,
  requestBodyOf
} from './spyHelpers';
import { createContainer, withEvent } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  const customer = { id: 123 };
  let render,
    form,
    field,
    labelFor,
    findOption,
    element,
    elements,
    submit,
    change;

  beforeEach(() => {
    ({
      render,
      form,
      field,
      labelFor,
      findOption,
      element,
      elements,
      submit,
      change
    } = createContainer());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<AppointmentForm />);
    expect(element('input[type=submit]')).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', async () => {
    render(<AppointmentForm customer={customer} />);
    await submit(form('appointment'));
    expect(window.fetch).toHaveBeenCalledWith(
      '/appointments',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      })
    );
  });

  it('notifies onSave when form is submitted', async () => {
    const saveSpy = jest.fn();
    render(
      <AppointmentForm onSave={saveSpy} customer={customer} />
    );

    await submit(form('appointment'));

    expect(saveSpy).toHaveBeenCalled();
  });

  it('does not notify onSave if the POST request return an error', async () => {
    window.fetch.mockReturnValue(fetchResponseError());
    const saveSpy = jest.fn();
    render(
      <AppointmentForm onSave={saveSpy} customer={customer} />
    );

    await submit(form('appointment'));

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    render(<AppointmentForm customer={customer} />);
    await submit(form('appointment'), {
      preventDefault: preventDefaultSpy
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(fetchResponseError());
    render(<AppointmentForm customer={customer} />);

    await submit(form('appointment'));

    expect(element('.error')).not.toBeNull();
    expect(element('.error').textContent).toMatch(
      'An error occurred during save.'
    );
  });

  it('clears error message when fetch call succeeds', async () => {
    window.fetch.mockReturnValueOnce(fetchResponseError());
    window.fetch.mockReturnValue(fetchResponseOk());
    render(<AppointmentForm customer={customer} />);

    await submit(form('appointment'));
    await submit(form('appointment'));

    expect(element('.error')).toBeNull();
  });

  it('passes the customer id to fetch when submitting', async () => {
    render(<AppointmentForm customer={customer} />);

    await submit(form('appointment'));

    expect(requestBodyOf(window.fetch)).toMatchObject({
      customer: customer.id
    });
  });

  const itSubmitsNewValue = (fieldName, props = {}) => {
    it('saves new value when submitted', async () => {
      render(
        <AppointmentForm
          {...props}
          {...{ [fieldName]: 'existingValue' }}
        />
      );

      change(
        field('appointment', fieldName),
        withEvent(fieldName, 'newValue')
      );
      await submit(form('appointment'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        [fieldName]: 'newValue'
      });
    });
  };

  const itSubmitsExistingValue = (fieldName, props = {}) => {
    it('saves existing value when submitted', async () => {
      render(
        <AppointmentForm
          {...props}
          {...{ [fieldName]: 'value' }}
        />
      );

      await submit(form('appointment'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        [fieldName]: 'value'
      });
    });
  };

  describe('service field', () => {
    itSubmitsNewValue('service', { customer });
    itSubmitsExistingValue('service', { customer });

    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('appointment', 'service')).not.toBeNull();
      expect(field('appointment', 'service').tagName).toEqual(
        'SELECT'
      );
    });

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('appointment', 'service')
        .childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });

    it('lists all salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm selectableServices={selectableServices} />
      );
      const optionNodes = Array.from(
        field('appointment', 'service').childNodes
      );
      const renderedServices = optionNodes.map(
        node => node.textContent
      );
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
        />
      );
      const option = findOption(
        field('appointment', 'service'),
        'Blow-dry'
      );
      expect(option.selected).toBeTruthy();
    });

    it('renders a label', () => {
      render(<AppointmentForm />);

      expect(labelFor('service')).not.toBeNull();
      expect(labelFor('service').textContent).toEqual(
        'Choose a service:'
      );
    });

    it('assigns an id that matches the label id', () => {
      render(<AppointmentForm />);

      expect(field('appointment', 'service').id).toEqual(
        'service'
      );
    });
  });

  describe('time slot table', () => {
    const timeSlotTableElement = selector =>
      element('table#time-slots').querySelector(selector);
    const timeSlotTableElements = selector =>
      element('table#time-slots').querySelectorAll(selector);
    const startsAtField = index =>
      elements(`input[name="startsAt"]`)[index];

    const today = new Date();
    const availableTimeSlots = [
      { startsAt: today.setHours(9, 0, 0, 0) },
      { startsAt: today.setHours(9, 30, 0, 0) }
    ];

    it('renders a table for time slots', () => {
      render(<AppointmentForm />);

      expect(element('table#time-slots')).not.toBeNull();
    });

    it('renders a time slot for every half an hour between open and close times', () => {
      render(
        <AppointmentForm salonOpensAt={9} salonClosesAt={11} />
      );
      const timesOfDay = timeSlotTableElements('tbody >* th');
      expect(timesOfDay).toHaveLength(4);
      expect(timesOfDay[0].textContent).toEqual('09:00');
      expect(timesOfDay[1].textContent).toEqual('09:30');
      expect(timesOfDay[3].textContent).toEqual('10:30');
    });

    it('renders an empty cell at the start of the header row', () => {
      render(<AppointmentForm />);
      const headerRow = timeSlotTableElement('thead > tr');
      expect(headerRow.firstChild.textContent).toEqual('');
    });

    it('renders a week of available dates', () => {
      const today = new Date(2018, 11, 1);
      render(<AppointmentForm today={today} />);
      const dates = timeSlotTableElements(
        'thead >* th:not(:first-child)'
      );
      expect(dates).toHaveLength(7);
      expect(dates[0].textContent).toEqual('Sat 01');
      expect(dates[1].textContent).toEqual('Sun 02');
      expect(dates[6].textContent).toEqual('Fri 07');
    });

    it('renders a radio button for each time slot', () => {
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      const cells = timeSlotTableElements('td');
      expect(
        cells[0].querySelector('input[type="radio"]')
      ).not.toBeNull();
      expect(
        cells[7].querySelector('input[type="radio"]')
      ).not.toBeNull();
    });

    it('does not render radio buttons for unabailable time slots', () => {
      render(<AppointmentForm availableTimeSlots={[]} />);
      const timesOfDay = timeSlotTableElements('input');
      expect(timesOfDay).toHaveLength(0);
    });

    it('sets radio button values to the startsAt of the corresponding appointment', () => {
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      expect(startsAtField(0).value).toEqual(
        availableTimeSlots[0].startsAt.toString()
      );
      expect(startsAtField(1).value).toEqual(
        availableTimeSlots[1].startsAt.toString()
      );
    });

    it('pre-selects the existing value', () => {
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
        />
      );
      expect(startsAtField(0).checked).toEqual(true);
    });

    it('saves existing value when submitted', async () => {
      render(
        <AppointmentForm
          customer={customer}
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
        />
      );
      await submit(form('appointment'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        startsAt: availableTimeSlots[0].startsAt
      });
    });

    it('saves new value when submitted', async () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) }
      ];
      render(
        <AppointmentForm
          customer={customer}
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
        />
      );

      change(startsAtField(1), {
        target: {
          value: availableTimeSlots[1].startsAt.toString(),
          name: 'startsAt'
        }
      });
      submit(form('appointment'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        startsAt: availableTimeSlots[1].startsAt
      });
    });
  });
});
