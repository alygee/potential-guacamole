import 'whatwg-fetch';
import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerSearch } from '../src/CustomerSearch';
import { fetchResponseOk } from './spyHelpers';

describe('CustomerSearch', () => {
  let renderAndWait, elements, element, clickAndWait;

  beforeEach(() => {
    ({
      renderAndWait,
      elements,
      element,
      clickAndWait
    } = createContainer());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk([]));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a table with four headings', async () => {
    await renderAndWait(<CustomerSearch />);
    const headings = elements('table th');
    expect(headings.map(h => h.textContent)).toEqual([
      'First name',
      'Last name',
      'Phone number',
      'Actions'
    ]);
  });

  it('fetches all customer data when component mounts', async () => {
    await renderAndWait(<CustomerSearch />);
    expect(window.fetch).toHaveBeenCalledWith('/customers', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    });
  });

  const oneCustomer = [
    { id: 1, firstName: 'A', lastName: 'B', phoneNumber: '1' }
  ];

  it('renders all customer data i a table row', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(oneCustomer));
    await renderAndWait(<CustomerSearch />);
    const columns = elements('table tbody td');
    expect(columns[0].textContent).toEqual('A');
    expect(columns[1].textContent).toEqual('B');
    expect(columns[2].textContent).toEqual('1');
  });

  const twoCustomers = [
    { id: 1, firstName: 'A', lastName: 'B', phoneNumber: '1' },
    { id: 2, firstName: 'C', lastName: 'D', phoneNumber: '2' }
  ];

  const tenCustomers = Array.from('0123456789', id => ({ id }));

  it('renders multiple customer rows', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(twoCustomers));
    await renderAndWait(<CustomerSearch />);
    const rows = elements('table tbody tr');
    expect(rows[1].childNodes[0].textContent).toEqual('C');
  });

  it('has a next button', async () => {
    await renderAndWait(<CustomerSearch />);
    expect(element('button#next-page')).not.toBeNull();
  });

  it('requests next page of data when next button is clicked', async () => {
    // arrange
    window.fetch.mockReturnValue(fetchResponseOk(tenCustomers));
    await renderAndWait(<CustomerSearch />);

    // act
    await clickAndWait(element('button#next-page'));

    // assert
    expect(window.fetch).toHaveBeenCalledWith(
      '/customers?after=9',
      expect.anything()
    );
  });

  it('displays next page of data when next button is clicked', async () => {
    // act
    const nextCustomer = [{ id: 'next', firstName: 'Next' }];
    window.fetch
      .mockReturnValueOnce(fetchResponseOk(tenCustomers))
      .mockReturnValue(fetchResponseOk(nextCustomer));
    await renderAndWait(<CustomerSearch />);

    // arrange
    await clickAndWait(element('button#next-page'));

    // assert
    expect(elements('tbody tr').length).toEqual(1);
    expect(elements('td')[0].textContent).toEqual('Next');
  });
});
