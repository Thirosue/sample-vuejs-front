const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export default {
  sleep,
}