# This is the example application for the book _Mastering Test-Driven Development_

# Prerequisities

You'll need to have [Node](http://nodejs.org), including NPM, installed on your machine.

*Important*: Run `npm install` before attempting any of the instructions below.

You may also wish to run `npm upgrade` to ensure your Node installation is up-to-date.

Use the following command to run all tests.

    npm test

Here's an example of running tests in a single file:

    npm test test/AppointmentsDayView.test.js

Once you've done that you can start the server with the following command.

    PORT=8000 npm run serve

Providing `PORT` is optional. The default port is 3000, although you should feel free to change this if it's easier for you--it's listed in `src/server.js`.
