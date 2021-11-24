import React, { useEffect, useState, useCallback } from 'react';

const CustomerRow = ({ customer, renderCustomerActions }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
    <td>{renderCustomerActions(customer)}</td>
  </tr>
);

const SearchButtons = ({ handleNext, handlePrevious }) => (
  <div className="button-bar">
    <button
      role="button"
      id="previous-page"
      onClick={handlePrevious}>
      Previous
    </button>
    <button role="button" id="next-page" onClick={handleNext}>
      Next
    </button>
  </div>
);

export const CustomerSearch = ({ renderCustomerActions }) => {
  const [customers, setCustomers] = useState([]);
  const [lastRowIds, setLastRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm = ({ target: { value } }) =>
    setSearchTerm(value);

  const handleNext = useCallback(async () => {
    const currentLastRowId = customers[customers.length - 1].id;
    setLastRowIds([...lastRowIds, currentLastRowId]);
  }, [customers, lastRowIds]);

  const handlePrevious = useCallback(() => {
    setLastRowIds(lastRowIds.slice(0, -1));
  }, [lastRowIds]);

  const searchParams = (after, searchTerm) => {
    let pairs = [];
    if (after) {
      pairs.push(`after=${after}`);
    }
    if (searchTerm) {
      pairs.push(`searchTerm=${searchTerm}`);
    }
    if (pairs.length > 0) {
      return `?${pairs.join('&')}`;
    }
    return '';
  };

  useEffect(() => {
    const fetchData = async () => {
      let after;

      if (lastRowIds.length > 0) {
        after = lastRowIds[lastRowIds.length - 1];
      }
      const queryString = searchParams(after, searchTerm);

      const result = await window.fetch(
        `/customers${queryString}`,
        {
          method: 'GET',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setCustomers(await result.json());
    };

    fetchData();
  }, [lastRowIds, searchTerm]);

  return (
    <React.Fragment>
      <input
        placeholder="Enter filter text"
        onChange={handleSearchTerm}
      />
      <SearchButtons
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <CustomerRow
              customer={customer}
              key={customer.id}
              renderCustomerActions={renderCustomerActions}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

CustomerSearch.defaultProps = {
  renderCustomerActions: () => {}
};
