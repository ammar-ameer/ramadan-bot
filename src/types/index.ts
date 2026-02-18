export interface PersonRaw {
    weight: number;
    height: number;
    targetCalories: number;
    note?: string;
}

export interface Meta {
    title: string;
    language: string;
    persons: {
        [key: string]: PersonRaw;
    };
    suhoorRule: string;
    iftarRotation: string[];
    weeklySpecial: string;
}

export interface DayPlan {
    day: number;
    whatsappMessage: string;
    // We can add structured data for Suhoor/Iftar here if we parse it later, 
    // but for now, the JSON mainly drives the message sending.
    // The 'whatsappMessage' is the pre-formatted string we send.
    isWeeklySpecial?: boolean;
    theme?: string;
    suhoor?: any; // Keeping it loose for now as the message is pre-formatted
    iftar?: any;
}

export interface MealPlanData {
    meta: Meta;
    days: DayPlan[];
}
