import type { Pillar } from './types'

export const surveysFeedback: Pillar = {
  slug: 'surveys-feedback',
  title: 'Surveys & Customer Feedback',
  description: 'Design surveys and feedback forms that get responses. Learn methodologies used by top Indian brands to understand their customers.',
  icon: '📊',
  color: 'blue',
  tagline: 'Understand your customers, grow your business',
  articles: [
    {
      slug: 'customer-satisfaction-survey',
      title: 'How to Create a Customer Satisfaction Survey for Indian Businesses',
      description: 'Build CSAT surveys that get high response rates and actionable insights. Step-by-step guide with templates for Indian businesses.',
      readTime: '7 min',
      publishDate: '2024-03-18',
      tags: ['CSAT', 'Customer Satisfaction', 'Survey', 'India'],
      intro: 'Customer satisfaction surveys (CSAT) are the fastest way to find out what your customers really think. Indian businesses that measure CSAT regularly grow 2x faster than those that don\'t — because they fix problems before they lose customers. This guide shows you how to design, send, and act on CSAT surveys.',
      sections: [
        {
          heading: 'What is a CSAT Survey and Why It Matters for Indian Businesses',
          body: 'CSAT (Customer Satisfaction Score) measures how satisfied customers are with a specific interaction, product, or service. The classic CSAT question is: "How satisfied were you with your experience today?" on a 1-5 or 1-10 scale. The score is calculated as: (Satisfied responses / Total responses) × 100. A CSAT above 80% is considered excellent.',
          list: [
            'Identifies unhappy customers before they leave (and take their friends with them)',
            'Provides specific feedback to improve your product or service',
            'Benchmarks your performance over time',
            'Highlights your best-performing team members or locations',
            'Generates authentic testimonials from satisfied customers',
          ],
        },
        {
          heading: 'The 5 Best CSAT Questions for Indian Customers',
          body: 'The questions you ask determine the quality of insights you get. Here are the five most effective CSAT questions, tested across Indian consumer and B2B contexts.',
          list: [
            '"How satisfied are you with [product/service] on a scale of 1-5?" — Classic CSAT',
            '"Did we resolve your issue today?" — Yes/No for support interactions',
            '"How would you rate the value for money?" — Critical for price-sensitive Indian market',
            '"How easy was it to do business with us?" — CES (Customer Effort Score)',
            '"What is the one thing we could do to improve your experience?" — Open-ended for qualitative insight',
          ],
        },
        {
          heading: 'When and How to Send CSAT Surveys in India',
          body: 'Timing is everything with surveys. Send too early and customers haven\'t formed an opinion. Send too late and they\'ve forgotten the experience. The right time depends on what you are measuring.',
          list: [
            'Post-purchase: Send 2-3 days after delivery confirmation',
            'Post-support: Send within 30 minutes of ticket resolution',
            'Post-service: Send same day as service completion',
            'Post-onboarding: Send on Day 7 of using your product',
            'Periodic: Send quarterly NPS surveys to entire customer base',
          ],
        },
        {
          heading: 'Increasing Survey Response Rates for Indian Audiences',
          body: 'The average survey response rate in India is 12-15%. With the right approach, you can achieve 30-50%. The biggest driver of response rate is brevity — Indian consumers respond much better to 1-3 question surveys than to long questionnaires.',
          list: [
            'Keep surveys to 1-5 questions maximum for transactional CSAT',
            'SMS/WhatsApp surveys get 3x more responses than email surveys in India',
            'Offer a small incentive: ₹50-₹100 off next order for completing the survey',
            'Use the customer\'s name in the survey invitation message',
            'Send surveys during 6pm-9pm IST — peak mobile usage hours',
          ],
        },
        {
          heading: 'Acting on CSAT Feedback: Closing the Loop',
          body: 'Collecting feedback without acting on it is worse than not collecting it — customers feel ignored. The best Indian brands "close the loop" by personally responding to low CSAT scores within 24 hours.',
          list: [
            'Score 1-2 (Dissatisfied): Personal call or WhatsApp message within 4 hours',
            'Score 3 (Neutral): Template follow-up asking what would make it a 5',
            'Score 4-5 (Satisfied): Thank-you message + ask for review on Google/JustDial',
            'Aggregate data: Monthly review of top 3 complaint themes',
            'Product roadmap: Feed CSAT themes into your product/service improvement plan',
          ],
        },
        {
          heading: 'CSAT vs NPS vs CES: Which Survey to Use When',
          body: 'Indian businesses often confuse the three main satisfaction metrics. Here is a clear breakdown: CSAT measures satisfaction with a specific transaction, NPS measures overall loyalty and likelihood to recommend, and CES measures how easy it was to get help. Use all three at different points in the customer journey.',
        },
      ],
      faq: [
        {
          q: 'How long should a customer satisfaction survey be?',
          a: 'For transactional CSAT (after a purchase or support interaction), 1-3 questions is ideal. For periodic relationship surveys (quarterly), 5-8 questions is the limit. Every additional question beyond 3 drops response rate by approximately 5-10%. Indian customers in particular prefer very short surveys over comprehensive ones.',
        },
        {
          q: 'What is a good CSAT score for an Indian business?',
          a: 'For Indian consumer businesses, a CSAT of 75-80% is average, 80-90% is good, and above 90% is excellent. B2B businesses typically see higher scores (80-90% average). Compare your CSAT within your industry rather than against generic benchmarks, as satisfaction expectations vary significantly across sectors.',
        },
        {
          q: 'Should I translate my CSAT survey into Hindi or regional languages?',
          a: 'Yes, if a significant portion of your customers are more comfortable in Hindi or regional languages. Research shows 40-60% higher response rates for surveys in the customer\'s preferred language. FormBharat supports multi-language forms — you can create separate survey links for different language preferences.',
        },
      ],
      cta: {
        heading: 'Start collecting customer feedback today',
        body: 'Build CSAT surveys that work on WhatsApp, email, and web. FormBharat\'s free survey templates are ready to use in minutes.',
      },
    },
    {
      slug: 'nps-survey-india',
      title: 'Net Promoter Score (NPS) Surveys for Indian Businesses: The Definitive Guide',
      description: 'Implement NPS surveys effectively in the Indian context. Understand what good NPS looks like, how to collect it, and how to improve it.',
      readTime: '8 min',
      publishDate: '2024-03-22',
      tags: ['NPS', 'Customer Loyalty', 'Survey', 'India'],
      intro: 'Net Promoter Score is the single metric trusted by companies from startups to Fortune 500s to measure customer loyalty. But NPS doesn\'t work the same way in India as in Western markets — response patterns are different, scale interpretation varies, and follow-up strategies need to be adapted. This guide covers NPS the Indian way.',
      sections: [
        {
          heading: 'What is NPS and How to Calculate It',
          body: 'NPS asks one question: "How likely are you to recommend us to a friend or colleague?" on a 0-10 scale. Respondents are categorized: 9-10 are Promoters, 7-8 are Passives, 0-6 are Detractors. NPS = % Promoters - % Detractors. Scores range from -100 to +100.',
          list: [
            'Promoters (9-10): Your loyal enthusiasts who will refer new customers',
            'Passives (7-8): Satisfied but not enthusiastic — vulnerable to competitors',
            'Detractors (0-6): Unhappy customers who can damage your brand through word of mouth',
            'NPS above 0: More promoters than detractors — positive territory',
            'NPS above 50: Excellent — companies like Apple and Amazon target this',
          ],
        },
        {
          heading: 'NPS in India: Why Scores Are Different',
          body: 'Indian NPS scores are typically 15-20 points higher than global averages for the same quality of product. This is a cultural phenomenon — Indian customers tend to give higher ratings due to social politeness, but the relationship between NPS and actual referral behaviour still holds. Account for this when setting NPS targets.',
          list: [
            'Indian Promoters are genuinely loyal but may not actively refer without a nudge',
            'Indian Passives are more passive than Western ones — need more effort to move up',
            'Indian Detractors are less likely to post negative reviews publicly but more likely to stop buying',
            'WhatsApp word-of-mouth from Promoters is extremely powerful in India',
            'Adjust your NPS benchmarks: add ~15 points to global industry averages',
          ],
        },
        {
          heading: 'The Two-Question NPS Survey That Works in India',
          body: 'The classic one-question NPS survey has a 25-30% response rate in India. Adding one open-ended follow-up question ("What is the main reason for your score?") gives you actionable insights without significantly hurting response rate. This two-question NPS is the sweet spot.',
        },
        {
          heading: 'When to Send NPS Surveys: The Indian Calendar',
          body: 'Timing NPS surveys around Indian holidays and business cycles makes a significant difference in response rates and score quality.',
          list: [
            'Avoid sending during Diwali, Holi, Eid — customers are distracted and may give hasty responses',
            'January-February is excellent — new year mindset, customers reflect on their experience',
            'Post-major-update or post-feature-launch is a great time for product NPS',
            'Quarterly surveys: March, June, September, December align with Indian financial quarters',
            'Trigger-based NPS: After every 5th purchase, after 90 days of subscription',
          ],
        },
        {
          heading: 'Converting Promoters into Referrals',
          body: 'An NPS of 8+ is great. Converting those promoters into actual referrals is the real goal. Indian businesses that have a structured referral program convert 30-40% of Promoters into actual referrers.',
          list: [
            'Message Promoters within 24 hours of their score: "Thank you! Would you share us with a colleague?"',
            'Make referring easy: WhatsApp forward message with your link pre-written',
            'Offer referral incentives: Both referrer and referee get a reward',
            'Celebrate referrals: Recognize top referrers publicly (with permission)',
            'Close the loop: Tell referrers when someone they recommended became a customer',
          ],
        },
      ],
      faq: [
        {
          q: 'What is a good NPS score for Indian startups and SMEs?',
          a: 'For Indian startups, an NPS above 40 is good, above 60 is excellent. For established SMEs, target above 50. Keep in mind Indian scores are typically higher than global averages, so compare with other Indian companies in your industry. Track NPS trends over time more than absolute score.',
        },
        {
          q: 'How often should I run NPS surveys?',
          a: 'For transactional NPS (triggered by purchases or interactions), you can run it continuously with 1-2 touchpoints per customer per quarter. For relationship NPS (overall loyalty), quarterly or bi-annual surveys are ideal. Avoid over-surveying — sending NPS too frequently leads to survey fatigue and inflated scores.',
        },
        {
          q: 'Can I collect NPS via WhatsApp?',
          a: 'Yes, and in India WhatsApp NPS gets significantly higher response rates than email. Send a brief message with your FormBharat NPS form link. Keep the message short: "Hi [Name], how likely are you to recommend us? Takes 30 seconds: [link]". WhatsApp NPS surveys in India see 35-50% response rates vs 10-15% for email.',
        },
      ],
      cta: {
        heading: 'Build your NPS survey in 2 minutes',
        body: 'FormBharat\'s NPS template is ready to deploy. Collect scores via WhatsApp, email, or embed on your website.',
      },
    },
    {
      slug: 'employee-feedback-survey',
      title: 'Employee Feedback Surveys: A Complete Guide for Indian Employers',
      description: 'Build a culture of open feedback with employee surveys. Includes question banks, anonymity best practices, and action planning frameworks.',
      readTime: '7 min',
      publishDate: '2024-03-28',
      tags: ['Employee Feedback', 'HR', 'Survey', 'India'],
      intro: 'Employee attrition in India\'s IT and startup sectors costs companies 50-200% of an employee\'s annual salary. The number one preventable reason employees leave: they felt unheard. Regular employee feedback surveys — done right — are the single most effective retention tool available to Indian employers.',
      sections: [
        {
          heading: 'Types of Employee Feedback Surveys Every Indian Company Needs',
          body: 'Different survey types serve different purposes. Run all four regularly for a complete picture of employee experience.',
          list: [
            'Engagement surveys (quarterly): Overall morale, satisfaction, and commitment to company goals',
            'Pulse surveys (monthly): Quick 3-5 question check-in on specific topics',
            'Exit surveys (as needed): Understand the real reasons employees leave',
            '360-degree feedback (annual): Peer, manager, and report feedback for development',
            'Onboarding surveys (Day 30 and Day 90): New hire experience and early warning of fit issues',
          ],
        },
        {
          heading: 'Anonymity in Indian Employee Surveys: Getting Honest Responses',
          body: 'Indian workplace culture has a strong hierarchy and many employees fear retaliation for honest feedback. Anonymity is not optional — it is essential. But employees won\'t trust anonymity claims without proof. Take these steps to build genuine trust.',
          list: [
            'Use a third-party survey tool (not internal HR system) for sensitive questions',
            'Clearly state: "Responses are fully anonymous — HR cannot see individual submissions"',
            'Set minimum group size for reporting: Only show results when 5+ people respond',
            'Never ask questions that could identify individuals (e.g., "How long have you been here?")',
            'Communicate results company-wide — silence after a survey destroys trust permanently',
          ],
        },
        {
          heading: '20 Best Employee Feedback Questions for Indian Workplaces',
          body: 'These questions are calibrated for Indian workplace culture and cover engagement, management, growth, and wellbeing.',
          list: [
            '"I feel comfortable raising concerns with my manager." (1-5 scale)',
            '"My manager gives me feedback that helps me improve my work." (1-5)',
            '"I have opportunities to grow and develop my career here." (1-5)',
            '"My workload is manageable and sustainable." (1-5)',
            '"I feel like my work is valued and recognized." (1-5)',
            '"The company communicates clearly about goals and direction." (1-5)',
            '"I understand how my work contributes to the company\'s success." (1-5)',
            '"What is one thing the company should START doing?" (Open text)',
            '"What is one thing the company should STOP doing?" (Open text)',
          ],
        },
        {
          heading: 'Acting on Employee Survey Results',
          body: 'The biggest mistake Indian companies make: running surveys and then doing nothing. This is worse than not surveying — it signals you don\'t really care. The rule is: if you ask, you must act, and you must communicate what action you\'re taking.',
          list: [
            'Share results within 2 weeks: Overall scores, top themes, and anonymous quotes',
            'Acknowledge low scores honestly — don\'t spin or minimize',
            'Commit to 2-3 specific changes based on feedback',
            'Assign owners and deadlines to each commitment',
            'Follow up in the next survey: "In last quarter\'s survey, you asked for X. Here\'s what we did."',
          ],
        },
      ],
      faq: [
        {
          q: 'How do you ensure Indian employees actually complete feedback surveys?',
          a: 'The top drivers of survey completion in India are: leadership participation (when employees see senior leaders taking surveys, they follow), dedicated time during work hours (not extra work), mobile-friendly forms (most employees prefer completing surveys on phones), and quick surveys — under 5 minutes. Response rates above 70% are achievable with these elements in place.',
        },
        {
          q: 'Should employee surveys in India be in English or Hindi?',
          a: 'Offer both where possible. For pan-India companies, offer the survey in English plus Hindi. For regional companies, add the dominant regional language. Multilingual surveys see 35-50% higher response rates and more detailed open-ended responses when employees can express themselves in their native language.',
        },
      ],
      cta: {
        heading: 'Start listening to your employees today',
        body: 'Build anonymous employee surveys with FormBharat. Free templates for engagement, pulse, and exit surveys.',
      },
    },
    {
      slug: 'event-feedback-form',
      title: 'How to Create Event Feedback Forms That Get Honest Responses',
      description: 'Design event feedback forms for conferences, workshops, and corporate events. Get actionable data to improve your next event.',
      readTime: '5 min',
      publishDate: '2024-04-05',
      tags: ['Event', 'Feedback', 'Conference', 'India'],
      intro: 'India\'s events industry is booming — from Bengaluru startup conferences to Mumbai corporate summits. But most event feedback forms get 10-15% response rates and produce vague data. With the right design and distribution strategy, you can get 40-60% response rates and insights that genuinely improve your next event.',
      sections: [
        {
          heading: 'When to Distribute Event Feedback Forms',
          body: 'Timing is the single biggest factor in event feedback response rates. The best time is while the experience is still fresh.',
          list: [
            'Best: On-site, last 10 minutes of the event (QR code on screen)',
            'Second best: Within 30 minutes of event end via WhatsApp/SMS',
            'Good: Within 2 hours via email with event photos attached',
            'Poor: Next day email (memory fades, response rate drops 60%)',
            'Worst: Generic survey sent 3+ days later',
          ],
        },
        {
          heading: 'The 8 Essential Event Feedback Questions',
          body: 'These questions give you comprehensive feedback on every aspect of your event without overwhelming attendees.',
          list: [
            '"Overall, how would you rate this event?" (1-5 stars)',
            '"How would you rate the content/speakers?" (1-5)',
            '"How would you rate the venue and logistics?" (1-5)',
            '"Did the event meet your expectations?" (Yes/Somewhat/No)',
            '"Which session was most valuable to you?" (Dropdown of sessions)',
            '"What topic would you like covered at our next event?" (Open text)',
            '"Would you attend our next event?" (Yes/Maybe/No)',
            '"How did you hear about this event?" (Multiple choice for marketing insights)',
          ],
        },
        {
          heading: 'Using QR Codes for Instant Event Feedback',
          body: 'QR codes have transformed event feedback in India — smartphone penetration means virtually every attendee can scan and submit in under 2 minutes. Display a large QR code on the presentation screen or print on table cards. FormBharat generates a QR code for every form automatically.',
        },
        {
          heading: 'Turning Feedback into a Better Next Event',
          body: 'Post-event feedback is only valuable if you use it. Create a simple scoring system that turns qualitative feedback into actionable decisions.',
          list: [
            'Compile all ratings within 48 hours while memory is fresh',
            'Calculate Net Promoter Score from "Would you attend again?" question',
            'Identify the 3 lowest-rated elements — these are your priorities for next event',
            'Capture positive quotes for use in promoting the next event',
            'Share a thank-you + summary email to attendees within 1 week',
          ],
        },
      ],
      faq: [
        {
          q: 'How long should an event feedback form be?',
          a: 'For on-site completion during the event, maximum 5-6 questions — attendees are tired and distracted. For post-event follow-up surveys (sent within 2 hours), you can go up to 10-12 questions. For multi-day conferences, send a short daily feedback form (3 questions) rather than one long form at the end.',
        },
        {
          q: 'Should event feedback forms be anonymous?',
          a: 'Offer the choice. Make personal details (name, email) optional. Anonymous feedback gets more honest responses about negative experiences. Named feedback allows follow-up for complaints and generates testimonials. A good approach: collect name and email at the start but prominently state responses will be shared anonymously in reports.',
        },
      ],
      cta: {
        heading: 'Ready-to-use event feedback templates',
        body: 'FormBharat\'s event feedback templates include QR code generation and instant WhatsApp distribution. Set up in 3 minutes.',
      },
    },
  ],
}
