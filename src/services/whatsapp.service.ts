import axios from 'axios';
import { config } from '../config';

export class WhatsAppService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}`;
    }

    async sendMessage(to: string, message: string): Promise<boolean> {
        try {
            const payload = {
                messaging_product: 'whatsapp',
                to: to,
                type: 'text',
                text: {
                    body: message,
                },
            };

            const response = await axios.post(`${this.baseUrl}/messages`, payload, {
                headers: {
                    'Authorization': `Bearer ${config.whatsapp.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(`✅ Message sent to ${to}: ${response.data.messages?.[0]?.id}`);
            return true;
        } catch (error: any) {
            console.error('❌ Error sending WhatsApp message:', error.response?.data || error.message);
            return false;
        }
    }

    // Helper method to send to the configured default group/number
    async sendToDefault(message: string): Promise<boolean> {
        if (!config.whatsapp.recipientNumber) {
            console.error('❌ No default recipient number configured.');
            return false;
        }
        return this.sendMessage(config.whatsapp.recipientNumber, message);
    }
}

export const whatsAppService = new WhatsAppService();
