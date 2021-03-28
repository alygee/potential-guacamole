import React, { useState } from 'react';

const Error = () => (
  <div className="error">An error occurred during save.</div>
);

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSave
}) => {
  const [error, setError] = useState(false);
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber
  });
  const handleChange = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      [target.name]: target.value
    }));
  const handleSubmit = async e => {
    e.preventDefault();

    const result = await window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
    if (result.ok) {
      setError(false);
      const customerWithId = await result.json();
      onSave(customerWithId);
    } else {
      setError(true);
    }
  };
  return (
    <div className="container w-full max-w-sm pt-20 mx-auto">
      <form
        id="customer"
        onSubmit={handleSubmit}
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        { error ? <Error /> : null }
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-bold text-gray-700">
              First name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="First name"
              value={firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-bold text-gray-700">
              Last name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Last name"
              value={lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-bold text-gray-700">
              Phone number
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none"
              type="submit"
              value="Add"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

CustomerForm.defaultProps = {
  onSave: () => {}
};
