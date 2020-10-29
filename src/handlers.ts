import type {Request, Response} from 'express';

import {FB} from './types';
import {sendMessage} from './apis/fb';


/**
 * Handles a verification request by the Facebook API by checking against
 * secret and returning a challenge
 * @param req
 * @param res
 * @returns res
 */
export function handleVerification(req: Request, res: Response): Response {
  const verifyToken = process.env.FB_VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Unauthorized');
    }
  }
  return res.status(404).send('Not Found');
}

/**
 * Handles an event coming from a webhook call by Facebook
 * @param req
 * @param res
 * @returns res
 */
export function handleEvent(req: Request, res: Response): Response {
  const body = req.body as FB.WebhookEvent;

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      if ('messaging' in entry) {
        entry.messaging.forEach((event) => {
          console.log(`Received ${event.message.text} by ${event.sender.id}`);
          sendMessage(event.sender.id, event.message.text as string)
              .then((value) => {
                console.log('Send responded with', value);
              })
              .catch((error) => {
                console.error('Received error from Graph API', error);
              });
        });
      }
    });
  }

  return res.status(200).send('EVENT_RECEIVED');
}
