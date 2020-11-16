import React, { useState } from 'react';

export const Appointment = ({
  startsAt,
  customer,
  stylist,
  service,
  notes
}) => (
  <div className="px-20">
    <h2 className="font-bold text-xl mb-6">
      Today's appointment at &nbsp;
      {appointmentTimeOfDay(startsAt)}
    </h2>
    <table>
      <tbody>
        <tr>
          <td className="underline px-10 py-2 mr-10 text-right">
            Customer
          </td>
          <td>
            {customer.firstName} {customer.lastName}
          </td>
        </tr>
        <tr>
          <td className="underline px-10 py-2 mr-10 text-right">
            Phone number
          </td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <td className="underline px-10 py-2 mr-10 text-right">
            Stylist
          </td>
          <td>{stylist}</td>
        </tr>
        <tr>
          <td className="underline px-10 py-2 mr-10 text-right">
            Service
          </td>
          <td>{service}</td>
        </tr>
        <tr>
          <td className="underline px-10 py-2 mr-10 text-right">
            Notes
          </td>
          <td>{notes}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return `${h}:${m}`;
};

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(
    0
  );
  return (
    <div
      id="appointmentsDayView"
      className="container mx-auto pt-16 flex">
      <ol className="px-20 border-r pt-10">
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt} className="py-2">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
