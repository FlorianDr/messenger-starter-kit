import {sendMessage} from '../fb';

jest.mock('node-fetch');
import fetch, {Response} from 'node-fetch';

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('apis/fb', () => {
  describe('sendMessage', () => {
    const accessToken = 'access_token';
    process.env.FB_PAGE_ACCESS_TOKEN = accessToken;

    beforeAll(() => {
      mockedFetch.mockImplementation(() => {
        const response = new Response();
        response.json = jest.fn().mockResolvedValue(undefined);
        response.ok = true;
        return Promise.resolve(response);
      });
    });

    afterEach(() => {
      mockedFetch.mockClear();
    });

    test('calls with recipient id and text', async () => {
      const recipientId = 'asdftw4dfasd';
      const text = 'Hello my friends';
      const expectedBody = expect.objectContaining({
        message: expect.objectContaining({
          text,
        }),
        recipient: expect.objectContaining({
          id: recipientId,
        }),
      });

      await sendMessage(recipientId, text);

      if (mockedFetch.mock.calls[0]?.[1]?.body) {
        const body = mockedFetch.mock.calls[0]?.[1]?.body;
        const actualBody = JSON.parse(body.toString());
        expect(actualBody).toEqual(expectedBody);
      } else {
        throw new Error('No body detected');
      }
    });

    test('calls API endpoint with access token', async () => {
      const expected = 'https://graph.facebook.com/v8.0/me/messages?access_token=access_token';

      await sendMessage('recipientId', 'text');

      if (mockedFetch.mock.calls[0]?.[0]) {
        const actual = mockedFetch.mock.calls[0]?.[0];
        expect(actual).toEqual(expected);
      } else {
        throw new Error('No URL detected');
      }
    });
  });
});
