import qs from 'querystring';
import fetch from 'node-fetch';

/**
 * Sends message to recipient as current user
 * @param recipient PSID of message
 * @param text of message
 */
export async function sendMessage(
    recipient: string,
    text: string,
): Promise<unknown> {
  const requestBody = {
    recipient: {
      id: recipient,
    },
    message: {
      text,
    },
  };
  const query = qs.stringify({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
  });
  const response = await fetch(`https://graph.facebook.com/v8.0/me/messages?${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }
  return response.json();
}
