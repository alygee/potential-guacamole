import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CustomerForm } from './CustomerForm';
import { AppointmentFormLoader } from './AppointmentFormLoader';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';
import { CustomerSearch } from './CustomerSearch';

export const App = () => {
  const [view, setView] = useState('dayView');
  const [customer, setCustomer] = useState();

  const transitionToAddCustomer = useCallback(
    () => setView('addCustomer'),
    []
  );

  const transitionToAddAppointment = useCallback(customer => {
    setCustomer(customer);
    setView('addAppointment');
  }, []);

  const transitionToDayView = useCallback(
    () => setView('dayView'),
    []
  );

  const transitionToSearchCustomers = useCallback(
    () => setView('searchCustomers'),
    []
  );

  const searchActions = customer => (
    <React.Fragment>
      <button
        role="button"
        onClick={() => transitionToAddAppointment(customer)}
        className="px-4 py-2 text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
        Create appointment
      </button>
    </React.Fragment>
  );

  switch (view) {
    case 'searchCustomers':
      return (
        <CustomerSearch renderCustomerActions={searchActions} />
      );
    case 'addCustomer':
      return <CustomerForm onSave={transitionToAddAppointment} />;
    case 'addAppointment':
      return (
        <AppointmentFormLoader
          customer={customer}
          onSave={transitionToDayView}
        />
      );
    case 'dayView':
      <AppointmentsDayViewLoader />;
    default:
      return (
        <React.Fragment>
          <div className="button-bar">
            <button
              type="button"
              id="addCustomer"
              onClick={transitionToAddCustomer}
              className="px-4 py-2 mr-4 text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
              Add customer and appointment
            </button>
            <button
              type="button"
              id="searchCustomers"
              onClick={transitionToSearchCustomers}
              className="px-4 py-2 text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
              Search customers
            </button>
          </div>
          <AppointmentsDayViewLoader />
        </React.Fragment>
      );
  }
};
