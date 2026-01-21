# Discord Server Premium Website — Starter Scaffold

Overview
- Frontend: Next.js + Tailwind CSS + NextAuth (Discord sign-in)
- Bot API: Express + Socket.IO for real-time music control and server stats
- Goal: Premium responsive web UI to sign-in with Discord, view live members, control music, and manage staff roles.

Quick setup
1. Create a Discord Application (https://discord.com/developers/applications)
   - Add OAuth2 redirect URL: `http://localhost:3000/api/auth/callback/discord`
   - Save Client ID and Client Secret.
   - Create or use a bot and copy its token.

2. Copy .env.example to `.env.local` and fill values.

3. Install dependencies (root):
   - Frontend: `cd frontend && npm install`
   - Bot API: `cd bot-api && npm install`

4. Run locally:
   - Frontend: `cd frontend && npm run dev`
   - Bot API: `cd bot-api && npm run dev`

Notes
- This scaffold includes a music control UI; to actually play audio in Discord, implement a Discord bot (discord.js + voice/Lavalink) that connects to `/socket` on the bot-api and handles commands (`play`, `skip`, `pause`, ...).
- For production, secure the bot-api and use HTTPS; set `NEXTAUTH_URL` and `NEXTAUTH_SECRET`.
