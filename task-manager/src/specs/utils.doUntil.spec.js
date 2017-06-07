import assert from 'assert';
import { doUntil, killProcess } from '../utils';

describe('utils:', () => {
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

  it('stops correctly', (done) => {
    let counter = 0;
    let counterValueAfter300millis;

    let processDescriptor = doUntil(() => {counter ++}, () => (false), 100);

    //we take a snapshot of counter after some period of execution
    //and stop the process
    setTimeout(() => {
      counterValueAfter300millis = counter;
      killProcess(counter);
    }, 300);

    //after some longer period we check that the value ws not changed anymore
    //if it is true - the process was stopped correctly and the action was no longer executed
    setTimeout(() => {
      assert.equal(counterValueAfter300millis, counter);
      done();
    }, 500);

  })
});
