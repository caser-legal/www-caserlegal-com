import { FREE_FEATURES, PRO_FEATURES } from '@/lib/pricing-features';
import { CONTACT_EMAIL, PRIVACY_RIGHTS_EMAIL } from '@/lib/contact-email';

export const SUPPORT_LAST_UPDATED = 'May 2026';

export type SupportDocSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type SupportDoc = {
  slug: string;
  path: `/support/${string}`;
  title: string;
  description: string;
  badgeLabel: string;
  sections: SupportDocSection[];
  relatedLinks?: { href: string; label: string }[];
};

export type SupportNavItem = {
  slug: string;
  path: `/support/${string}`;
  title: string;
  description: string;
};

export const supportNav: SupportNavItem[] = [
  {
    slug: 'getting-started',
    path: '/support/getting-started',
    title: 'Getting Started',
    description: 'Install CASER, permissions, and your first search',
  },
  {
    slug: 'user-guide',
    path: '/support/user-guide',
    title: 'User Guide',
    description: 'Overview of every major feature in the app',
  },
  {
    slug: 'search',
    path: '/support/search',
    title: 'Case Search',
    description: 'Federal court search, filters, saved cases, and PDF export',
  },
  {
    slug: 'alerts',
    path: '/support/alerts',
    title: 'Keyword Alerts',
    description: 'Monitors, notifications, and alert limitations',
  },
  {
    slug: 'atticus',
    path: '/support/atticus',
    title: 'Atticus AI',
    description: 'AI research assistant usage and limitations',
  },
  {
    slug: 'pacer-savings',
    path: '/support/pacer-savings',
    title: 'PACER Savings Tracker',
    description: 'How savings are estimated and Pro break-even',
  },
  {
    slug: 'subscriptions',
    path: '/support/subscriptions',
    title: 'Subscriptions',
    description: 'Free tier, CASER Pro, and Apple billing',
  },
  {
    slug: 'best-practices',
    path: '/support/best-practices',
    title: 'Best Practices',
    description: 'Keywords, alerts, and cost-aware workflows',
  },
  {
    slug: 'troubleshooting',
    path: '/support/troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and fixes',
  },
  {
    slug: 'data-and-privacy',
    path: '/support/data-and-privacy',
    title: 'Data & Privacy',
    description: 'Local storage, security, and your rights',
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const supportFaqPreview: FaqItem[] = [
  {
    question: 'Why is search not working?',
    answer:
      'Check your internet connection. Try clearing search filters. Restart the app if issues persist.',
  },
  {
    question: 'Why am I missing alerts?',
    answer:
      'Verify your keyword monitor is enabled. Check notification permissions in iOS Settings. CASER targets a check every 15 minutes while open and requests background checks from iOS. iOS decides background timing; force-quitting stops those checks.',
  },
  {
    question: 'Why is Atticus not responding well?',
    answer:
      'Atticus requires an internet connection. For best results, ask specific questions about cases or legal concepts.',
  },
  {
    question: 'How do I manage my subscription?',
    answer:
      'Subscriptions are managed through Apple. Go to Settings > Apple ID > Subscriptions on your device, or use Restore Purchases in the CASER app.',
  },
];

const freeTierBullets = [
  ...FREE_FEATURES.map((f) => f),
  'Atticus AI is available with CASER Pro only',
];

const proTierBullets = [...PRO_FEATURES];

export const gettingStarted: SupportDoc = {
  slug: 'getting-started',
  path: '/support/getting-started',
  title: 'Getting Started with CASER',
  description:
    'Install CASER on iOS, enable notifications, run your first federal court search, and replay onboarding.',
  badgeLabel: 'Getting Started',
  sections: [
    {
      heading: 'Requirements',
      paragraphs: [
        'CASER requires iOS 17.6 or later. Download the app from the App Store. No account or PACER login is required to use CASER.',
      ],
    },
    {
      heading: 'Install and open CASER',
      bullets: [
        'Download CASER from the App Store (see the Download page on this site).',
        'Open the app and complete the five-screen onboarding tour (you can replay it later from Settings).',
        'Onboarding covers the PACER cost problem, how CASER monitors federal courts, an introduction to Atticus, and the four core tabs: Search, Monitor, Atticus, and PACER Savings.',
      ],
    },
    {
      heading: 'Enable notifications (recommended)',
      paragraphs: [
        'For keyword alerts, allow notifications when iOS prompts you, or enable them later in CASER Settings > Notifications.',
        'You need system notifications enabled before monitor alerts can fire. If notifications were denied, the app can open iOS Settings for you to turn them on.',
        'CASER targets a check every 15 minutes while open and requests background checks from iOS. iOS decides background timing; force-quitting stops those checks.',
      ],
    },
    {
      heading: 'Run your first search',
      bullets: [
        'Open the Search tab and enter keywords, party names, or case identifiers.',
        'Search covers federal district and bankruptcy filings across U.S. jurisdictions.',
        'The free tier includes 1 lifetime case search and up to 5 saved cases. CASER Pro adds unlimited searches and saved cases, up to 100 keyword alerts, and an annual Atticus credit allowance.',
        'Tap a result for details and direct links to court documents where available.',
      ],
    },
    {
      heading: 'Set up a keyword monitor',
      paragraphs: [
        'Open the Monitor tab, add keywords, and enable the monitor. New alerts only capture future filings published after creation—historical cases will not trigger notifications.',
      ],
    },
    {
      heading: 'Replay onboarding',
      paragraphs: [
        'In Settings, use the option to show onboarding again if you want a refresher on PACER, CASER features, and Atticus.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/download', label: 'Download' },
    { href: '/support/search', label: 'Case Search guide' },
    { href: '/support/alerts', label: 'Keyword Alerts guide' },
  ],
};

export const userGuide: SupportDoc = {
  slug: 'user-guide',
  path: '/support/user-guide',
  title: 'CASER User Guide',
  description:
    'Complete overview of CASER for iOS: search, alerts, Atticus AI, saved cases, PACER savings, and settings.',
  badgeLabel: 'User Guide',
  sections: [
    {
      heading: 'What CASER does',
      paragraphs: [
        'CASER (Case Alerts & Search of Electronic Records) helps you search federal district and bankruptcy case filings, monitor keywords for new filings, research with the Atticus AI assistant (Pro), save cases, track estimated PACER savings, and export PDFs (Pro).',
        'CASER monitors 300+ federal court RSS feeds. Searching and browsing in the app has no per-search or per-result fees. Document access may link to official PACER or court sources where applicable.',
      ],
    },
    {
      heading: 'Main tabs and tools',
      bullets: [
        'Search — Find cases across federal courts; filter by jurisdiction; save cases; export PDFs (Pro).',
        'Monitor — Keyword alerts on new filings; notifications when matches occur (Pro for up to 100 monitors).',
        'Atticus — AI legal research assistant powered by Google Gemini with search grounding (CASER Pro).',
        'PACER Savings Tracker — Compares your activity to PACER’s $0.10-per-billable-page uncapped search screens (Settings > PACER Savings Tracker).',
        'Settings — Subscription, notifications, recent searches/matches, saved cases, About, Support, Terms & Privacy, and erase-all data.',
      ],
    },
    {
      heading: 'Free tier',
      bullets: freeTierBullets,
    },
    {
      heading: 'CASER Pro',
      bullets: proTierBullets,
    },
    {
      heading: 'Detailed guides',
      paragraphs: ['Use these focused guides for step-by-step help on each area:'],
      bullets: supportNav
        .filter((item) => item.slug !== 'user-guide' && item.slug !== 'getting-started')
        .map((item) => `${item.title} — ${item.description}`),
    },
    {
      heading: 'Legal and support',
      bullets: [
        'CASER does not provide legal advice. Verify critical information with official court records.',
        'Full Terms of Service and Privacy Policy are in the app and on this site.',
        `Email support: ${CONTACT_EMAIL} (typically 24–48 hour response).`,
      ],
    },
  ],
  relatedLinks: supportNav
    .filter((n) => n.slug !== 'user-guide')
    .map((n) => ({ href: n.path, label: n.title })),
};

export const searchGuide: SupportDoc = {
  slug: 'search',
  path: '/support/search',
  title: 'Case Search',
  description:
    'How to search federal courts in CASER, use filters, save cases, and export PDFs with CASER Pro.',
  badgeLabel: 'Case Search',
  sections: [
    {
      heading: 'What you can search',
      paragraphs: [
        'CASER searches federal district and bankruptcy court filings across all 50 states. Use party names, keywords, case titles, or other terms supported by the search index.',
        'There are no in-app per-search or per-result fees. The free tier allows 1 lifetime search; CASER Pro provides unlimited searches.',
      ],
    },
    {
      heading: 'Search tips',
      bullets: [
        'Check your internet connection if results fail to load.',
        'Clear or adjust jurisdiction filters if results seem too narrow.',
        'Restart the app if search hangs or returns errors after connectivity issues.',
        'If you see “Free search limit reached,” upgrade to CASER Pro for unlimited searches.',
      ],
    },
    {
      heading: 'Saved cases',
      paragraphs: [
        'Save important cases from search results for quick access under Settings > Saved Cases (or the Saved Cases tool).',
        'Free users can save up to 5 cases. CASER Pro allows unlimited saved cases.',
      ],
    },
    {
      heading: 'PDF export (CASER Pro)',
      paragraphs: [
        'Pro subscribers can export search results and case details as PDF using a legal-brief style layout for sharing or offline reference.',
      ],
    },
    {
      heading: 'PACER document links',
      paragraphs: [
        'Where available, CASER provides direct links to court documents. Accessing documents on PACER or court systems may be subject to those systems’ own fees and terms—separate from CASER’s subscription.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/support/getting-started', label: 'Getting Started' },
    { href: '/support/pacer-savings', label: 'PACER Savings Tracker' },
    { href: '/pricing', label: 'Pricing' },
  ],
};

export const alertsGuide: SupportDoc = {
  slug: 'alerts',
  path: '/support/alerts',
  title: 'Keyword Alerts',
  description:
    'Set up keyword monitors, notifications, scan frequency, and understand alert limitations.',
  badgeLabel: 'Keyword Alerts',
  sections: [
    {
      heading: 'How monitors work',
      paragraphs: [
        'The Monitor tab lets you define keywords CASER watches across federal court RSS feeds. When a new filing matches, you can receive a local notification (with CASER Pro for up to 100 monitors).',
        'CASER targets a check every 15 minutes while open and requests background checks from iOS. iOS decides background timing; force-quitting stops those checks. Delays can occur due to feed latency, iOS background limits, or maintenance.',
      ],
    },
    {
      heading: 'Important: future filings only',
      paragraphs: [
        'New alerts only capture future filings published after you create or update the monitor. Historical cases will not trigger notifications. Do not rely solely on CASER alerts for time-sensitive matters—always verify with official court records.',
      ],
    },
    {
      heading: 'Notifications setup',
      bullets: [
        'Enable notifications in CASER Settings > Notifications.',
        'Turn on Monitor Alerts after system notifications are allowed.',
        'If notifications are denied, open iOS Settings from the toggle to enable them for CASER.',
        'Notification content includes matched keywords and case titles.',
      ],
    },
    {
      heading: 'Free tier limits',
      paragraphs: [
        'Keyword alerts are not part of the free tier. CASER Pro includes up to 100 keyword alerts and notifications for matches.',
      ],
    },
    {
      heading: 'State filters',
      paragraphs: [
        'You can narrow monitors by state or jurisdiction where the app provides filters. Use specific keywords to reduce noise from unrelated matches.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/support/best-practices', label: 'Best Practices' },
    { href: '/support/troubleshooting', label: 'Troubleshooting' },
  ],
};

export const atticusGuide: SupportDoc = {
  slug: 'atticus',
  path: '/support/atticus',
  title: 'Atticus AI Assistant',
  description:
    'Use Atticus for legal research on CASER Pro: capabilities, disclaimers, example prompts, and privacy.',
  badgeLabel: 'Atticus AI',
  sections: [
    {
      heading: 'What Atticus is',
      paragraphs: [
        'Atticus is CASER’s AI-powered legal research assistant, available with CASER Pro. It is powered by Google Gemini with Google Search grounding.',
        'Atticus can help research legal concepts, define terms, explain procedures, summarize texts, and discuss case-related questions in the context of your CASER usage.',
      ],
    },
    {
      heading: 'Not legal advice',
      paragraphs: [
        'Atticus provides neutral information only—it does not provide legal advice. Always consult a qualified attorney for advice specific to your situation. You will see a disclaimer in the app before using Atticus.',
      ],
    },
    {
      heading: 'Example prompts',
      bullets: [
        'Explain a Legal Term: (your term)',
        'Search Case Filings: (your query)',
        'Summarize a Decision: (paste or describe text)',
        'What Are My Rights? (your situation—general information only)',
        'Define court procedure (specific procedure)',
        'Recent case law on… (topic)',
      ],
    },
    {
      heading: 'Tips for better answers',
      bullets: [
        'Requires an active internet connection.',
        'Ask specific, focused questions.',
        'For case questions, ground your prompt in search results or known case details when possible.',
      ],
    },
    {
      heading: 'Data handling',
      paragraphs: [
        'Atticus sends your question, relevant conversation context, and included case details to Google, including the request-size check before generation. Google Search may use that context to find public sources.',
        'Google retains grounding prompts, context, and output for 30 days. Local chat deletion does not delete provider-retained copies. See the Privacy Policy for Google’s data-use terms; do not submit confidential, privileged, or sensitive information.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/support/data-and-privacy', label: 'Data & Privacy' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/pricing', label: 'Pricing' },
  ],
};

export const pacerSavingsGuide: SupportDoc = {
  slug: 'pacer-savings',
  path: '/support/pacer-savings',
  title: 'PACER Savings Tracker',
  description:
    'Understand how CASER estimates PACER savings, $0.10-per-billable-page screens, and estimated fees and the separate annual Pro price.',
  badgeLabel: 'PACER Savings',
  sections: [
    {
      heading: 'What the tracker shows',
      paragraphs: [
        'CASER has no per-search or per-result fees. The PACER Savings Tracker compares your searches and monitor matches to an estimate of what similar PACER activity could cost on PACER’s uncapped search-result screens ($0.10 per billable page, with no $3 document cap on those screens).',
        'The tracker is informational only—it does not represent actual PACER bills you received elsewhere.',
      ],
    },
    {
      heading: 'How results are counted',
      bullets: [
        'Each manual search and each monitor poll can count as billable PACER “pages” in the estimate.',
        'Monitor alert matches count as 1 billable result per match in the tracker model.',
        'PACER search-result screens are not covered by the $3 per-document cap—name searches and similar reports bill $0.10 per billable page with no ceiling.',
      ],
    },
    {
      heading: 'estimated fees and the separate annual Pro price',
      paragraphs: [
        'CASER Pro is an annual subscription purchased through the Apple App Store (see Pricing for current price). The tracker notes that Pro typically pays for itself at roughly $14.99 of avoided PACER charges per year in this estimate model.',
      ],
    },
    {
      heading: 'Where to find it',
      paragraphs: ['Open Settings > PACER Savings Tracker to view running totals and per-activity breakdowns.'],
    },
  ],
  relatedLinks: [
    { href: '/support/subscriptions', label: 'Subscriptions' },
    { href: '/terms', label: 'Terms of Service (§8)' },
    { href: '/pricing', label: 'Pricing' },
  ],
};

export const subscriptionsGuide: SupportDoc = {
  slug: 'subscriptions',
  path: '/support/subscriptions',
  title: 'Subscriptions & CASER Pro',
  description:
    'Free tier limits, CASER Pro features, restore purchases, and Apple subscription management.',
  badgeLabel: 'Subscriptions',
  sections: [
    {
      heading: 'Free tier',
      bullets: freeTierBullets,
    },
    {
      heading: 'CASER Pro',
      bullets: [
        ...proTierBullets,
        'Purchased as an annual subscription through the Apple App Store.',
        'Auto-renews unless canceled at least 24 hours before the end of the current period.',
        'Manage or cancel in iOS Settings > Apple ID > Subscriptions.',
      ],
    },
    {
      heading: 'Upgrade and restore',
      bullets: [
        'Tap Upgrade to Pro in Settings to view the paywall and subscribe.',
        'Use Restore Purchases if you previously subscribed on the same Apple ID.',
        'Pro subscribers can open Manage Subscription from Settings to jump to Apple’s subscription UI.',
      ],
    },
    {
      heading: 'Billing support',
      paragraphs: [
        'Apple processes all payments and refunds. For billing issues, use Apple’s subscription management or contact Apple Support. For product questions, email ' +
          CONTACT_EMAIL +
          '.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/support/troubleshooting', label: 'Troubleshooting' },
    { href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/', label: 'Apple Standard EULA' },
  ],
};

export const bestPractices: SupportDoc = {
  slug: 'best-practices',
  path: '/support/best-practices',
  title: 'Best Practices',
  description:
    'Keyword tuning, alert hygiene, notification habits, and cost-aware use of CASER alongside PACER.',
  badgeLabel: 'Best Practices',
  sections: [
    {
      heading: 'Keyword optimization',
      bullets: [
        'Use specific phrases (firm names, unique case styles) to reduce false positives.',
        'Avoid overly broad single words unless you accept more matches.',
        'Split unrelated topics into separate monitors instead of one noisy keyword list.',
      ],
    },
    {
      heading: 'Alert management',
      bullets: [
        'Remember alerts only fire for filings after the monitor is created.',
        'Review Recent Alert Matches in Settings to audit what triggered.',
        'Disable monitors you no longer need to limit background scans and notification noise.',
      ],
    },
    {
      heading: 'Notifications',
      bullets: [
        'Keep iOS notification permissions enabled for time-sensitive monitors.',
        'Use priority or focused notifications in iOS if you need stronger signal for critical keywords.',
      ],
    },
    {
      heading: 'Cost awareness',
      bullets: [
        'Use CASER search and monitors to avoid PACER’s $0.10-per-billable-page search screens where possible.',
        'Use the PACER Savings Tracker to see cumulative estimated savings—not as a tax or billing document.',
        'When you need official certified records, use PACER or the court directly and follow their fee rules.',
      ],
    },
    {
      heading: 'Research workflow',
      bullets: [
        'Save key cases locally for quick reference (within free or Pro limits).',
        'Use Atticus (Pro) for definitions and summaries, then verify citations with primary sources.',
        'Export PDFs (Pro) for offline review of search results when needed.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/support/alerts', label: 'Keyword Alerts' },
    { href: '/support/atticus', label: 'Atticus AI' },
  ],
};

export const troubleshooting: SupportDoc = {
  slug: 'troubleshooting',
  path: '/support/troubleshooting',
  title: 'Troubleshooting',
  description:
    'Fix search, alerts, Atticus, subscriptions, notifications, and data issues in CASER for iOS.',
  badgeLabel: 'Troubleshooting',
  sections: [
    {
      heading: 'Search not working',
      paragraphs: [
        'Check your internet connection. Try clearing search filters. Restart the app if issues persist.',
        'If you hit the free search limit, upgrade to CASER Pro or contact support if you believe this is an error.',
      ],
    },
    {
      heading: 'Missing alerts',
      paragraphs: [
        'Verify the keyword monitor is enabled in the Monitor tab.',
        'Confirm notifications and Monitor Alerts are on in Settings > Notifications.',
        'Remember: only future filings after monitor creation trigger alerts; CASER requests checks at a 15-minute target, but iOS controls when background checks run.',
        'Check iOS Focus modes or notification summaries that may hide CASER alerts.',
      ],
    },
    {
      heading: 'Atticus AI issues',
      paragraphs: [
        'Atticus requires an internet connection and CASER Pro.',
        'For best results, ask specific questions about cases or legal concepts.',
        'If responses fail repeatedly, restart the app and try again later in case of service outages.',
      ],
    },
    {
      heading: 'Subscription issues',
      paragraphs: [
        'Subscriptions are managed through Apple. Go to Settings > Apple ID > Subscriptions to manage or cancel.',
        'Use Restore Purchases in CASER Settings if Pro status does not appear after renewing.',
      ],
    },
    {
      heading: 'Erase all data',
      paragraphs: [
        'Settings includes an option to erase all local data (searches, monitors, saved cases, settings). This cannot be undone and does not affect Apple subscriptions.',
      ],
    },
    {
      heading: 'Contact support',
      paragraphs: [
        `Email ${CONTACT_EMAIL} with your device model, iOS version, and CASER app version (shown in Settings > About CASER). Response time is typically 24–48 hours.`,
      ],
    },
  ],
  relatedLinks: [
    { href: '/support/getting-started', label: 'Getting Started' },
    { href: '/contact', label: 'Contact' },
  ],
};

export const dataPrivacy: SupportDoc = {
  slug: 'data-and-privacy',
  path: '/support/data-and-privacy',
  title: 'Data & Privacy',
  description:
    'How CASER stores data on your device, security practices, third-party services, and your privacy rights.',
  badgeLabel: 'Data & Privacy',
  sections: [
    {
      heading: 'Local-first storage',
      paragraphs: [
        'No account is required. Search queries, keyword monitors, saved cases, search history, and Atticus conversation history are stored locally on your device.',
        'Use Settings to erase app content. Some Keychain records, including purchase-credit accounting, may remain after uninstalling; clearing local content does not delete Google-retained AI requests or cancel an Apple subscription.',
      ],
    },
    {
      heading: 'Security',
      bullets: [
        'HTTPS with TLS protects network requests to court feeds and services.',
        'iOS Keychain for sensitive data with strong encryption.',
        'Local storage protected by iOS data protection APIs.',
        'No sale of personal information to third parties for marketing.',
      ],
    },
    {
      heading: 'Third-party services',
      bullets: [
        'Google Gemini through Firebase AI Logic processes Atticus questions and relevant context. Google Search grounding retains prompts, context, and output for 30 days (see Privacy Policy).',
        'iOS presents local notifications after CASER finds a match during a scan, when permission is enabled.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        `You may request access, correction, deletion, or export of personal data where applicable. Contact ${PRIVACY_RIGHTS_EMAIL} for privacy requests. California residents have additional rights under CCPA as described in the Privacy Policy.`,
      ],
    },
    {
      heading: 'Full policies',
      bullets: [
        'Read the complete Privacy Policy and Security Policy on this site.',
        'In-app copies are available under Settings > Terms & Privacy.',
      ],
    },
  ],
  relatedLinks: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/security-policy', label: 'Security Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export const supportDocsBySlug: Record<string, SupportDoc> = {
  'getting-started': gettingStarted,
  'user-guide': userGuide,
  search: searchGuide,
  alerts: alertsGuide,
  atticus: atticusGuide,
  'pacer-savings': pacerSavingsGuide,
  subscriptions: subscriptionsGuide,
  'best-practices': bestPractices,
  troubleshooting,
  'data-and-privacy': dataPrivacy,
};

export function getSupportDoc(slug: string): SupportDoc | undefined {
  return supportDocsBySlug[slug];
}
