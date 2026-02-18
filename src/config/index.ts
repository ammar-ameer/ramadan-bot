import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    whatsapp: {
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
        accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
        recipientNumber: process.env.RECIPIENT_PHONE_NUMBER,
        apiVersion: 'v18.0', // Updated to a recent version
    },
    ramadanStartDate: process.env.RAMADAN_START_DATE || '2026-02-18', // Default to today/approx start
    isDevelopment: process.env.NODE_ENV !== 'production',
};

if (!config.whatsapp.phoneNumberId || !config.whatsapp.accessToken) {
    console.warn('⚠️ WhatsApp credentials missing in .env file');
}
