import { toContainText } from './matchers/toContainText';
import { toBeRendered } from './matchers/toBeRendered';

expect.extend({
  toContainText,
  toBeRendered,
});
