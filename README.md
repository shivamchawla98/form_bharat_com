<div align="center">

# 📝 FormBharat

### Free AI Form Builder for Indian Businesses
[![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-orange)](https://formbharat.com)

**[Website](https://formbharat.com)** • **[Help & Support](https://formbharat.com/help)** • **[Contact](https://formbharat.com/contact)**

Create beautiful forms, collect responses, and manage your data — all for free, forever.

---

</div>

## ✨ Features

- 🎨 Drag-and-drop form builder
- 📱 Mobile-responsive forms
- 📊 Response collection and management
- 🔐 Supabase authentication
- 🎯 Built for Indian businesses
- ⚡ Built with Next.js 15, TypeScript, and TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL (via Supabase)

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd form-bharat
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_connection_string
```

5. Run database migrations
```bash
npx prisma migrate dev
npx prisma generate
```

6. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Drag & Drop**: dnd-kit

## 📧 Support & Feedback

Have questions or feature requests? Reach out to us:
- **Email:** hello@formbharat.com
- **Website:** [formbharat.com](https://formbharat.com)
- **Help Center:** [formbharat.com/help](https://formbharat.com/help)

## 🙏 Acknowledgments

Built with ❤️ by the FormBharat community and powered by:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)

## 💬 Community & Support

- 🐦 Twitter: [@formbharat](https://twitter.com/formbharat)
- 💼 LinkedIn: [FormBharat](https://linkedin.com/company/formbharat)
- 📧 Email: [hello@formbharat.com](mailto:hello@formbharat.com)
- 🌐 Website: [formbharat.com](https://formbharat.com)

---

<div align="center">

Made with ❤️ in India 🇮🇳

Empowering Indian businesses with free, powerful tools.

</div>
