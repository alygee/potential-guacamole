import React, { useState } from 'react';

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
}) => {
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
  const handleSubmit = () => {
    window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
  };
  return (
    <div className="w-full max-w-sm container mx-auto pt-20">
      <form
        id="customer"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2">
              First name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="First name"
              value={firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2">
              Last name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Last name"
              value={lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2">
              Phone number
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Add"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
