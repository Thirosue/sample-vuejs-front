export default class ErrorHandler {
  static apiHandleErr(error) {
    console.error(error);
    throw new Error(error);
  }
}