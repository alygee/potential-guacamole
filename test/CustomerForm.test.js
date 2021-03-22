import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

const spy = () => {
  let receivedArguments;
  return {
    fn: (...args) => (receivedArguments = args),
    receivedArguments: () => receivedArguments,
    receivedArgument: n => receivedArguments[n]
  };
};

expect.extend({
  toHaveBeenCalled(received) {
    if (received.receivedArguments() === 'undefined') {
      return {
        pass: false,
        message: () => 'Spy was not called.'
      };
    }
    return { pass: true, message: () => 'Spy was called.' };
  }
});

describe('CustomerForm', () => {
  let render, container, fetchSpy;
  const originalFetch = window.fetch;
  const form = id => container.querySelector(`form[id="${id}"]`);
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };
  const field = name => form('customer').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
    fetchSpy = spy();
    window.fetch = fetchSpy.fn;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = fieldName =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });
  const itRendersALabel = (fieldName, label) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });
  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsNewValue = fieldName =>
    it('saves new value when submitted', () => {
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          fetch={fetchSpy.fn}
        />
      );
      ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value: 'newValue', name: fieldName }
      });
      ReactTestUtils.Simulate.submit(form('customer'));

      const fetchOpts = fetchSpy.receivedArgument(1);
      expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(
        'newValue'
      );
    });

  const itSubmitExistingValue = fieldName =>
    it('saves existing when submitted', () => {
      render(
        <CustomerForm
          {...{ [fieldName]: 'value' }}
          fetch={fetchSpy.fn}
        />
      );
      ReactTestUtils.Simulate.submit(form('customer'));

      const fetchOpts = fetchSpy.receivedArgument(1);
      expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual(
        'value'
      );
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
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm fetch={fetchSpy.fn} />);
    ReactTestUtils.Simulate.submit(form('customer'));
    expect(fetchSpy).toHaveBeenCalled();
    expect(fetchSpy.receivedArgument(0)).toEqual('/customers');

    const fetchOpts = fetchSpy.receivedArgument(1);
    expect(fetchOpts.method).toEqual('POST');
    expect(fetchOpts.credentials).toEqual('same-origin');
    expect(fetchOpts.headers).toEqual({
      'Content-Type': 'application/json'
    });
  });
});
