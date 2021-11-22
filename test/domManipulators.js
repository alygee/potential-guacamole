import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

export const withEvent = (name, value) => ({
  target: { name, value }
});

export const createContainer = () => {
  const container = document.createElement('div');

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = (formId, name) => form(formId).elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);
  const element = selector => container.querySelector(selector);
  const elements = selector =>
    Array.from(container.querySelectorAll(selector));
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      option => option.textContent === textContent
    );
  };

  const simulateEvent = eventName => (element, eventData) =>
    ReactTestUtils.Simulate[eventName](element, eventData);
  const simulateEventAndWait = eventName => async (
    element,
    eventData
  ) =>
    await act(async () =>
      ReactTestUtils.Simulate[eventName](element, eventData)
    );

  return {
    click: simulateEvent('click'),
    blur: simulateEvent('blur'),
    change: simulateEvent('change'),
    submit: simulateEventAndWait('submit'),
    clickAndWait: simulateEventAndWait('click'),
    render: component =>
      act(() => {
        ReactDOM.render(component, container);
      }),
    renderAndWait: async component =>
      await act(async () => ReactDOM.render(component, container)),
    container,
    element,
    form,
    field,
    labelFor,
    findOption,
    elements
  };
};
