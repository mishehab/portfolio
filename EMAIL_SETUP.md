Telegram-only contact notifications

This project is configured to deliver contact-form submissions to a Telegram chat using a bot. Follow the steps below to configure your bot and chat id so you receive messages in Telegram.

1) Create a bot and get a token
   - Use @BotFather in Telegram to create a bot and copy its token (looks like `123456:ABC-DEF...`).

2) Obtain the chat id
   - The chat id is the numeric identifier for the Telegram chat where you want to receive messages (your user id for private messages or the group's id for group chats).
   - Ways to obtain it:
     - Send a message to your bot from the Telegram account that should receive messages (open the bot and press Start). Then call the Bot API `getUpdates`:
       https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
       Look for `message.chat.id` in the returned JSON and copy that number.
     - Use a helper bot such as `@userinfobot` or `@get_id_bot` to obtain your numeric user id.

3) Configure environment variables
   - Create `.env.local` in the project root (do NOT commit this file to source control).
   - Add the following variables (replace values accordingly):

TELEGRAM_BOT_TOKEN=8485347720:AAFLzTZwtYt5iPhlozSujuQuDl3ZiBWx2Ck
TELEGRAM_CHAT_ID=5079735559

4) Restart the dev server
   - After adding or updating `.env.local`, restart Next.js so the environment variables are loaded:

```
npm run dev
```

5) Test the contact form
   - Open http://localhost:3000 and submit the Contact form. The API response JSON will indicate whether Telegram delivery succeeded (it includes a `details.telegramSent` boolean).

Troubleshooting
- If `getUpdates` returns an empty `result: []`, send a message to your bot from your Telegram account (press Start) and re-run `getUpdates`.
- If `sendMessage` returns `{"ok":false,"error_code":400,"description":"Bad Request: chat not found"}`, verify that `TELEGRAM_CHAT_ID` is correct and that the bot has been messaged or added to the chat.
- If `sendMessage` returns `{"ok":false,"error_code":403,"description":"Forbidden: bot was blocked by the user"}`, unblock the bot for that account.

Security note
- You posted your bot token publicly earlier. Rotate the token with @BotFather and update `.env.local` with the new token to prevent unauthorized access.

4) Restart the dev server
   - After adding `.env.local`, restart your Next.js dev server so the new variables are loaded.

5) Test the contact form
   - Open http://localhost:3000 and send a test message via the Contact form. If configured correctly you should see a success message and receive the email in your Gmail inbox.

Troubleshooting
- If you see an error about authentication, double-check the app password and that `EMAIL_ADDRESS` matches the account that generated the app password.
- If you prefer not to use App Passwords, you can configure OAuth2 for Nodemailer; that's more involved and requires client ID/secret configuration.
- If your messages are not delivered, check the terminal running Next.js for transporter errors.

Security note
- App passwords are safer than storing your regular account password but still should be treated as secrets. Rotate them if ever compromised.
