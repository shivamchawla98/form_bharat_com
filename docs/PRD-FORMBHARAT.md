# FormBharat - Product Requirements Document (PRD)

**Version:** 2.0  
**Last Updated:** April 26, 2026  
**Owner:** Shivam Chawla  
**Status:** Living Document

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [Core Features (Implemented)](#4-core-features-implemented)
4a. [Phase 5 Features (April 2026)](#4a-phase-5-features-april-2026)
5. [AI Features (Roadmap)](#5-ai-features-roadmap)
6. [Technical Architecture](#6-technical-architecture)
7. [Internationalization (i18n)](#7-internationalization-i18n)
8. [Security & Privacy](#8-security--privacy)
9. [Analytics & Monitoring](#9-analytics--monitoring)
10. [Go-to-Market Strategy](#10-go-to-market-strategy)

---

## 1. Product Overview

### 1.1 Vision
FormBharat is the **first open-source, AI-powered form builder designed specifically for Indian SMBs**, offering WhatsApp-first distribution and multilingual support.

### 1.2 Mission
Empower 10 million Indian businesses to collect customer data effortlessly through intelligent forms that speak their language.

### 1.3 Market Position
- **Primary Competitors:** Google Forms (free, basic), Typeform (expensive, Western-focused), Zoho Forms (complex)
- **Unique Value Proposition:**
  - 100% free and open source
  - WhatsApp integration (500M+ Indian users)
  - AI-powered form generation
  - Multilingual (Hindi, Tamil, Telugu, Marathi, Gujarati, Bengali)
  - Made in India 🇮🇳

### 1.4 Target Market
- **Primary:** Indian SMBs (1-50 employees) in retail, services, education, events
- **Secondary:** Freelancers, consultants, NGOs, local government
- **Geography:** India (Tier 1, 2, 3 cities)

---

## 2. Goals & Success Metrics

### 2.1 Business Goals (2026)
| Goal | Target | Current | Status |
|------|--------|---------|--------|
| Active Users | 500 | 54 | 🟡 In Progress |
| Forms Created | 5,000 | ~200 | 🟡 In Progress |
| Monthly Responses | 50,000 | ~1,000 | 🟡 In Progress |
| GitHub Stars | 1,000 | TBD | 🔴 Not Started |
| SEO Traffic | 10k/month | <100 | 🟡 In Progress |

### 2.2 Product Metrics (North Star)
- **Primary:** Forms created per user (target: 5+)
- **Secondary:** Response collection rate (target: 70%+)
- **Engagement:** Weekly active users / Monthly active users (target: 40%+)

### 2.3 Success Criteria
- ✅ User can create a form in <2 minutes
- ✅ 80%+ forms are shared via WhatsApp
- ✅ 60%+ users return within 7 days
- ✅ <5% churn rate monthly

---

## 3. User Personas

### Persona 1: "Rajesh the Restaurant Owner"
- **Age:** 35-45
- **Location:** Tier 2 city (Jaipur, Lucknow)
- **Tech Savvy:** Low-Medium
- **Language:** Hindi + English
- **Pain Points:**
  - Needs customer feedback but doesn't know how
  - Uses WhatsApp for everything
  - Can't afford expensive tools
- **Use Cases:** Customer feedback, order forms, event bookings

### Persona 2: "Priya the Event Planner"
- **Age:** 28-35
- **Location:** Metro (Mumbai, Bangalore)
- **Tech Savvy:** Medium-High
- **Language:** English
- **Pain Points:**
  - Needs professional-looking forms quickly
  - Manages multiple events simultaneously
  - Needs analytics to show clients
- **Use Cases:** Event registration, vendor forms, attendee surveys

### Persona 3: "Amit the Tuition Teacher"
- **Age:** 30-40
- **Location:** Tier 3 city (Nashik, Coimbatore)
- **Tech Savvy:** Low
- **Language:** Regional (Marathi, Tamil) + Hindi
- **Pain Points:**
  - Needs to collect student enrollment data
  - Parents prefer regional language forms
  - Limited budget
- **Use Cases:** Student registration, parent feedback, attendance tracking

---

## 4. Core Features (Implemented)

> **Note:** See `COMPLETE-FEATURES-LIST.md` for full technical details and `PROGRESS.md` for current status. This section covers product requirements.

### Phase 1–4 Status Summary (as of April 26, 2026)

| Feature | Status |
|---------|--------|
| Form Builder (drag-and-drop, 8+ field types) | ✅ Live |
| Multi-Step Forms | ✅ Live |
| 12+ Templates | ✅ Live |
| WhatsApp Integration | ✅ Live |
| Analytics Dashboard + CSV export | ✅ Live |
| Webhook System | ✅ Live |
| Email Notifications (Resend) | ✅ Live |
| Google Auth + Email/Password Auth | ✅ Live |
| Auth Protection (all private routes) | ✅ Live |
| Help Center + 24-article Resources section | ✅ Live |
| SEO (92/100 score) | ✅ Live |

### 4.1 Form Builder

**Goal:** Enable users to create professional forms in <2 minutes without technical knowledge.

**Requirements:**
- ✅ Drag-and-drop field reordering
- ✅ 8+ field types (text, email, phone, textarea, dropdown, radio, checkbox, file, section, heading, image)
- ✅ Real-time preview
- ✅ Mobile-responsive builder
- ✅ Undo/redo functionality (❌ NOT IMPLEMENTED)

**User Flow:**
1. User clicks "Create Form" from dashboard
2. Chooses template OR starts blank
3. Adds fields via sidebar selector
4. Configures field properties (label, placeholder, required)
5. Reorders fields via drag-and-drop
6. Clicks "Save Form"
7. Redirected to form settings/share page

**States:**
- **Empty State:** Show "Add your first field" prompt with template suggestions
- **Building State:** Show field count, save status indicator
- **Saving State:** Disable save button, show "Saving..." spinner
- **Saved State:** Show success toast, enable share options
- **Error State:** Show error message, allow retry

**Wireframes:** [TODO: Add Figma/Sketch links]

**i18n Considerations:**
- Field type labels must be translatable
- Placeholder text should support RTL languages (future: Urdu, Arabic)
- Error messages in user's language

**Security:**
- Form data sanitized before save (XSS prevention)
- User must be authenticated to create forms
- Rate limiting: 10 forms per hour per user

---

### 4.2 Form Templates

**Goal:** Reduce time-to-first-form by providing industry-specific templates.

**Requirements:**
- ✅ 12 pre-built templates across 7 categories
- ✅ Search and filter by category
- ✅ One-click "Use Template" loads into builder
- ✅ Templates are fully customizable
- ❌ User-submitted templates (FUTURE)

**User Flow:**
1. User clicks "Templates" in navigation
2. Browses categories OR searches by keyword
3. Clicks template card to preview
4. Clicks "Use Template"
5. Template loads in builder with all fields pre-filled
6. User customizes and saves

**States:**
- **Loading State:** Skeleton cards while templates load
- **Empty Search:** "No templates found. Try different keywords."
- **Template Preview:** Modal showing all fields before use
- **Loading Template:** Show spinner while copying to builder

**Wireframes:** [TODO: Add template gallery mockup]

**i18n:**
- Template names and descriptions in user's language
- Template fields should have regional defaults (e.g., "GST Number" for Indian business forms)

**Security:**
- Templates are read-only (users can't modify master templates)
- Template data sanitized on load

---

### 4.3 WhatsApp Integration

**Goal:** Enable viral form distribution via India's #1 messaging platform.

**Requirements:**
- ✅ Share button on dashboard (per form)
- ✅ Share button on public form page
- ✅ Pre-formatted message: "Fill out my form: [Title] [Link]"
- ✅ Opens WhatsApp Web/App with message ready
- ❌ WhatsApp Business API integration (FUTURE)

**User Flow:**
1. User clicks green "WhatsApp" button
2. WhatsApp opens with pre-filled message
3. User selects contact/group
4. Sends message
5. Recipient clicks link → opens form

**States:**
- **Button Idle:** Green with WhatsApp icon
- **Button Hover:** Slightly darker green
- **Opening WhatsApp:** Brief loading state
- **WhatsApp Not Installed:** Fallback to WhatsApp Web

**Wireframes:** [TODO: Add share button placement mockups]

**i18n:**
- Share message text in user's language
- Support regional WhatsApp number formats

**Security:**
- Form link is public (no auth required to view)
- Rate limiting on form submissions (100/hour per form)

---

### 4.4 Multi-Step Forms

**Goal:** Improve completion rates for long forms by breaking into pages.

**Requirements:**
- ✅ Enable/disable toggle in form settings
- ✅ Auto-groups fields (3-4 per page)
- ✅ Next/Previous navigation
- ✅ Progress indicator
- ❌ Custom page breaks (FUTURE)
- ❌ Save partial progress (FUTURE)

**User Flow:**
1. User creates form with 10+ fields
2. Goes to Settings → Enables "Multi-step form"
3. System auto-groups fields into pages
4. User opens public form → sees Page 1 of 3
5. Fills fields → clicks "Next"
6. Continues until final page → clicks "Submit"

**States:**
- **Page 1:** "Next" button only
- **Middle Pages:** "Previous" and "Next" buttons
- **Final Page:** "Previous" and "Submit" buttons
- **Validation Error:** Highlight invalid fields, prevent navigation
- **Submitting:** Disable buttons, show spinner

**Wireframes:** [TODO: Add multi-step form flow]

**i18n:**
- "Next", "Previous", "Submit" buttons in user's language
- Progress text: "Page 1 of 3" → "पृष्ठ 1 का 3"

**Security:**
- Validate each page before allowing navigation
- Store page state in session (not localStorage for security)

---

### 4.5 Analytics Dashboard

**Goal:** Help users understand their form performance and response patterns.

**Requirements:**
- ✅ Key metrics cards (total responses, response rate, avg completion time)
- ✅ Responses over time chart (30 days)
- ✅ Field-by-field analysis
- ✅ Top answers for categorical fields
- ❌ Funnel analysis for multi-step forms (FUTURE)
- ❌ Export charts as images (FUTURE)

**User Flow:**
1. User clicks "Analytics" icon on form card
2. Dashboard loads with metrics
3. Scrolls to see field analysis
4. Clicks field to see detailed breakdown
5. Exports data as CSV if needed

**States:**
- **No Data:** "No responses yet. Share your form to start collecting data."
- **Loading:** Skeleton charts while data loads
- **Data Loaded:** Interactive charts with hover tooltips
- **Error:** "Failed to load analytics. Retry?"

**Wireframes:** [TODO: Add analytics dashboard mockup]

**i18n:**
- Chart labels and tooltips in user's language
- Date formats: DD/MM/YYYY for India

**Security:**
- Only form owner can view analytics
- Rate limiting on analytics API (prevent data scraping)

---

### 4.6 Webhook Integration

**Goal:** Enable automation and integration with third-party tools (Zapier, Make, n8n).

**Requirements:**
- ✅ Configure webhook URL per form
- ✅ Enable/disable toggle
- ✅ POST JSON payload on new response
- ❌ Webhook logs and retry UI (FUTURE)
- ❌ Webhook authentication (HMAC signatures) (FUTURE)

**User Flow:**
1. User goes to Form Settings → Webhooks
2. Enters webhook URL (e.g., Zapier endpoint)
3. Enables webhook
4. Saves settings
5. When form is submitted → webhook fires
6. User checks third-party tool for data

**States:**
- **Webhook Disabled:** Gray toggle, URL input disabled
- **Webhook Enabled:** Green toggle, URL input active
- **Testing Webhook:** "Send Test" button shows spinner
- **Webhook Success:** Green checkmark, "Last fired: 2 mins ago"
- **Webhook Failed:** Red X, "Failed to deliver. Retry?"

**Payload Format:**
```json
{
  "formId": "abc123",
  "formTitle": "Customer Feedback",
  "responseId": "xyz789",
  "timestamp": "2026-04-21T12:00:00Z",
  "data": {
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "rating": "5"
  }
}
```

**Wireframes:** [TODO: Add webhook settings UI]

**i18n:**
- Settings labels in user's language
- Error messages localized

**Security:**
- Validate webhook URL format (https only)
- Rate limiting: 1 webhook per response
- Timeout: 5 seconds max
- No sensitive data in payload (no passwords, tokens)

---

---

## 4a. Phase 5 Features (April 2026)

> All shipped April 26, 2026. FormBharat is now feature-comparable to Tally.so (free tier).

### 4a.1 Conditional Logic

**Status:** ✅ Live

**Requirements (all met):**
- ✅ `FieldCondition` type on every `FormField` (fieldId, operator, value)
- ✅ Operators: `equals`, `not_equals`, `contains`, `is_empty`, `is_not_empty`
- ✅ Builder UI — per-field conditional logic section with trigger selector + operator dropdown
- ✅ Builder preview respects conditions (live filtering)
- ✅ Public form renderer filters hidden fields
- ✅ Required validation skipped for hidden fields
- ✅ Multi-step navigation skips hidden-only steps

**Files:** `lib/types.ts`, `lib/conditional-logic.ts`, `components/form-builder/SortableField.tsx`, `components/form-builder/FormBuilder.tsx`, `app/f/[id]/page.tsx`

---

### 4a.2 Form Embed Code

**Status:** ✅ Live

**Requirements (all met):**
- ✅ iframe embed snippet generated per form (in Settings page)
- ✅ JS embed snippet (alternative, for dynamic height)
- ✅ Copy-to-clipboard button for each snippet

**Files:** `app/dashboard/forms/[id]/settings/page.tsx`

---

### 4a.3 Custom Thank-You Message + Redirect URL

**Status:** ✅ Live

**Requirements (all met):**
- ✅ `successMessage` field on `Form` model (DB + API + UI)
- ✅ `redirectUrl` field on `Form` model (DB + API + UI)
- ✅ After submission: show custom message if set, else default
- ✅ After submission: redirect to URL if set

**Files:** `prisma/schema.prisma`, `app/api/forms/[id]/settings/route.ts`, `app/dashboard/forms/[id]/settings/page.tsx`, `app/f/[id]/page.tsx`

---

### 4a.4 Form Scheduling + Response Limits

**Status:** ✅ Live

**Requirements (all met):**
- ✅ `opensAt`, `closesAt`, `maxResponses` fields on `Form` model
- ✅ API enforces all three on every submission (403 with friendly message)
- ✅ Settings UI — date/time pickers for open/close, number input for max responses
- ✅ Public form shows banner when form is not yet open or has closed
- ✅ DB migration applied to Supabase

**Files:** `prisma/schema.prisma`, `app/api/forms/[id]/responses/route.ts`, `app/api/forms/[id]/settings/route.ts`, `app/dashboard/forms/[id]/settings/page.tsx`, `app/f/[id]/page.tsx`

---

### 4a.5 QR Code Generation

**Status:** ✅ Live

**Requirements (all met):**
- ✅ Per-form QR code generated on-demand (`qrcode` npm package)
- ✅ Displayed in Settings page
- ✅ Downloadable as PNG

**Files:** `app/dashboard/forms/[id]/settings/page.tsx`

---

### 4.7 Email Notifications

**Goal:** Notify form owners of new responses via email.

**Requirements:**
- ✅ Enable/disable per form
- ✅ Multiple recipients (comma-separated)
- ✅ HTML email template with response data
- ✅ Powered by Resend API
- ❌ Custom email templates (FUTURE)
- ❌ Digest mode (daily summary) (FUTURE)

**User Flow:**
1. User goes to Form Settings → Email Notifications
2. Enables notifications
3. Adds recipient emails (self, team members)
4. Saves settings
5. When form is submitted → email sent to all recipients

**States:**
- **Disabled:** Gray toggle, email inputs hidden
- **Enabled:** Green toggle, email inputs visible
- **Sending Test:** "Send Test Email" button shows spinner
- **Email Sent:** Success toast
- **Email Failed:** Error toast with retry option

**Email Template:**
- Subject: "New response for [Form Title]"
- Body: Form title, timestamp, all field labels + values
- Footer: "Powered by FormBharat" with link

**Wireframes:** [TODO: Add email settings UI + email preview]

**i18n:**
- Email subject and body in form owner's language
- Support non-Latin characters in email content

**Security:**
- Validate email addresses (regex + DNS check)
- Rate limiting: 10 emails per form per hour
- No email harvesting (recipients not exposed in API)
- Use Resend's DKIM/SPF for deliverability

---

## 5. AI Features (Roadmap)

> **Status:** Not yet implemented. This section defines requirements for AI-powered features.

### 5.1 AI Form Generator

**Goal:** Generate complete forms from natural language descriptions in <10 seconds.

**Priority:** P0 (Highest)

**Requirements:**
- User inputs description (e.g., "Restaurant feedback form with food quality and service ratings")
- AI generates form title, description, and 5-10 relevant fields
- User can regenerate or edit fields
- Supports English and Hindi input
- Uses GPT-4 or Claude 3 API

**User Flow:**
1. User clicks "Create with AI" button on dashboard
2. Modal opens with text input
3. User types description (or selects from examples)
4. Clicks "Generate Form"
5. AI generates form in 5-10 seconds
6. Preview shown with "Use This Form" or "Regenerate" options
7. User clicks "Use This Form" → loads into builder

**States:**
- **Input State:** Empty textarea with placeholder examples
- **Generating State:** Loading animation with progress text ("Analyzing your needs...", "Creating fields...", "Almost done...")
- **Generated State:** Preview of form with field count
- **Error State:** "Failed to generate. Try rephrasing your description."
- **Regenerating State:** Same as generating, but keeps previous form visible

**Example Inputs & Outputs:**

**Input:** "Customer feedback form for my restaurant"
**Output:**
```
Title: Restaurant Customer Feedback
Description: Help us improve your dining experience
Fields:
1. Name (text, optional)
2. Email (email, optional)
3. Visit Date (date, required)
4. Food Quality (radio: Excellent, Good, Average, Poor)
5. Service Quality (radio: Excellent, Good, Average, Poor)
6. Ambiance (radio: Excellent, Good, Average, Poor)
7. Overall Rating (dropdown: 5 stars, 4 stars, 3 stars, 2 stars, 1 star)
8. What did you like most? (textarea, optional)
9. What can we improve? (textarea, optional)
10. Would you recommend us? (radio: Yes, No, Maybe)
```

**Wireframes:** [TODO: Add AI generator modal mockup]

**i18n:**
- Support Hindi input: "मेरे रेस्टोरेंट के लिए ग्राहक फीडबैक फॉर्म"
- Generated field labels in input language
- Fallback to English if language not supported

**Security:**
- Rate limiting: 5 generations per user per day (free tier)
- Input sanitization (prevent prompt injection)
- No PII in AI requests (user data not sent to OpenAI)
- API key stored securely in env vars

**Technical Implementation:**
```typescript
// API Route: /api/ai/generate-form
POST /api/ai/generate-form
Headers: { Authorization: Bearer <token> }
Body: {
  description: string,
  language: 'en' | 'hi',
  formType?: 'feedback' | 'registration' | 'survey' | 'order'
}

Response: {
  title: string,
  description: string,
  fields: FormField[]
}
```

**Cost Estimation:**
- GPT-4: ~$0.02 per generation
- At 1000 users, 5 generations each = $100/month
- Mitigation: Cache common form types, use GPT-3.5 for simple forms

---

### 5.2 Multilingual Auto-Translation

**Goal:** Translate forms into 6 Indian languages instantly.

**Priority:** P0 (Highest)

**Requirements:**
- User builds form in English
- Clicks "Translate" button
- Selects target languages (Hindi, Tamil, Telugu, Marathi, Gujarati, Bengali)
- AI translates all field labels, placeholders, descriptions
- Public form shows language selector dropdown
- Responses stored with language metadata

**User Flow:**
1. User creates form in English
2. Clicks "Translate" button in builder
3. Modal shows language checkboxes
4. User selects Hindi + Tamil
5. Clicks "Translate"
6. AI translates in 10-15 seconds
7. Success message: "Form translated to 2 languages"
8. Public form now has language dropdown (English, हिंदी, தமிழ்)
9. Respondent selects language → form updates

**States:**
- **No Translations:** "Translate" button visible
- **Translating:** Progress bar with language names
- **Translated:** Badge showing "Available in 3 languages"
- **Translation Error:** "Failed to translate to Tamil. Retry?"
- **Editing Translations:** User can manually edit AI translations

**Example Translation:**

**English:**
```
Field: "What is your name?"
Placeholder: "Enter your full name"
```

**Hindi:**
```
Field: "आपका नाम क्या है?"
Placeholder: "अपना पूरा नाम दर्ज करें"
```

**Tamil:**
```
Field: "உங்கள் பெயர் என்ன?"
Placeholder: "உங்கள் முழு பெயரை உள்ளிடவும்"
```

**Wireframes:** [TODO: Add translation modal + language selector]

**i18n:**
- Language selector must support non-Latin scripts
- RTL support for future Urdu/Arabic
- Font loading for regional scripts (Google Fonts: Noto Sans Devanagari, Noto Sans Tamil)

**Security:**
- Translations stored in database (not regenerated each time)
- Rate limiting: 10 translations per user per day
- Input sanitization before sending to AI

**Technical Implementation:**
```typescript
// API Route: /api/ai/translate-form
POST /api/ai/translate-form
Body: {
  formId: string,
  targetLanguages: ('hi' | 'ta' | 'te' | 'mr' | 'gu' | 'bn')[]
}

Response: {
  translations: {
    [language: string]: {
      title: string,
      description: string,
      fields: { [fieldId: string]: { label, placeholder } }
    }
  }
}
```

**Database Schema:**
```prisma
model FormTranslation {
  id        String   @id @default(cuid())
  formId    String
  language  String   // 'hi', 'ta', etc.
  title     String
  description String?
  fields    Json     // { fieldId: { label, placeholder } }
  createdAt DateTime @default(now())
  form      Form     @relation(fields: [formId], references: [id])
}
```

---

### 5.3 AI Response Summarizer

**Goal:** Auto-analyze text responses and generate insights.

**Priority:** P1 (High)

**Requirements:**
- Runs on forms with 10+ text/textarea responses
- Generates summary: themes, sentiment, key quotes
- Shows in Analytics dashboard
- Updates in real-time as new responses come in
- Supports English and Hindi responses

**User Flow:**
1. User opens Analytics for form with 50+ responses
2. Sees "AI Insights" card at top
3. Card shows:
   - Top 3 themes with percentages
   - Overall sentiment (Positive/Neutral/Negative)
   - 2-3 representative quotes
4. User clicks "View Full Analysis" → detailed breakdown
5. User can export insights as PDF

**States:**
- **Not Enough Data:** "Collect 10+ responses to see AI insights"
- **Analyzing:** "Analyzing responses..." with spinner
- **Insights Ready:** Summary card with themes and sentiment
- **Error:** "Failed to analyze. Retry?"

**Example Output:**

**Form:** "What can we improve about our service?"
**50 Responses (text)**

**AI Summary:**
```
Top Themes:
1. Delivery Speed (45%) - "Delivery takes too long", "Please improve delivery time"
2. Customer Support (30%) - "Support team is slow to respond", "Need better support"
3. Product Quality (25%) - "Quality has decreased", "Products not as good as before"

Overall Sentiment: Negative (65% negative, 25% neutral, 10% positive)

Key Quotes:
- "Delivery takes 5-7 days, should be 2-3 days max"
- "Customer support doesn't respond to emails"
- "Quality was better 6 months ago"

Recommendations:
- Focus on improving delivery logistics
- Hire more support staff or implement chatbot
- Review product quality control processes
```

**Wireframes:** [TODO: Add AI insights card mockup]

**i18n:**
- Insights generated in form owner's language
- Can analyze mixed-language responses (English + Hindi)

**Security:**
- Only form owner can see insights
- Responses anonymized before sending to AI (no names/emails)
- Rate limiting: 1 analysis per form per hour

**Technical Implementation:**
```typescript
// API Route: /api/ai/analyze-responses
POST /api/ai/analyze-responses
Body: {
  formId: string,
  fieldId: string // which text field to analyze
}

Response: {
  themes: { name: string, percentage: number }[],
  sentiment: { positive: number, neutral: number, negative: number },
  quotes: string[],
  recommendations: string[]
}
```

---

### 5.4 AI Help Chatbot

**Goal:** Replace/augment Tawk.to with AI-powered support trained on docs.

**Priority:** P2 (Medium)

**Requirements:**
- Chat widget on all pages
- Trained on 12 help articles + 24 resource articles
- Answers common questions instantly
- Escalates to human (email) if can't answer
- Supports English and Hindi queries

**User Flow:**
1. User clicks chat bubble
2. Types question: "How do I add WhatsApp sharing?"
3. AI responds in 2-3 seconds with step-by-step answer
4. User can ask follow-up questions
5. If AI can't answer → "Would you like to email our support team?"

**States:**
- **Chat Closed:** Bubble in bottom-right
- **Chat Open:** Chat window with greeting message
- **AI Typing:** Animated dots
- **AI Response:** Answer with sources (links to help articles)
- **Escalation:** "I couldn't find an answer. Email support@formbharat.com"

**Example Conversation:**

**User:** "How do I share my form on WhatsApp?"

**AI:** "To share your form on WhatsApp:
1. Go to your Dashboard
2. Find the form you want to share
3. Click the green 'WhatsApp' button
4. WhatsApp will open with a pre-filled message
5. Select contacts or groups and send!

You can also share from the public form page using the share button.

[Learn more →](/help/sharing-forms-whatsapp)"

**Wireframes:** [TODO: Add chatbot UI mockup]

**i18n:**
- Detect user's language from browser
- Respond in same language as query
- Support code-switching (English + Hindi mixed)

**Security:**
- No PII collected in chat (anonymous by default)
- Rate limiting: 20 messages per user per day
- Chat history not stored (privacy-first)

**Technical Implementation:**
```typescript
// API Route: /api/ai/chat
POST /api/ai/chat
Body: {
  message: string,
  conversationId?: string, // for follow-ups
  language?: 'en' | 'hi'
}

Response: {
  reply: string,
  sources: { title: string, url: string }[],
  escalate: boolean // true if AI can't answer
}
```

**Cost:** ~$0.01 per conversation = $10/month at 1000 conversations

---

### 5.5 Smart Field Suggestions

**Goal:** Speed up form building with context-aware suggestions.

**Priority:** P2 (Medium)

**Requirements:**
- As user types field label, AI suggests field type, placeholder, validation
- Example: User types "Email" → AI suggests email field type + validation
- User types "Phone" → AI suggests phone field with Indian format
- Accepts or ignores suggestions with one click

**User Flow:**
1. User adds new field in builder
2. Types label: "Customer Email"
3. AI suggests:
   - Field Type: Email
   - Placeholder: "example@email.com"
   - Validation: Email format
   - Required: Yes
4. User clicks "Apply Suggestions" or ignores

**States:**
- **No Suggestion:** User typing, no AI badge
- **Suggestion Ready:** Blue badge "AI Suggestion" with preview
- **Applied:** Green checkmark, fields auto-filled
- **Ignored:** Suggestion fades away

**Example Suggestions:**

| User Input | AI Suggestion |
|------------|---------------|
| "Name" | Type: Text, Placeholder: "Enter your full name", Required: Yes |
| "Email" | Type: Email, Placeholder: "example@email.com", Validation: Email, Required: Yes |
| "Phone" | Type: Phone, Placeholder: "+91 98765 43210", Validation: Indian phone, Required: Yes |
| "Feedback" | Type: Textarea, Placeholder: "Share your thoughts...", Required: No |
| "Rating" | Type: Radio, Options: ["Excellent", "Good", "Average", "Poor"], Required: Yes |

**Wireframes:** [TODO: Add suggestion tooltip mockup]

**i18n:**
- Suggestions in user's language
- Placeholder text localized (e.g., "+91" for India)

**Security:**
- Suggestions generated client-side (no API call)
- Uses local rules + lightweight AI model

**Technical Implementation:**
- Use GPT-3.5 Turbo (cheaper, faster)
- Cache common suggestions
- Fallback to rule-based if AI unavailable

---

## 6. Technical Architecture

### 6.1 Current Stack
- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** TailwindCSS, shadcn/ui components
- **Backend:** Next.js API Routes (serverless)
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth (email/password, Google OAuth)
- **File Storage:** AWS S3 (images)
- **Email:** Resend API
- **Deployment:** AWS Amplify
- **Analytics:** [TODO: Add analytics tool]

### 6.2 AI Integration Architecture

**LLM Provider:** OpenAI GPT-4 / Anthropic Claude 3

**API Structure:**
```
/api/ai/
  ├── generate-form      # AI Form Generator
  ├── translate-form     # Multilingual Translation
  ├── analyze-responses  # Response Summarizer
  ├── chat               # Help Chatbot
  └── suggest-field      # Smart Field Suggestions
```

**Rate Limiting:**
- Redis for rate limit tracking
- Upstash Redis (serverless-friendly)

**Cost Management:**
- Cache common AI responses
- Use GPT-3.5 for simple tasks
- User-provided API keys (optional)

### 6.3 Database Schema Updates

**New Tables for AI Features:**

```prisma
model FormTranslation {
  id          String   @id @default(cuid())
  formId      String
  language    String   // ISO 639-1 code
  title       String
  description String?
  fields      Json     // { fieldId: { label, placeholder } }
  createdAt   DateTime @default(now())
  form        Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  @@unique([formId, language])
}

model AIInsight {
  id          String   @id @default(cuid())
  formId      String
  fieldId     String   // which field was analyzed
  themes      Json     // [{ name, percentage }]
  sentiment   Json     // { positive, neutral, negative }
  quotes      String[] // representative quotes
  recommendations String[]
  analyzedAt  DateTime @default(now())
  form        Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
}

model AIUsage {
  id          String   @id @default(cuid())
  userId      String
  feature     String   // 'generate-form', 'translate', etc.
  tokensUsed  Int
  cost        Float    // in USD
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## 7. Internationalization (i18n)

### 7.1 Supported Languages

**Phase 1 (Current):**
- English (en-IN) ✅

**Phase 2 (AI Translation):**
- Hindi (hi) - 528M speakers
- Tamil (ta) - 75M speakers
- Telugu (te) - 82M speakers
- Marathi (mr) - 83M speakers
- Gujarati (gu) - 56M speakers
- Bengali (bn) - 265M speakers

**Phase 3 (Future):**
- Kannada (kn)
- Malayalam (ml)
- Punjabi (pa)
- Urdu (ur) - RTL support needed

### 7.2 Implementation Strategy

**UI Translation:**
- Use `next-intl` library
- JSON files per language: `/locales/en.json`, `/locales/hi.json`
- Language switcher in header
- Store preference in localStorage + database

**Content Translation:**
- Forms: AI-powered translation (see 5.2)
- Help articles: Manual translation (hire translators)
- Marketing pages: Manual translation

**Date/Time Formats:**
- India: DD/MM/YYYY, 12-hour clock
- Use `date-fns` with locale support

**Number Formats:**
- Indian numbering: 1,00,000 (not 100,000)
- Currency: ₹ symbol

### 7.3 Font Loading

**Regional Scripts:**
- Devanagari (Hindi, Marathi): Noto Sans Devanagari
- Tamil: Noto Sans Tamil
- Telugu: Noto Sans Telugu
- Gujarati: Noto Sans Gujarati
- Bengali: Noto Sans Bengali

**Performance:**
- Preload fonts for selected language only
- Use `font-display: swap` to prevent FOIT

### 7.4 RTL Support (Future)

**Languages:** Urdu, Arabic

**CSS Changes:**
- Use logical properties: `margin-inline-start` instead of `margin-left`
- Mirror icons and layouts
- Test with `dir="rtl"` attribute

---

## 8. Security & Privacy

### 8.1 Authentication & Authorization

**Current Implementation:**
- Supabase Auth (JWT tokens)
- Email/password + Google OAuth
- Session stored in httpOnly cookies

**Requirements:**
- ✅ All private routes protected (dashboard, builder, settings)
- ✅ Public forms accessible without auth
- ✅ Form ownership verified on all mutations
- ❌ Two-factor authentication (FUTURE)
- ❌ SSO for enterprise (FUTURE)

**Security Measures:**
- Password hashing: bcrypt (via Supabase)
- JWT expiry: 1 hour (refresh token: 7 days)
- CSRF protection: SameSite cookies
- Rate limiting: 5 login attempts per 15 minutes

### 8.2 Data Privacy

**GDPR/DPDPA Compliance:**
- ✅ Privacy Policy page
- ✅ Terms of Service page
- ❌ Cookie consent banner (FUTURE)
- ❌ Data export (user can request their data) (FUTURE)
- ❌ Data deletion (right to be forgotten) (FUTURE)

**Data Storage:**
- User data: Supabase (EU region available)
- Form responses: PostgreSQL (encrypted at rest)
- File uploads: AWS S3 (private bucket, presigned URLs)
- No third-party tracking (privacy-first)

**PII Handling:**
- Form responses may contain PII (user responsibility)
- No PII sent to AI APIs (anonymized before analysis)
- Email addresses hashed in analytics

### 8.3 Input Validation & Sanitization

**XSS Prevention:**
- All user input sanitized before rendering
- Use DOMPurify for rich text
- CSP headers: `script-src 'self'`

**SQL Injection:**
- Prisma ORM (parameterized queries)
- No raw SQL queries

**File Upload Security:**
- Whitelist: images only (JPEG, PNG, GIF, WebP, SVG)
- Max size: 5 MB
- Virus scanning: [TODO: Add ClamAV or similar]
- Presigned URLs (S3) with 5-minute expiry

### 8.4 API Security

**Rate Limiting:**
- Global: 100 requests per minute per IP
- AI endpoints: 5 requests per minute per user
- Form submissions: 100 per hour per form

**Authentication:**
- Bearer tokens in Authorization header
- API keys for webhooks (HMAC signatures)

**CORS:**
- Whitelist: formbharat.com, localhost
- Credentials: true (for cookies)

### 8.5 AI Security

**Prompt Injection Prevention:**
- Input sanitization before sending to LLM
- System prompts locked (user can't override)
- Output validation (reject harmful content)

**Data Privacy:**
- No PII sent to OpenAI/Anthropic
- Responses anonymized before analysis
- API keys stored in env vars (not database)

**Cost Protection:**
- Rate limiting per user
- Token limits per request (max 4000 tokens)
- Monthly budget alerts

---

## 9. Analytics & Monitoring

### 9.1 Product Analytics

**Tool:** [TODO: Choose - Plausible, PostHog, or Mixpanel]

**Events to Track:**
- User signup (source, method)
- Form created (template vs. blank, field count)
- Form published (time to publish)
- Form shared (channel: WhatsApp, copy link)
- Form submitted (completion rate, time taken)
- AI feature used (feature type, success/failure)

**Dashboards:**
- User acquisition funnel
- Form creation funnel
- Feature adoption rates
- Retention cohorts

### 9.2 Error Monitoring

**Tool:** Sentry

**Alerts:**
- API errors (500, 503)
- Database connection failures
- AI API failures
- File upload failures

### 9.3 Performance Monitoring

**Metrics:**
- Page load time (target: <2s)
- Time to Interactive (target: <3s)
- API response time (target: <500ms)
- Database query time (target: <100ms)

**Tools:**
- Vercel Analytics (built-in)
- Lighthouse CI (automated audits)

### 9.4 Business Metrics

**Weekly Reports:**
- New users
- Active users (DAU, WAU, MAU)
- Forms created
- Responses collected
- Revenue (future: paid plans)

---

## 10. Go-to-Market Strategy

### 10.1 Launch Plan

**Phase 1: Soft Launch (Current)**
- Target: 500 users in 60 days
- Channels: Product Hunt, Reddit (r/india, r/smallbusiness), Twitter, LinkedIn
- Content: SEO articles (24 live), help center (12 articles)

**Phase 2: AI Features Launch**
- Target: 2,000 users in 90 days
- Announcement: "FormBharat now has AI superpowers"
- Demo video: AI form generation in 10 seconds
- Press: YourStory, Inc42, TechCrunch India

**Phase 3: Multilingual Launch**
- Target: 10,000 users in 6 months
- Regional marketing: Hindi, Tamil, Telugu ads
- Partnerships: Local business associations, chambers of commerce

### 10.2 Pricing Strategy

**Current:** 100% free (open source)

**Future (Optional):**
- **Free Tier:** Unlimited forms, 100 responses/month, basic AI (5 generations/day)
- **Pro Tier (₹499/month):** Unlimited responses, unlimited AI, priority support, custom branding
- **Enterprise:** Custom pricing, SSO, dedicated support, on-premise deployment

### 10.3 Marketing Channels

**Organic:**
- SEO (24 articles live, target: 10k monthly traffic)
- Open source (GitHub stars, contributors)
- Content marketing (blog, case studies)

**Paid:**
- Google Ads (target: "form builder India", "online forms")
- Facebook/Instagram Ads (target: SMB owners, event planners)
- LinkedIn Ads (target: B2B, HR professionals)

**Partnerships:**
- WhatsApp Business API partners
- Razorpay (payment integration)
- Zoho (CRM integration)

### 10.4 Community Building

**Channels:**
- Discord server (for users + contributors)
- Twitter (@formbharat)
- LinkedIn page
- YouTube (tutorials, feature demos)

**Content:**
- Weekly feature updates
- User success stories
- Contributor spotlights
- "Form of the Week" showcase

---

## Appendix

### A. Glossary

- **SMB:** Small and Medium Business
- **LLM:** Large Language Model (GPT-4, Claude)
- **i18n:** Internationalization
- **RTL:** Right-to-Left (for Urdu, Arabic)
- **PII:** Personally Identifiable Information
- **DPDPA:** Digital Personal Data Protection Act (India)

### B. References

- [COMPLETE-FEATURES-LIST.md](./COMPLETE-FEATURES-LIST.md) - Full feature inventory
- [FEATURE-AUDIT-AND-PLAN.md](./FEATURE-AUDIT-AND-PLAN.md) - Implementation roadmap
- [OPEN-SOURCE-STRATEGY.md](./OPEN-SOURCE-STRATEGY.md) - Open source positioning
- [SEO-AUDIT-APR-16-2026.md](./SEO-AUDIT-APR-16-2026.md) - SEO status

### C. Wireframes & Mockups

[TODO: Add Figma links for all features]

### D. User Research

[TODO: Add user interview notes, survey results]

### E. Competitive Analysis

[TODO: Add detailed comparison with Google Forms, Typeform, Zoho Forms]

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Apr 21, 2026 | Shivam Chawla | Initial PRD created |
| 2.0 | Apr 26, 2026 | Shivam Chawla | Phase 5 complete: conditional logic, embed, thank-you/redirect, scheduling, QR code, DB migration |

---

**Next Steps (Phase 6):**

1. ✅ Phase 5 — Gap closure complete (conditional logic, embed, scheduling, QR)
2. [ ] **AI Form Generator** — surface prominently on dashboard (API exists, needs UI prominence) — 1 day
3. [ ] **Razorpay / UPI Payment Field** — new field type for workshops, events, orders — 2–3 days
4. [ ] **Phone OTP Verification Field** — Indian mobile OTP before submission — 2 days
5. [ ] **Google Sheets Sync** — new responses auto-populate a Google Sheet — 2–3 days
6. [ ] **Multilingual Forms** — Hindi first, AI translation of field labels — 3–4 days
7. [ ] Beta test Phase 6 features with 10 users
8. [ ] Launch "India-First" features publicly (YourStory, Inc42 outreach)

---

**Feedback & Questions:**

For questions or suggestions, contact: shivam@formbharat.com
