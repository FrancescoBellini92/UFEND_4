import { sendRequest, manageRequestResponse } from '../request-utils';
import '@babel/polyfill';

describe('request utils', () => {
  
  let isProd;
  const mockResponseBody = {};
  const mockFetchReturnVal = {
    json: () => Promise.resolve(mockResponseBody)
  };
  
  beforeEach(() => {
    isProd = false;
    global.fetch = jest.fn((url, isProd) => Promise.resolve(mockFetchReturnVal));
  });

  test('make request', async() => {
    const mockUrl = 'http://foo';
    const response = await sendRequest(mockUrl, isProd);
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe(mockUrl);
    expect(fetch.mock.calls[0][1]).toStrictEqual({ mode: 'cors' });
    expect(response).toBe(mockFetchReturnVal);

    isProd = true;
    await sendRequest(mockUrl, isProd);
    expect(fetch.mock.calls[1][1]).toStrictEqual({ mode: 'same-origin' });
  });
});
