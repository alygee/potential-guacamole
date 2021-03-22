/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/src/app.js":
/*!***************************!*\
  !*** ./server/src/app.js ***!
  \***************************/
/*! exports provided: buildApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildApp\", function() { return buildApp; });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-graphql */ \"express-graphql\");\n/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_graphql__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql */ \"graphql\");\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appointments */ \"./server/src/appointments.js\");\n/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customers */ \"./server/src/customers.js\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _src_schema_graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/schema.graphql */ \"./src/schema.graphql\");\n/* harmony import */ var _src_schema_graphql__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_src_schema_graphql__WEBPACK_IMPORTED_MODULE_7__);\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\n\n\n\nvar schema = Object(graphql__WEBPACK_IMPORTED_MODULE_3__[\"buildSchema\"])(_src_schema_graphql__WEBPACK_IMPORTED_MODULE_7___default.a);\nfunction buildApp(customerData, appointmentData, timeSlots) {\n  var app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\n  var _customers = new _customers__WEBPACK_IMPORTED_MODULE_5__[\"Customers\"](customerData);\n\n  var _appointments = new _appointments__WEBPACK_IMPORTED_MODULE_4__[\"Appointments\"](appointmentData, timeSlots);\n\n  app.use(express__WEBPACK_IMPORTED_MODULE_1___default.a[\"static\"]('dist'));\n  app.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.json());\n  app.use(morgan__WEBPACK_IMPORTED_MODULE_6___default()('dev'));\n  app.get('/availableTimeSlots', function (req, res, next) {\n    res.json(_appointments.getTimeSlots());\n  });\n  app.get('/appointments/:from-:to', function (req, res, next) {\n    res.json(_appointments.getAppointments(parseInt(req.params.from), parseInt(req.params.to), _customers.all()));\n  });\n  app.post('/appointments', function (req, res, next) {\n    var appointment = req.body;\n\n    if (_appointments.isValid(appointment)) {\n      _appointments.add(appointment);\n\n      res.sendStatus(201);\n    } else {\n      var errors = _appointments.errors(appointment);\n\n      res.status(422).json({\n        errors: errors\n      });\n    }\n  });\n  app.post('/customers', function (req, res, next) {\n    var customer = req.body;\n\n    if (_customers.isValid(customer)) {\n      var customerWithId = _customers.add(customer);\n\n      res.status(201).json(customerWithId);\n    } else {\n      var errors = _customers.errors(customer);\n\n      res.status(422).json({\n        errors: errors\n      });\n    }\n  });\n  app.get('/customers', function (req, res, next) {\n    var results = _customers.search(buildSearchParams(req.query));\n\n    res.json(results);\n  });\n\n  var customerValidation = function customerValidation(context) {\n    return {\n      Argument: function Argument(arg) {\n        if (arg.name.value === 'customer') {\n          validateObject(context, arg.value.fields, _customers, 'addCustomer');\n        }\n      }\n    };\n  };\n\n  var validateObject = function validateObject(context, fields, repository, path) {\n    var object = fields.reduce(function (acc, field) {\n      acc[field.name.value] = field.value.value;\n      return acc;\n    });\n\n    if (!repository.isValid(object)) {\n      var errors = repository.errors(object);\n      Object.keys(errors).forEach(function (fieldName) {\n        context.reportError(new graphql__WEBPACK_IMPORTED_MODULE_3__[\"GraphQLError\"](errors[fieldName], undefined, undefined, undefined, [path, fieldName]));\n      });\n    }\n  };\n\n  var appointmentValidation = function appointmentValidation(context) {\n    return {\n      Argument: function Argument(arg) {\n        if (arg.name.value === 'appointment') {\n          validateObject(context, arg.value.fields, _appointments, 'addAppointment');\n        }\n      }\n    };\n  };\n\n  app.use('/graphql', express_graphql__WEBPACK_IMPORTED_MODULE_2___default()({\n    schema: schema,\n    rootValue: {\n      customer: function customer(_ref) {\n        var id = _ref.id;\n\n        var customer = _customers.all()[id];\n\n        return _objectSpread(_objectSpread({}, customer), {}, {\n          appointments: _appointments.forCustomer(customer.id)\n        });\n      },\n      customers: function customers(query) {\n        return _customers.search(buildSearchParams(query)).map(function (customer) {\n          return _objectSpread(_objectSpread({}, customer), {}, {\n            appointments: function appointments() {\n              return _appointments.forCustomer(customer.id);\n            }\n          });\n        });\n      },\n      availableTimeSlots: function availableTimeSlots() {\n        return _appointments.getTimeSlots();\n      },\n      appointments: function appointments(_ref2) {\n        var from = _ref2.from,\n            to = _ref2.to;\n        return _appointments.getAppointments(parseInt(from), parseInt(to), _customers.all());\n      },\n      addAppointment: function addAppointment(_ref3) {\n        var appointment = _ref3.appointment;\n        appointment = Object.assign(appointment, {\n          startsAt: parseInt(appointment.startsAt)\n        });\n        return _appointments.add(appointment);\n      },\n      addCustomer: function addCustomer(_ref4) {\n        var customer = _ref4.customer;\n        return _customers.add(customer);\n      }\n    },\n    validationRules: [customerValidation, appointmentValidation],\n    graphiql: true\n  }));\n  app.get('*', function (req, res) {\n    res.sendFile('dist/index.html', {\n      root: process.cwd()\n    });\n  });\n  return app;\n}\n\nfunction buildSearchParams(_ref5) {\n  var searchTerm = _ref5.searchTerm,\n      after = _ref5.after,\n      limit = _ref5.limit,\n      orderBy = _ref5.orderBy,\n      orderDirection = _ref5.orderDirection;\n  var searchParams = {};\n  if (searchTerm) searchParams.searchTerms = buildSearchTerms(searchTerm);\n  if (after) searchParams.after = parseInt(after);\n  if (limit) searchParams.limit = parseInt(limit);\n  if (orderBy) searchParams.orderBy = orderBy;\n  if (orderDirection) searchParams.orderDirection = orderDirection;\n  return searchParams;\n}\n\nfunction buildSearchTerms(searchTerm) {\n  if (!searchTerm) return undefined;\n\n  if (Array.isArray(searchTerm)) {\n    return searchTerm;\n  }\n\n  return [searchTerm];\n}\n\n//# sourceURL=webpack:///./server/src/app.js?");

