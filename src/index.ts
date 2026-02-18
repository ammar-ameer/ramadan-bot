import express from 'express';
import { config } from './config';
import { initScheduler } from './scheduler';

const app = express();
app.use(express.json());

// Webhook verification endpoint (required by WhatsApp)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // In a real app, verify_token should be an environment variable
    // For now, accepting any token or a specific one if configured
    if (mode === 'subscribe' && token === (process.env.WEBHOOK_VERIFY_TOKEN || 'ramadan_bot_token')) {
        console.log('✅ Webhook verified!');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Incoming messages handler
app.post('/webhook', (req, res) => {
    // We can log incoming messages here
    // console.log('📩 Received webhook event:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(config.port, () => {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🌙 Ramadan Meal Plan Bot Started 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Server running on port ${config.port}
📅 Date: ${new Date().toISOString()}
  `);

    // Start the scheduler
    initScheduler();
});
