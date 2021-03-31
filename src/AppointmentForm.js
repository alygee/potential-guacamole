import React, { useState, useCallback } from 'react';

const Error = () => (
  <div className="error">An error occurred during save.</div>
);

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) =>
      acc.concat([startTime + i * increment])
    );

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};

const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
  checkedTimeSlot,
  handleChange
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot);
  if (
    availableTimeSlots.some(
      availableTimeSlot => availableTimeSlot.startsAt === startsAt
    )
  ) {
    const isChecked = startsAt === checkedTimeSlot;
    return (
      <input
        name="startsAt"
        type="radio"
        value={startsAt}
        checked={isChecked}
        onChange={handleChange}
      />
    );
  }
  return null;
};

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  checkedTimeSlot,
  handleChange
}) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);
  return (
    <table id="time-slots" className="w-full">
      <thead>
        <tr>
          <th className="border border-gray-200" />
          {dates.map(d => (
            <th className="border border-gray-200" key={d}>
              {toShortDate(d)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th className="border border-gray-200">
              {toTimeValue(timeSlot)}
            </th>
            {dates.map(date => (
              <td
                key={date}
                className="text-center border border-gray-200">
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                  checkedTimeSlot={checkedTimeSlot}
                  handleChange={handleChange}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);

const toShortDate = timestamp => {
  const [day, , dayOfMonth] = new Date(timestamp)
    .toDateString()
    .split(' ');
  return `${day} ${dayOfMonth}`;
};

export const AppointmentForm = ({
  selectableServices,
  service,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  startsAt,
  onSave
}) => {
  const [appointment, setAppointment] = useState({
    service,
    startsAt
  });
  const [error, setError] = useState(false);
  const handleChange = ({ target }) =>
    setAppointment(appointment => ({
      ...appointment,
      service: target.value
    }));

  const handleStartsAtChange = useCallback(
    ({ target: { value } }) => {
      setAppointment(appointment => ({
        ...appointment,
        startsAt: parseInt(value)
      }));
    }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await window.fetch('/appointments', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });

    if (result.ok) {
      onSave();
    } else {
      setError(true);
    }
  };

  return (
    <form
      id="appointment"
      onSubmit={handleSubmit}
      className="flex flex-col">
      <div className="flex justify-between my-2 align-center">
        {error ? <Error /> : null}
        <label
          htmlFor="service"
          className="self-center w-1/2 mr-8 text-lg text-right">
          Choose a service:
        </label>
        <select
          name="service"
          id="service"
          value={service}
          onChange={handleChange}
          className="block w-1/2 px-4 py-3 my-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option />
          {selectableServices.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAtChange}
      />
      <input
        type="submit"
        value="add"
        className="self-end w-1/2 px-4 py-2 my-4 font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none"
      />
    </form>
  );
};
AppointmentForm.defaultProps = {
  availableTimeSlots: [],
  today: new Date(),
  salonOpensAt: 9,
  salonClosesAt: 19,
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  onSave: () => {}
};
