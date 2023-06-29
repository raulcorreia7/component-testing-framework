export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function waitFor(
  fn: () => Promise<unknown>,
  timeout = 10000,
  interval = 500
): Promise<unknown> {
  return sleep(interval).then(() =>
    fn()
      .then((result) => result)
      .catch((error) => {
        const remainingTimeout = timeout - interval;
        if (remainingTimeout > 0) {
          return waitFor(fn, remainingTimeout, interval);
        } else {
          throw error;
        }
      })
  );
}

export const isCi = !!process.env["CI"];
