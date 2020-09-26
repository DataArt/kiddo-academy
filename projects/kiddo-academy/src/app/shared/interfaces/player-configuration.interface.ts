export interface PlayerAppConfiguration {
  language?: LanguageConfig;
  analytics?: AnalyticsConfig;
  database?: DatabaseConfig;
}

export interface LanguageConfig {
  useBrowserLangAsDefault?: boolean;
  default?: string;
  useOnly?: string;
}

export interface AnalyticsConfig {
  GA_key: string;
}

export interface DatabaseConfig {
  name: string;
  version: number;
}
