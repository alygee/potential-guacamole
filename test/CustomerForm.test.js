import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;
  const form = id => container.querySelector(`form[id="${id}"]`);
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };
  const field = () => form('customer').elements.firstName;
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
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
  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      await ReactTestUtils.Simulate.change(field(), {
        target: { value }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  const itSubmitExistingValue = fieldName =>
    it('saves existing when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual('existingValue')
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitExistingValue('firstName');
    itSubmitsNewValue('firstName', 'firstName');
  });
});
