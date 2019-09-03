/**
 * This function will perform an exponential backoff and retry of a function
 * @param functionToRetry The function that we want to retry
 */
function retryHandler_(functionToRetry) {
  var success = false;
  var retry = 0;
  var backoff = 1000;
  var response, error;
  do {
    try {
      response = functionToRetry();
      success = true;
    } catch (e) {
      Logger.log(e);
      error = e;
      retry++;
      Utilities.sleep(backoff);
      backoff *= 2;
    }
  } while (success === false && retry < 5);
  if (!success) {
    throw new Error(error);
  }
  return response;
}