/***/ }),

/***/ "./server/src/appointments.js":
/*!************************************!*\
  !*** ./server/src/appointments.js ***!
  \************************************/
/*! exports provided: buildTimeSlots, generateFakeAppointments, Appointments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildTimeSlots\", function() { return buildTimeSlots; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateFakeAppointments\", function() { return generateFakeAppointments; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Appointments\", function() { return Appointments; });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"@babel/runtime/helpers/slicedToArray\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"@babel/runtime/helpers/toConsumableArray\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];\nvar stylistServices = {\n  Ashley: ['Cut', 'Blow-dry', 'Extensions'],\n  Jo: ['Cut', 'Blow-dry', 'Cut & color'],\n  Pat: ['Cut', 'Blow-dry', 'Beard trim', 'Cut & beard trim', 'Extensions'],\n  Sam: ['Cut', 'Blow-dry', 'Beard trim', 'Cut & beard trim']\n};\n\nvar randomInt = function randomInt(range) {\n  return Math.floor(Math.random() * range);\n};\n\nArray.prototype.pickRandom = function () {\n  return this[randomInt(this.length)];\n};\n\nvar pickMany = function pickMany(items, number) {\n  return Array(number).fill(1).map(function (n) {\n    return items.pickRandom();\n  });\n};\n\nfunction buildTimeSlots() {\n  var _ref;\n\n  var startDate = new Date();\n  startDate.setFullYear(startDate.getFullYear() - 1);\n  var startTime = startDate.setHours(9, 0, 0, 0);\n\n  var times = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(Array(365 + 30).keys()).map(function (day) {\n    var daysToAdd = day * 24 * 60 * 60 * 1000;\n    return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(Array(20).keys()).map(function (halfHour) {\n      var halfHoursToAdd = halfHour * 30 * 60 * 1000;\n      return {\n        startsAt: startTime + daysToAdd + halfHoursToAdd,\n        stylists: stylists\n      };\n    });\n  });\n\n  return (_ref = []).concat.apply(_ref, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_4___default()(times));\n}\n\nfunction shouldFillTimeSlot() {\n  return randomInt(3) < 2;\n}\n\n;\nfunction generateFakeAppointments(customers, timeSlots) {\n  var appointments = [];\n  timeSlots.forEach(function (timeSlot) {\n    var stylist = timeSlot.stylists.pickRandom();\n\n    if (shouldFillTimeSlot()) {\n      appointments.push({\n        customer: customers.pickRandom().id,\n        startsAt: timeSlot.startsAt,\n        stylist: stylist,\n        service: stylistServices[stylist].pickRandom()\n      });\n    }\n  });\n  return appointments;\n}\nvar Appointments = /*#__PURE__*/function () {\n  function Appointments() {\n    var initialAppointments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n    var initialTimeSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Appointments);\n\n    this.appointments = [];\n    this.timeSlots = initialTimeSlots;\n    this.add = this.add.bind(this);\n    initialAppointments.forEach(this.add);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Appointments, [{\n    key: \"add\",\n    value: function add(appointment) {\n      this.timeSlots = this.timeSlots.filter(function (timeSlot) {\n        return timeSlot.startsAt !== appointment.startsAt;\n      });\n      this.appointments.push(appointment);\n      return appointment;\n    }\n  }, {\n    key: \"deleteAll\",\n    value: function deleteAll() {\n      this.appointments.length = 0;\n    }\n  }, {\n    key: \"getAppointments\",\n    value: function getAppointments(from, to, customers) {\n      return this.appointments.filter(function (appointment) {\n        if (from !== undefined && appointment.startsAt < from) {\n          return false;\n        }\n\n        if (to !== undefined && appointment.startsAt > to) {\n          return false;\n        }\n\n        return true;\n      }).map(function (appointment) {\n        return Object.assign({}, appointment, {\n          customer: customers[appointment.customer]\n        });\n      }).sort(function (a, b) {\n        return a.startsAt - b.startsAt;\n      });\n    }\n  }, {\n    key: \"forCustomer\",\n    value: function forCustomer(customerId) {\n      return this.appointments.filter(function (appointment) {\n        return appointment.customer === customerId;\n      });\n    }\n  }, {\n    key: \"getTimeSlots\",\n    value: function getTimeSlots() {\n      return this.timeSlots;\n    }\n  }, {\n    key: \"isValid\",\n    value: function isValid(appointment) {\n      return Object.keys(this.errors(appointment)).length === 0;\n    }\n  }, {\n    key: \"errors\",\n    value: function errors(appointment) {\n      var errors = {};\n      errors = Object.assign(errors, this.uniqueValidation('startsAt', appointment.startsAt, 'Appointment start time'));\n      return errors;\n    }\n  }, {\n    key: \"uniqueValidation\",\n    value: function uniqueValidation(field, fieldValue, fieldDescription) {\n      if (Object.entries(this.appointments).map(function (_ref2) {\n        var _ref3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, 2),\n            _ = _ref3[0],\n            c = _ref3[1];\n\n        return c[field];\n      }).includes(fieldValue)) {\n        return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, field, fieldDescription + ' has already been allocated');\n      }\n\n      return {};\n    }\n  }]);\n\n  return Appointments;\n}();\n\n//# sourceURL=webpack:///./server/src/appointments.js?");

/***/ }),

