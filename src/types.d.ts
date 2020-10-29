/* eslint-disable camelcase,max-len */
declare namespace FB {
    export interface WebhookEvent {
        object: string,
        entry: Array<MessagingEntry|MessagingPostbackEntry>,
    }

    interface GenericEntry {
        id: string,
        time: number,
    }

    export interface MessagingEntry extends GenericEntry {
        messaging: Array<MessagingWebhookEvent>,
    }

    export interface MessagingPostbackEntry extends GenericEntry {
        messaging_postbacks: Array<MessagingPostbacksWebhookEvent>,
    }

    interface GenericWebhookEvent {
        sender: {
            id: string;
            user_ref?: string;
        },
        recipient: {
            id: string,
        },
        timestamp: number,
     }

    export interface MessagingWebhookEvent extends GenericWebhookEvent {
       message: {
            mid: string,
            text?: string,
            quick_reply?: {
                payload: string,
            },
            reply_to?: {
                mid: string,
            },
            attachments?: Array<LocationAttachment|unknown>,
        }
    }

    export interface MessagingPostbacksWebhookEvent extends GenericWebhookEvent {
        postback: {
            title: string,
            payload: string,
            referral?: {
                ref: string,
                source: string,
                type: string,
            }
        }
    }

    export interface LocationAttachment {
        type: 'location',
        payload: {
            url: string,
            coordinates: {
                lat: number,
                long: number,
            },
        },
    }
}

export {FB};
