# Vibe 🎥

**[Live Site →](https://vibe-blue.vercel.app/)**

Vibe is a modern Zoom clone that enables optimized FaceTime-like meetings. Built with cutting-edge technologies like Stream Video SDK, Clerk authentication, Supabase, and more — it delivers a fast, secure, and smooth video conferencing experience.

![Vibe Screenshot](public/vibe.png)

---

## 🚀 Features

- 🔐 **Auth with Clerk** – Secure user management and session control.
- 🧑‍🤝‍🧑 **Meeting Rooms** – Create, join, and manage real-time meeting rooms.
- 📸 **Optimized FaceTime UX** – Minimalistic and performant video call UI.
- 📅 **Meeting Scheduler** – Plan meetings ahead of time with date picker.
- 🧩 **Stream SDK** – Powered by [Stream Video React SDK](https://getstream.io/video/) for high-quality WebRTC calls.
- 🌐 **Responsive UI** – Works across all screen sizes.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), `tailwindcss-animate`
- **Language**: TypeScript
- **Video SDK**: [Stream Video React SDK](https://getstream.io/video/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Backend Services**: [Supabase](https://supabase.io/)
- **UI Components**: Radix UI, Lucide Icons

Icons:
<p align="left">
  <img src="public/next.svg" width="30" />
  <img src="public/tail.svg" width="30" />
  <img src="public/ts.svg" width="30" />
  <img src="public/stream.svg" width="30" />
  <img src="public/supabase-logo-icon.png" width="30" />
</p>

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/vibe.git
cd vibe

# Install dependencies
npm install

# Create .env file and add your API keys
cp .env.example .env.local

# Start dev server
npm run dev
📁 Project Structure
bash
Copy
Edit
/
├── app/                  # App router pages and layouts
├── components/           # Reusable UI components
├── lib/                  # Utility functions and API logic
├── public/               # Static files (icons, images)
├── styles/               # Global styles (Tailwind)
└── .env.local            # Environment variables
🧪 Upcoming Features
✅ Recordings & playback

✅ Custom roles and permissions

✅ Meeting notes with real-time sync

✅ Chat during meetings

✅ Screen sharing

📃 License
MIT License. Feel free to fork and build upon Vibe for personal or commercial projects (just give credit!).

Author
Sayan Mallick
