---
title: Telegram Integration
description: "Connect MoLOS to Telegram for AI-powered conversations on the go"
---

# Telegram Integration

Want to chat with MoLOS from Telegram? The Telegram integration brings The Architect to your favorite messaging app. Ask questions, manage tasks, and get AI-powered insights without opening a browser.

:::info
The Telegram bot has full access to your active MoLOS modules and their tools. Everything you can do in the web UI, you can do in Telegram.
:::

## What you can do

- **Ask anything** - Query tasks, goals, health data, or any module
- **Manage on the go** - Create, update, and organize your life from anywhere
- **Get instant answers** - AI-powered responses based on your actual data
- **Confirm actions** - Safe write operations require your approval

## Prerequisites

Before setting up the Telegram integration, make sure you have:

1. **A Telegram account** - Download the app from [telegram.org](https://telegram.org)
2. **Bot Token** - Create a bot via [BotFather](https://t.me/botfather)
3. **MoLOS instance** - A running MoLOS installation
4. **Webhook URL** (optional) - For real-time message delivery

## Step 1: Create your Telegram bot

1. Open Telegram and search for **[@BotFather](https://t.me/botfather)**
2. Send the command `/newbot`
3. Follow the prompts:
   - Choose a name (e.g., "My MoLOS Bot")
   - Choose a username (e.g., `my_molos_bot` - must end in `bot`)
4. Save the **Bot Token** BotFather gives you (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

:::tip
Keep your Bot Token secure! Anyone with it can control your bot.
:::

## Step 2: Get your Chat ID

You need your Chat ID to link the bot to your MoLOS account.

### Method 1: Use the Telegram API

1. Open Telegram and find your bot (send it a message first, like `/start`)
2. Visit this URL in your browser (replace `<YOUR_BOT_TOKEN>`):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. Look for `"chat":{"id":123456789` in the response
4. Copy that number - that's your Chat ID

:::tip
If the response is `[]`, send `/start` to your bot again, then refresh the page.
:::

### Method 2: For group chats

1. Add your bot to the group
2. Send a message in the group (mention the bot with `/start@your_bot_name`)
3. Visit the API URL above and look for a negative number (e.g., `-123456789`)
4. Use that negative ID as your Chat ID

## Step 3: Configure in MoLOS

1. Open MoLOS and navigate to **ui/ai/telegram**
2. Fill in the configuration:

| Field             | Description                          | Example                                           |
| ----------------- | ------------------------------------ | ------------------------------------------------- |
| **Bot Token**     | Token from BotFather                 | `123456789:ABCdefGHI...`                          |
| **Chat ID**       | Your Telegram chat ID                | `123456789`                                       |
| **Webhook URL**   | Your server's webhook URL (optional) | `https://your-domain.com/api/ai/telegram/webhook` |
| **Model**         | AI model to use                      | `claude-sonnet-4-20250514`                        |
| **System Prompt** | Custom instructions for the bot      | (optional)                                        |
| **Temperature**   | Response creativity (0-200)          | `100`                                             |
| **Max Tokens**    | Response length limit                | `4096`                                            |

3. Click **Save**

## Step 4: Start your bot

1. Open Telegram and find your bot (search for its username)
2. Click **Start** or send `/start`
3. The bot should reply: "Started a new conversation! How can I help you today?"

:::tip
Send `/new` anytime to start a fresh conversation with cleared context.
:::

## Webhook setup (optional but recommended)

For real-time message delivery (instead of polling), set up a webhook:

### Requirements

- **Public HTTPS URL** - Telegram requires HTTPS with valid SSL
- Options:
  - **ngrok** (for development): `ngrok http 5173`
  - **Cloudflare Tunnel**: `cloudflared tunnel`
  - **Production domain** with reverse proxy (nginx, Caddy, Traefik)

### Setting the webhook

1. In MoLOS Telegram settings, enter your webhook URL:
   ```
   https://your-domain.com/api/ai/telegram/webhook
   ```
2. Save the settings
3. MoLOS will automatically register the webhook with Telegram

### Verify the webhook

Check if the webhook is set:

```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

Response should show:

```json
{
  "ok": true,
  "result": {
    "url": "https://your-domain.com/api/ai/telegram/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## Using the bot

### Commands

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `/start` or `/new` | Start a fresh conversation with cleared context |

### How it works

Just chat naturally. The bot has access to all your active MoLOS modules and can:

- **Query data** - "What tasks do I have today?" (no confirmation needed)
- **Create/update/delete** - "Add a task to call mom at 6pm" (requires confirmation)

### Action confirmations

Write operations require your approval:

```
You: Add a task to review PRs
Bot: I need to create a task. Here's what I'll do:
• create_task: Add "Review PRs"

[✓ Confirm] [✗ Reject]
```

Tap **Confirm** to execute or **Reject** to cancel.

## Troubleshooting

### Bot doesn't respond

1. **Check the bot token** - Verify it matches BotFather's token exactly
2. **Check Chat ID** - Confirm you're using the correct ID
3. **Verify webhook** - Run `getWebhookInfo` to see if updates are being delivered
4. **Check MoLOS logs** - Look for `[Telegram Webhook]` entries

### "Bad Request: can't parse entities" error

This happens when Markdown formatting is too complex. The bot automatically falls back to plain text, but the message is still saved to your MoLOS history.

### Webhook not working

1. **HTTPS required** - Telegram doesn't allow HTTP webhooks
2. **Check SSL certificate** - Must be valid and not self-signed
3. **Verify URL** - Ensure the path is correct: `/api/ai/telegram/webhook`
4. **Check firewall** - Port 443 must be open

### Bot only shows base tools

If the bot isn't finding tools from external modules:

1. **Check active modules** - Go to Settings → Modules and verify modules are active
2. **Check logs** - Look for `[Telegram Webhook] Active modules:` in the server logs
3. **Restart** - Try sending `/new` to start a fresh session

## Security best practices

- **Never share your Bot Token** - Treat it like a password
- **Use environment variables** - Store sensitive config in `.env`
- **Limit bot permissions** - Only add the bot to private chats
- **Regular security audits** - Review connected chats in BotFather
- **HTTPS only** - Always use HTTPS for webhooks in production

## Advanced configuration

### Custom system prompt

Override the default Architect behavior:

```
You are a personal productivity assistant. Be concise and action-oriented.
Always suggest next steps. Use bullet points. Never apologize.
```

### Temperature settings

| Value   | Behavior                  |
| ------- | ------------------------- |
| 0-50    | Very focused, predictable |
| 100     | Balanced (default)        |
| 150-200 | More creative, varied     |

### Multiple users

Each user needs their own Chat ID. The bot can serve multiple MoLOS accounts - just configure each one separately with their unique Chat ID.

## Limitations

- **File uploads** - Not yet supported (use the web UI)
- **Voice messages** - Not yet supported
- **Media editing** - Use the web UI for complex media operations
- **Rate limits** - Telegram may rate-limit very active conversations

## Next steps

- [Learn about The Architect](/docs/getting-started/the-architect) - Understand the AI behind the bot
- [Module Development](/docs/module-development) - Build your own modules with AI tools
- [Community](/docs/community) - Get help and share your setup
