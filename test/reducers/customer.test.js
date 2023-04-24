import { reducer } from '../../src/reducers/customer';
import {
  itMaintainsExistingState,
  itSetsStatus,
} from '../reducerGenerators';

describe('reducer', () => {
  it('returns a default state for an undefined existing state', () => {
    expect(reducer(undefined, {})).toEqual({
      customer: {},
      status: undefined,
      validationErrors: {},
      error: false,
    });
  });
});
