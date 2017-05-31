import assert from 'assert';
import { doUntil } from '../utils';

describe('utils: doUntil', () => {
  it('changes value until condition is OK', (done) => {
    let counter = 0;

    doUntil(
      () => {
        counter++;
      },
      () => {
        return counter < 5
      },
      100
    );

    setTimeout(() => {
      assert.equal(counter, 5);
      done();
    }, 600)
  });
});
