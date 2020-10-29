import type {Request, Response} from 'express';

import {handleEvent, handleVerification} from './handlers';


/**
 * Main entry point for Google Cloud Function
 * @param req
 * @param res
 */
export function cloudFunctionsEntry(req: Request, res: Response): void {
  if (req.method === 'GET') {
    console.log('Received Verification');
    handleVerification(req, res);
  } else {
    console.log('Received WebhookEvent');
    handleEvent(req, res);
  }
}
