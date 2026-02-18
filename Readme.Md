# 🌙 Ramadan Meal Plan Bot

A WhatsApp bot designed to help you have a healthy Ramadan by sending daily Suhoor and Iftar meal plans, recipes, and health tips.

## 🌟 Features

-   **Daily Meal Plans**: Sends a structured meal plan every day at **4:30 PM**.
-   **Forward-Looking**: The 4:30 PM message contains the plan for the **next day** (Suhoor & Iftar), giving you time to prepare.
-   **Personalized**: Tailored for specific calorie targets (Ammar, Ajmi, Abu).
-   **Bilingual**: Recipes and tips in **English** and **Malayalam**.
-   **Kerala Cuisine**: Features healthy traditional Kerala dishes.

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** (Node Package Manager)
-   A **Meta Developer Account** with a WhatsApp App set up.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/ramadan-bot.git
    cd ramadan-bot
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    -   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    -   Open `.env` and fill in your details:
        ```properties
        WHATSAPP_PHONE_NUMBER_ID=your_id_here
        WHATSAPP_ACCESS_TOKEN=your_token_here
        RECIPIENT_PHONE_NUMBER=target_phone_number (e.g., 919876543210)
        RAMADAN_START_DATE=2026-02-18
        ```

### Running Locally

To start the bot in development mode:

```bash
npm run dev
```

The server will start on port 3000. It will attempt to send the daily message at 4:30 PM local time.

### Deployment

This bot is ready to be deployed on platforms like **Railway** or **Render**.

1.  Push your code to GitHub.
2.  Connect your repository to Railway/Render.
3.  Add the environment variables from your `.env` file to the deployment dashboard.
4.  The `Procfile` is already included for seamless deployment.

## 📁 Project Structure

-   `src/index.ts`: Main entry point (Server & Scheduler init).
-   `src/scheduler.ts`: Handles the daily cron job logic.
-   `src/services/whatsapp.service.ts`: Interact with WhatsApp Cloud API.
-   `src/data/mealPlan.json`: The source of truth for all meal plans.
-   `src/types/`: TypeScript definitions.

## 🛠️ Built With

-   [Node.js](https://nodejs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Express](https://expressjs.com/)
-   [node-cron](https://github.com/node-cron/node-cron)
-   [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)

## 📄 License

This project is open-source. Feel free to use and modify it.
