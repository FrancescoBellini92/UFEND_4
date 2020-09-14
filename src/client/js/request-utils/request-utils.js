export function sendRequest(url, isProd) {
  return fetch(url, {
    mode: isProd ? 'same-origin' : 'cors'
  });
}

export async function manageRequestResponse(pendingRequest, errorCheck = () => {}, errorHandler = () => {}) {
  if (errorCheck(pendingRequest)) {
    errorHandler(pendingRequest);
    throw new Error(`Request failed: ${pendingRequest.status}`);
  }
  const payload = await pendingRequest.json();
  return payload.data;
}
