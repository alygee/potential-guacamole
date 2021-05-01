import 'whatwg-fetch';
import React from 'react';
import { withEvent, createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import {
  fetchResponseOk,
  fetchResponseError,
  requestBodyOf,
} from './spyHelpers';

describe('CustomerForm', () => {
  let render, form, field, labelFor, element, change, submit, blur;

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const validCustomer = {
    firstName: 'first',
    lastName: 'last',
    phoneNumber: '123456789',
  };

  beforeEach(() => {
    ({
      render,
      form,
      field,
      labelFor,
      element,
      change,
      submit,
      blur,
    } = createContainer());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field('customer', fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field('customer', fieldName).value).toEqual('value');
    });
  const itRendersALabel = (fieldName, label) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });
  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field('customer', fieldName).id).toEqual(fieldName);
    });

  const itSubmitsNewValue = (fieldName) =>
    it('saves new value when submitted', async () => {
      const existingValue =
        fieldName === 'phoneNumber' ? '123' : 'existingValue';
      const newValue =
        fieldName === 'phoneNumber' ? '456' : 'newValue';
      render(
        <CustomerForm
          {...validCustomer}
          {...{ [fieldName]: existingValue }}
        />
      );
      change(
        field('customer', fieldName),
        withEvent(fieldName, newValue)
      );
      await submit(form('customer'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        [fieldName]: newValue,
      });
    });

  const itSubmitExistingValue = (fieldName) =>
    it('saves existing when submitted', async () => {
      const existingValue =
        fieldName === 'phoneNumber' ? '123' : 'value';
      render(
        <CustomerForm
          {...validCustomer}
          {...{ [fieldName]: existingValue }}
        />
      );

      await submit(form('customer'));

      expect(requestBodyOf(window.fetch)).toMatchObject({
        [fieldName]: existingValue,
      });
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitExistingValue('firstName');
    itSubmitsNewValue('firstName');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitExistingValue('lastName');
    itSubmitsNewValue('lastName');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitExistingValue('phoneNumber');
    itSubmitsNewValue('phoneNumber');
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    expect(element('input[type="submit"]')).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm {...validCustomer} />);

    submit(form('customer'));

    expect(window.fetch).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('renders field validation errors from server', async () => {
    const errors = {
      phoneNumber: 'Phone number already exists in the system',
    };
    window.fetch.mockReturnValue(
      fetchResponseError(422, { errors })
    );
    render(<CustomerForm {...validCustomer} />);
    await submit(form('customer'));
    expect(element('.error').textContent).toMatch(
      errors.phoneNumber
    );
  });

  it('notifies onSave when form is submitted', async () => {
    const customer = { id: 123 };
    window.fetch.mockReturnValue(fetchResponseOk(customer));
    const saveSpy = jest.fn();

    render(<CustomerForm onSave={saveSpy} {...validCustomer} />);
    await submit(form('customer'));

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    window.fetch.mockReturnValue(fetchResponseError());
    const saveSpy = jest.fn();

    render(<CustomerForm onSave={saveSpy} {...validCustomer} />);
    await submit(form('customer'));

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    render(<CustomerForm {...validCustomer} />);
    await submit(form('customer'), {
      preventDefault: preventDefaultSpy,
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(fetchResponseError());

    render(<CustomerForm {...validCustomer} />);
    await submit(form('customer'));

    expect(element('.error')).not.toBeNull();
    expect(element('.error').textContent).toMatch(
      'An error occurred during save.'
    );
  });

  it('clears error message when fetch call succeeds', async () => {
    // arrange
    window.fetch.mockReturnValueOnce(fetchResponseError());
    render(<CustomerForm {...validCustomer} />);

    await submit(form('customer'));
    expect(element('.error')).not.toBeNull();

    await submit(form('customer'));
    expect(element('.error')).toBeNull();
  });

  const itInvalidatesFieldWithValue = (
    fieldName,
    value,
    description
  ) => {
    it(`displays error after blur when ${fieldName} field is '${value}'`, () => {
      render(<CustomerForm />);

      blur(
        field('customer', fieldName),
        withEvent(fieldName, value)
      );

      expect(element('.error')).not.toBeNull();
      expect(element('.error').textContent).toMatch(description);
    });
  };

  itInvalidatesFieldWithValue(
    'firstName',
    ' ',
    'First name is required'
  );

  itInvalidatesFieldWithValue(
    'lastName',
    ' ',
    'Last name is required'
  );

  itInvalidatesFieldWithValue(
    'phoneNumber',
    ' ',
    'Phone number is required'
  );

  it('accepts standard phone number characters when validating', () => {
    render(<CustomerForm />);

    blur(
      element("[name='phoneNumber']"),
      withEvent('phoneNumber', '0123456789+()- ')
    );

    expect(element('.error')).toBeNull();
  });

  it('does not submit the form when there are validation errors', async () => {
    render(<CustomerForm />);

    await submit(form('customer'));
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('renders validation errors after submission fails', async () => {
    render(<CustomerForm />);

    await submit(form('customer'));
    expect(window.fetch).not.toHaveBeenCalled();
    expect(element('.error')).not.toBeNull();
  });
});