/***/ "./server/src/customers.js":
/*!*********************************!*\
  !*** ./server/src/customers.js ***!
  \*********************************/
/*! exports provided: generateFakeCustomers, Customers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateFakeCustomers\", function() { return generateFakeCustomers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Customers\", function() { return Customers; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"@babel/runtime/helpers/slicedToArray\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! faker */ \"faker\");\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nArray.prototype.unique = function () {\n  return this.filter(function (value, index, self) {\n    return self.indexOf(value) === index;\n  });\n};\n\nArray.prototype.flatMap = function (f) {\n  return Array.prototype.concat.apply([], this.map(f));\n};\n\nfunction generateFakeCustomer(id) {\n  return {\n    id: id,\n    firstName: faker__WEBPACK_IMPORTED_MODULE_4__[\"name\"].firstName(),\n    lastName: faker__WEBPACK_IMPORTED_MODULE_4__[\"name\"].lastName(),\n    phoneNumber: faker__WEBPACK_IMPORTED_MODULE_4__[\"phone\"].phoneNumberFormat(1)\n  };\n}\n\nfunction generateFakeCustomers() {\n  var customers = [];\n\n  for (var i = 0; i < 1500; ++i) {\n    customers.push(generateFakeCustomer(i));\n  }\n\n  return customers;\n}\nvar Customers = /*#__PURE__*/function () {\n  function Customers() {\n    var initialCustomers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Customers);\n\n    this.customers = {};\n    this.nextId = 0;\n    this.add = this.add.bind(this);\n    this.all = this.all.bind(this);\n    this.isValid = this.isValid.bind(this);\n    initialCustomers.forEach(this.add);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Customers, [{\n    key: \"add\",\n    value: function add(customer) {\n      var customerWithId = Object.assign({}, customer, {\n        id: this.nextId++\n      });\n      this.customers[customerWithId.id] = customerWithId;\n      return customerWithId;\n    }\n  }, {\n    key: \"all\",\n    value: function all() {\n      return Object.assign({}, this.customers);\n    }\n  }, {\n    key: \"isValid\",\n    value: function isValid(customer) {\n      return Object.keys(this.errors(customer)).length === 0;\n    }\n  }, {\n    key: \"errors\",\n    value: function errors(customer) {\n      var errors = {};\n      errors = Object.assign(errors, this.requiredValidation(customer, 'firstName', 'First name'));\n      errors = Object.assign(errors, this.requiredValidation(customer, 'lastName', 'Last name'));\n      errors = Object.assign(errors, this.requiredValidation(customer, 'phoneNumber', 'Phone number'));\n      errors = Object.assign(errors, this.uniqueValidation('phoneNumber', customer.phoneNumber, 'Phone number'));\n      return errors;\n    }\n  }, {\n    key: \"requiredValidation\",\n    value: function requiredValidation(customer, field, fieldDescription) {\n      if (!customer[field] || customer[field].trim() === '') {\n        return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, field, fieldDescription + ' is required');\n      }\n\n      return {};\n    }\n  }, {\n    key: \"uniqueValidation\",\n    value: function uniqueValidation(field, fieldValue, fieldDescription) {\n      if (Object.entries(this.customers).map(function (_ref2) {\n        var _ref3 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, 2),\n            _ = _ref3[0],\n            c = _ref3[1];\n\n        return c[field];\n      }).includes(fieldValue)) {\n        return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, field, fieldDescription + ' already exists in the system');\n      }\n\n      return {};\n    }\n  }, {\n    key: \"searchForTerm\",\n    value: function searchForTerm(term) {\n      var _this = this;\n\n      var startsWith = new RegExp(\"^\".concat(term), 'i');\n      return Object.keys(this.customers).filter(function (customerId) {\n        var customer = _this.customers[customerId];\n        return startsWith.test(customer.firstName) || startsWith.test(customer.lastName) || startsWith.test(customer.phoneNumber);\n      });\n    }\n  }, {\n    key: \"search\",\n    value: function search(_ref5) {\n      var _this2 = this;\n\n      var searchTerms = _ref5.searchTerms,\n          limit = _ref5.limit,\n          orderBy = _ref5.orderBy,\n          orderDirection = _ref5.orderDirection,\n          after = _ref5.after;\n      limit = limit || 10;\n      orderBy = orderBy || 'firstName';\n      searchTerms = searchTerms || [''];\n      var sorted = searchTerms.flatMap(function (term) {\n        return _this2.searchForTerm(term);\n      }).unique().map(function (id) {\n        return _this2.customers[id];\n      }).sort(function (l, r) {\n        return orderDirection === 'desc' ? r[orderBy].localeCompare(l[orderBy]) : l[orderBy].localeCompare(r[orderBy]);\n      });\n      var afterPosition = after ? sorted.findIndex(function (c) {\n        return c.id === after;\n      }) + 1 : 0;\n      return sorted.slice(afterPosition, afterPosition + limit);\n    }\n  }]);\n\n  return Customers;\n}();\n\n//# sourceURL=webpack:///./server/src/customers.js?");

