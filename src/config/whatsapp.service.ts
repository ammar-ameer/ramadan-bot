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

    // Helper method to send to the configured default group/number(s)
    async sendToDefault(message: string): Promise<boolean> {
        const recipients = config.whatsapp.recipientNumbers;

        if (!recipients || recipients.length === 0) {
            console.error('❌ No default recipient numbers configured.');
            return false;
        }

        console.log(`📢 Broadcasting to ${recipients.length} recipient(s)...`);

        const results = await Promise.all(recipients.map(to => this.sendMessage(to, message)));

        const successCount = results.filter(r => r).length;
        console.log(`✅ Sent to ${successCount}/${recipients.length} recipients.`);

        return successCount > 0;
    }
}

export const whatsAppService = new WhatsAppService();
