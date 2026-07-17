export interface WhatsAppWebhookPayload {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        metadata?: {
          phone_number_id?: string;
        };
        messages?: Array<{
          id?: string;
          from?: string;
          type?: string;
          text?: {
            body?: string;
          };
        }>;
      };
      field?: string;
    }>;
  }>;
}

export interface IncomingTextMessage {
  messageId: string;
  from: string;
  text: string;
  phoneNumberId: string;
}

