import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  initializeReactContainer,
  renderWithRouter,
} from './reactTestExtensions';
import { App } from '../src/App';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';
import { CustomerForm } from '../src/CustomerForm';
import { AppointmentFormLoader } from '../src/AppointmentFormLoader';
import { CustomerSearch } from '../src/CustomerSearch';

jest.mock('../src/AppointmentsDayViewLoader', () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));

jest.mock('../src/CustomerForm', () => ({
  CustomerForm: jest.fn(() => (
    <div id="CustomerForm" />
  )),
}));

jest.mock('../src/AppointmentFormLoader', () => ({
  AppointmentFormLoader: jest.fn(() => (
    <div id="AppointmentFormLoader" />
  )),
}));

jest.mock('../src/CustomerSearch', () => ({
  CustomerSearch: jest.fn(() => (
    <div id="CustomerSearch" />
  )),
}));

describe.only('App', () => {
  let render, elementMatching, child;
  const beginAddingCustomerAndAppointment = () => {
    render(<App />);
    click(elementMatching(id('addCustomer')));
  };
  const saveCustomer = (customer) =>
    elementMatching(type(CustomerForm)).props.onSave(customer);
  const saveAppointment = () =>
    elementMatching(type(AppointmentFormLoader)).props.onSave();

  beforeEach(() => {
    initializeReactContainer();
  });

  it.only('initially shows the AppointmentsDayViewLoader', () => {
    renderWithRouter(<App />);
    expect(AppointmentsDayViewLoader).toBeRendered();
  });

  it('has a button bar as the first child', () => {
    render(<App />);
    expect(child(0).type).toEqual('div');
    expect(child(0).props.className).toEqual('button-bar');
  });

  it('has a button to initiate add customer and appointment action', () => {
    render(<App />);
    const buttons = childrenOf(
      elementMatching(className('button-bar'))
    );

    expect(buttons[0].type).toEqual('button');
    expect(buttons[0].props.children).toEqual(
      'Add customer and appointment'
    );
  });

  it('displays the CustomerForm when buttons is clicked', async () => {
    beginAddingCustomerAndAppointment();
    expect(elementMatching(type(CustomerForm))).toBeDefined();
  });

  it('hides the AppointmentDayViewLoader when button is clicked', () => {
    beginAddingCustomerAndAppointment();
    expect(
      elementMatching(type(AppointmentsDayViewLoader))
    ).not.toBeDefined();
  });

  it('hides the button bar when CustomerForm is being displayed', () => {
    beginAddingCustomerAndAppointment();
    expect(
      elementMatching(className('button-bar'))
    ).not.toBeDefined();
  });

  it('displays the AppointmentFormLoader after the CustomerForm is submitted', () => {
    beginAddingCustomerAndAppointment();
    saveCustomer();

    expect(
      elementMatching(type(AppointmentFormLoader))
    ).toBeDefined();
  });

  it('passes the customer to the AppointmentForm', () => {
    const customer = { id: 123 };

    beginAddingCustomerAndAppointment();
    saveCustomer(customer);

    expect(
      elementMatching(type(AppointmentFormLoader)).props.customer
    ).toBe(customer);
  });

  it('renders AppointmentDayViewLoader after AppointmentForm is submitted', () => {
    beginAddingCustomerAndAppointment();
    saveCustomer();
    saveAppointment();

    expect(
      elementMatching(type(AppointmentsDayViewLoader))
    ).toBeDefined();
  });

  describe.skip('search customers', () => {
    it('has a button to search customers', () => {
      render(<App />);
      const buttons = childrenOf(
        elementMatching(className('button-bar'))
      );
      expect(buttons[1].type).toEqual('button');
      expect(buttons[1].props.children).toEqual(
        'Search customers'
      );
    });

    const searchCustomersTransiiton = () => {
      render(<App />);
      click(elementMatching(id('searchCustomers')));
    };

    it('displays the CustomerSearch when button is clicked', async () => {
      searchCustomersTransiiton();
      expect(elementMatching(type(CustomerSearch))).toBeDefined();
    });

    const renderSearchActionsForCustomer = (customer) => {
      searchCustomersTransiiton();
      const customerSearchComponent = elementMatching(
        type(CustomerSearch)
      );
      const searchActionsComponent =
        customerSearchComponent.props.renderCustomerActions;
      return searchActionsComponent(customer);
    };

    it('passes a button to the CustomerSearch named Create appointment', () => {
      const button = childrenOf(
        renderSearchActionsForCustomer()
      )[0];
      expect(button).toBeDefined();
      expect(button.type).toEqual('button');
      expect(button.props.role).toEqual('button');
      expect(button.props.children).toEqual('Create appointment');
    });

    it('clicking appointment button shows the appointment form for that customer', async () => {
      const customer = { id: 123 };
      const button = childrenOf(
        renderSearchActionsForCustomer(customer)
      )[0];
      click(button);

      expect(
        elementMatching(type(AppointmentFormLoader))
      ).not.toBeNull();

      expect(
        elementMatching(type(AppointmentFormLoader)).props.customer
      ).toBe(customer);
    });
  });
});
