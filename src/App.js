import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CustomerForm } from './CustomerForm';
import { AppointmentFormLoader } from './AppointmentFormLoader';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';

export const App = () => {
  const [view, setView] = useState('dayView');
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
  const [customer, setCustomer] = useState();

  switch (view) {
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
              onClick={transitionToAddCustomer}>
              Add customer and appointment
            </button>
          </div>
          <AppointmentsDayViewLoader />
        </React.Fragment>
      );
  }
};
