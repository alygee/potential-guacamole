import { storeSpy, expectRedux } from 'expect-redux';
import {
  fetchResponseOk,
  fetchResponseError,
} from '../builders/fetch';
import { configureStore } from '../../src/store';
import { appHistory } from '../../src/history';

describe('addCustomer', () => {
  const customer = { id: 123 };
  let store;

  beforeEach(() => {
    jest
      .spyOn(global, 'fetch')
      .mockReturnValue(fetchResponseOk(customer));
    store = configureStore([storeSpy]);
  });

  const addCustomerRequest = (customer) => ({
    type: 'ADD_CUSTOMER_REQUEST',
    customer,
  });

  it('sets current status to submitting', () => {
    store.dispatch(addCustomerRequest());

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: 'ADD_CUSTOMER_SUBMITTING' });
  });
});