/***/ }),

/***/ "./server/src/server.js":
/*!******************************!*\
  !*** ./server/src/server.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./server/src/app.js\");\n/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customers */ \"./server/src/customers.js\");\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointments */ \"./server/src/appointments.js\");\n\n\n\nvar port = process.env.PORT || 3000;\nvar customers = Object(_customers__WEBPACK_IMPORTED_MODULE_1__[\"generateFakeCustomers\"])();\nvar timeSlots = Object(_appointments__WEBPACK_IMPORTED_MODULE_2__[\"buildTimeSlots\"])();\nvar appointments = Object(_appointments__WEBPACK_IMPORTED_MODULE_2__[\"generateFakeAppointments\"])(customers, timeSlots);\nObject(_app_js__WEBPACK_IMPORTED_MODULE_0__[\"buildApp\"])(customers, appointments, timeSlots).listen(port);\nconsole.log(\"Server listening on port \".concat(port, \".\"));\n\n//# sourceURL=webpack:///./server/src/server.js?");

/***/ }),

/***/ "./src/schema.graphql":
/*!****************************!*\
  !*** ./src/schema.graphql ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"type Query {\\n  customer(id: ID!): Customer\\n  customers: [Customer]\\n  availableTimeSlots: [Appointment]\\n  appointments(from: String, to: String): [Appointment]\\n}\\n\\ntype Mutation {\\n  addAppointment(appointment: AppointmentInput): Appointment\\n  addCustomer(customer: CustomerInput): Customer\\n}\\n\\ninput CustomerInput {\\n  firstName: String\\n  lastName: String\\n  phoneNumber: String\\n}\\n\\ntype Customer {\\n  id: ID\\n  firstName: String\\n  lastName: String\\n  phoneNumber: String\\n  appointments: [Appointment]\\n}\\n\\ninput AppointmentInput {\\n  startsAt: String\\n  customer: ID\\n}\\n\\ntype Appointment {\\n  startsAt: String\\n  stylist: String\\n  service: String\\n  notes: String\\n}\\n\";\n\n//# sourceURL=webpack:///./src/schema.graphql?");

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./server/src/server.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./server/src/server.js */\"./server/src/server.js\");\n\n\n//# sourceURL=webpack:///multi_./server/src/server.js?");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/classCallCheck\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/classCallCheck%22?");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/createClass\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/createClass%22?");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/defineProperty\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/defineProperty%22?");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/slicedToArray\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/slicedToArray%22?");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/toConsumableArray\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/toConsumableArray%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-graphql\");\n\n//# sourceURL=webpack:///external_%22express-graphql%22?");

/***/ }),

/***/ "faker":
/*!************************!*\
  !*** external "faker" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"faker\");\n\n//# sourceURL=webpack:///external_%22faker%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ })

/******/ });