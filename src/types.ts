export type PolicyTab =
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'disclaimer'
  | 'publisher-guidelines'
  | 'about'
  | 'contact'
  | 'ads-txt'
  | 'readiness-checker'
  | 'customizer';

export interface PolicySection {
  id: string;
  title: string;
  content: string;
  adsenseNote?: string; // Why AdSense requires this specific clause
  isAdsenseStrictRequirement?: boolean;
}

export interface PolicyDocument {
  id: PolicyTab;
  title: string;
  englishTitle: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  sections: PolicySection[];
}

export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  providers: string[];
}

export interface ChecklistItem {
  id: string;
  category: 'legal' | 'content' | 'technical' | 'ux';
  title: string;
  description: string;
  adsenseRuleRef: string;
  completed: boolean;
  importance: 'critical' | 'high' | 'medium';
}

export interface CustomSiteConfig {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  country: string;
  pubId: string;
}
