import cron from 'node-cron';
import { whatsAppService } from './services/whatsapp.service';
import { config } from './config';
// Import meal plan directly so it's included in the build
import mealPlanRaw from './data/mealPlan.json';
import { MealPlanData } from './types';

const mealPlan: MealPlanData = mealPlanRaw as unknown as MealPlanData;

// Helper to get current Ramadan day
function getRamadanDay(): number {
    const startDate = new Date(config.ramadanStartDate);
    const today = new Date();

    // Reset time part to ensure accurate day difference
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If today is start date, it's Day 1
    // If today is start date + 1, it's Day 2
    // We need to handle if today is BEFORE start date
    if (today < startDate) {
        return 0; // Not started yet
    }

    return diffDays + 1;
}

// Function to send message for a specific time (Suhoor or Iftar)
// Function to send message for a specific time (Suhoor or Iftar)
async function sendDailyMessage(type: 'suhoor' | 'iftar') {
    const currentRamadanDay = getRamadanDay();

    // Logic: At 4:30 PM, we are preparing for the NEXT day's Suhoor.
    // So we should send the plan for (currentRamadanDay + 1).
    // If today is Day 0 (eve of Ramadan), we send Day 1.
    // If today is Day 1, we send Day 2.

    const targetDay = currentRamadanDay + 1;

    if (targetDay < 1 || targetDay > 30) {
        console.log(`📅 Target Day ${targetDay} is out of range (Current Day ${currentRamadanDay}). No message sent.`);
        return;
    }

    const dayPlan = mealPlan.days.find(d => d.day === targetDay);
    if (!dayPlan) {
        console.error(`❌ No meal plan found for Day ${targetDay}`);
        return;
    }

    console.log(`🚀 Sending Meal Plan for Day ${targetDay} (Scheduled for 5:12 PM IST)...`);
    await whatsAppService.sendToDefault(dayPlan.whatsappMessage);
}

export function initScheduler() {
    console.log('🕰️  Scheduler initialized');
    console.log(`📅 Ramadan Start Date: ${config.ramadanStartDate}`);

    // Schedule for 5:12 PM every day
    // Explicitly set timezone to Asia/Kolkata
    cron.schedule('12 17 * * *', () => {
        console.log('⏰ Triggering daily meal plan (5:12 PM IST)');
        sendDailyMessage('iftar');
    }, {
        timezone: "Asia/Kolkata"
    });
}
