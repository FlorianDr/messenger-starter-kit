import {handleEvent, handleVerification} from '../handlers';

jest.mock('../apis/fb');

import * as FBApi from '../apis/fb';
import {FB} from '../types';

const mockedFBApi = FBApi as jest.Mocked<typeof FBApi>;

describe('Handlers', () => {
  describe('handleVerification', () => {
    test('returns 404 on missing query', () => {
      const req = {
        query: {},
      } as any;
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(() => res),
      } as any;

      handleVerification(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(res.send).toBeCalledWith('Not Found');
    });

    test('returns challenge on correct secret', () => {
      process.env.FB_VERIFY_TOKEN = 'secret';
      const challenge = 'challenge';
      const req = {
        query: {
          'hub.mode': 'subscribe',
          'hub.verify_token': 'secret',
          'hub.challenge': challenge,
        },
      } as any;
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(() => res),
      } as any;

      handleVerification(req, res);

      expect(res.send).toBeCalledWith(challenge);
      expect(res.status).toBeCalledWith(200);
    });
  });

  describe('handleEvent', () => {
    test('calls sendMessage with sender and text', () => {
      const senderId = 'senderId';
      const text = 'text';
      const body: FB.WebhookEvent = {
        object: 'page',
        entry: [
          {
            id: 'asd',
            time: 123123,
            messaging: [
              {
                recipient: {id: '123'},
                timestamp: 12,
                sender: {
                  id: senderId,
                },
                message: {
                  text,
                  mid: '123',
                },
              },
            ],
          },
        ],
      };
      const req = {body} as any;
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(() => res),
      } as any;
      mockedFBApi.sendMessage.mockResolvedValue({});

      handleEvent(req, res);

      expect(mockedFBApi.sendMessage).toBeCalledWith(senderId, text);
    });
  });
});
