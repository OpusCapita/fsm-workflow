/**
 * Enforces process started with @DoUntil to stop
 *
 * @param processDecriptor - timer object
 */
export function killProcess(processDecriptor) {
  clearInterval(processDecriptor);
}

/**
 * Executes @action avery @timeout until @test function returns 'false'
 *
 * @param action - function to call per iteration
 * @param test - true|false guard function
 * @param timeout - timeout in millis (1 sec by default)
 */
export function doUntil(action, test, timeout = 1000) {
  let timer = setInterval(() => {
    action();
    if (!test()) {
      killProcess(timer);
    }
  }, timeout);

  return timer;
}
